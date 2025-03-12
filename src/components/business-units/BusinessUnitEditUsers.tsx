"use client"

import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { User, BusinessUnitUserRole } from "@/types/user"
import { userService } from "@/services/userService"
import { UserPlus, X } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

interface BusinessUnitEditUsersProps {
  businessUnitId: string
}

// Available roles for business unit users
const availableRoles = [
  { value: "manager", label: "Manager" },
  { value: "supervisor", label: "Supervisor" },
  { value: "operator", label: "Operator" },
  { value: "analyst", label: "Analyst" },
  { value: "viewer", label: "Viewer" }
]

export function BusinessUnitEditUsers({ businessUnitId }: BusinessUnitEditUsersProps) {
  const { toast } = useToast()
  const [users, setUsers] = useState<User[]>([])
  const [userRoles, setUserRoles] = useState<BusinessUnitUserRole[]>([])
  const [loading, setLoading] = useState(true)
  const [availableUsers, setAvailableUsers] = useState<User[]>([])
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<string>("")
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const [usersData, rolesData, allUsers] = await Promise.all([
          userService.getUsersByBusinessUnit(businessUnitId),
          userService.getUserRolesByBusinessUnit(businessUnitId),
          userService.getUsers()
        ])
        setUsers(usersData)
        setUserRoles(rolesData)
        
        // Filter out platform staff and users already in the business unit
        const existingUserIds = usersData.map(user => user.id)
        const filteredUsers = allUsers.filter(user => 
          !existingUserIds.includes(user.id) && 
          user.platformRole !== 'admin' // Exclude platform staff
        )
        setAvailableUsers(filteredUsers)
      } catch (error) {
        console.error('Failed to load users:', error)
        toast({
          variant: "destructive",
          title: "Error loading users",
          description: "There was a problem loading the user data."
        })
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [businessUnitId, toast])

  const getUserRoles = (userId: string): string[] => {
    const roleRecord = userRoles.find(record => record.userId === userId)
    return roleRecord?.roles || []
  }

  const handleAddUser = async () => {
    if (!selectedUser || selectedRoles.length === 0) {
      toast({
        variant: "destructive",
        title: "Invalid selection",
        description: "Please select a user and at least one role."
      })
      return
    }

    try {
      // Add roles to the user for this business unit
      await userService.addRoles(businessUnitId, selectedUser, {
        roles: selectedRoles,
        systemId: "carmen-platform"
      })

      // Refresh the user list
      const [updatedUsers, updatedRoles] = await Promise.all([
        userService.getUsersByBusinessUnit(businessUnitId),
        userService.getUserRolesByBusinessUnit(businessUnitId)
      ])
      setUsers(updatedUsers)
      setUserRoles(updatedRoles)

      // Update available users
      setAvailableUsers(prev => prev.filter(user => !updatedUsers.some(u => u.id === user.id)))

      // Reset selection
      setSelectedUser("")
      setSelectedRoles([])
      setAddUserDialogOpen(false)

      toast({
        title: "User added",
        description: "The user has been added to the business unit."
      })
    } catch (error) {
      console.error('Failed to add user:', error)
      toast({
        variant: "destructive",
        title: "Error adding user",
        description: "There was a problem adding the user to the business unit."
      })
    }
  }

  const handleRemoveUser = async (userId: string) => {
    try {
      const userRoles = getUserRoles(userId)
      
      // Remove all roles from the user for this business unit
      await userService.removeRoles(businessUnitId, userId, {
        roles: userRoles,
        systemId: "carmen-platform"
      })

      // Refresh the user list
      const [updatedUsers, updatedRoles, allUsers] = await Promise.all([
        userService.getUsersByBusinessUnit(businessUnitId),
        userService.getUserRolesByBusinessUnit(businessUnitId),
        userService.getUsers()
      ])
      setUsers(updatedUsers)
      setUserRoles(updatedRoles)

      // Update available users
      const removedUser = allUsers.find(user => user.id === userId)
      if (removedUser && removedUser.platformRole !== 'admin') {
        setAvailableUsers(prev => [...prev, removedUser])
      }

      toast({
        title: "User removed",
        description: "The user has been removed from the business unit."
      })
    } catch (error) {
      console.error('Failed to remove user:', error)
      toast({
        variant: "destructive",
        title: "Error removing user",
        description: "There was a problem removing the user from the business unit."
      })
    }
  }

  const handleRoleToggle = (role: string) => {
    setSelectedRoles(prev => 
      prev.includes(role)
        ? prev.filter(r => r !== role)
        : [...prev, role]
    )
  }

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading users...</div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-medium">Users & Roles</CardTitle>
            <CardDescription>Manage users and their roles in this business unit</CardDescription>
          </div>
          <Dialog open={addUserDialogOpen} onOpenChange={setAddUserDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add User to Business Unit</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="user">Select User</Label>
                  <Select value={selectedUser} onValueChange={setSelectedUser}>
                    <SelectTrigger id="user">
                      <SelectValue placeholder="Select a user" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableUsers.length === 0 ? (
                        <SelectItem value="none" disabled>No available users</SelectItem>
                      ) : (
                        availableUsers.map(user => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name} ({user.email})
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Assign Roles</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {availableRoles.map(role => (
                      <div key={role.value} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`role-${role.value}`} 
                          checked={selectedRoles.includes(role.value)}
                          onCheckedChange={() => handleRoleToggle(role.value)}
                        />
                        <Label htmlFor={`role-${role.value}`} className="text-sm">
                          {role.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setAddUserDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddUser} disabled={!selectedUser || selectedRoles.length === 0}>
                    Add User
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              No users assigned to this business unit yet.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Platform Role</TableHead>
                  <TableHead>Business Unit Roles</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.platformRole && (
                        <Badge variant="outline" className="capitalize">
                          {user.platformRole}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {getUserRoles(user.id).map((role) => (
                          <Badge key={role} variant="secondary" className="capitalize">
                            {role.replace('-', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={user.status === 'active' ? 'default' : 'secondary'}
                        className="capitalize"
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveUser(user.id)}
                        disabled={user.platformRole === 'admin'} // Disable for platform admins
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Role Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {Array.from(new Set(userRoles.flatMap(record => record.roles))).map(role => {
              const usersWithRole = users.filter(user => 
                getUserRoles(user.id).includes(role)
              )
              return (
                <div key={role} className="rounded-lg border p-3">
                  <div className="text-sm font-medium capitalize">{role.replace('-', ' ')}</div>
                  <div className="mt-1 text-2xl font-bold">{usersWithRole.length}</div>
                  <div className="text-xs text-muted-foreground">Users assigned</div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 