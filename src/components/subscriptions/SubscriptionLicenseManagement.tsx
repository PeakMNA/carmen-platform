"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
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
import { UserPlus, X, AlertCircle, CheckCircle2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"

interface SubscriptionLicenseManagementProps {
  businessUnitId: string
  maxUsers: number
  currentUsers: number
  buStaffCount: number
  buStaffMax: number
  clusterUserCount: number
  clusterUserMax: number
  activeModules: string[]
  filterUserType?: string
  filterModule?: string
  searchQuery?: string
  clusters?: { id: string; name: string; users: number }[]
}

// License types available in the system
const licenseTypes = [
  { value: "admin", label: "Administrator" },
  { value: "power", label: "Power User" },
  { value: "standard", label: "Standard User" },
  { value: "basic", label: "Basic User" },
  { value: "readonly", label: "Read-Only" }
]

// Module options that can be activated per business unit
const moduleOptions = [
  { value: "accounting", label: "Accounting" },
  { value: "inventory", label: "Inventory" },
  { value: "sales", label: "Sales" },
  { value: "analytics", label: "Analytics" },
  { value: "pms", label: "PMS" },
  { value: "hr", label: "HR" }
]

export function SubscriptionLicenseManagement({ 
  businessUnitId,
  maxUsers,
  currentUsers,
  buStaffCount: initialBuStaffCount,
  buStaffMax,
  clusterUserCount: initialClusterUserCount,
  clusterUserMax,
  activeModules: initialActiveModules,
  filterUserType,
  filterModule,
  searchQuery,
  clusters
}: SubscriptionLicenseManagementProps) {
  const { toast } = useToast()
  const [users, setUsers] = useState<User[]>([])
  const [userRoles, setUserRoles] = useState<BusinessUnitUserRole[]>([])
  const [loading, setLoading] = useState(true)
  const [availableUsers, setAvailableUsers] = useState<User[]>([])
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<string>("")
  const [selectedLicenseType, setSelectedLicenseType] = useState<string>("")
  const [licenseDistribution, setLicenseDistribution] = useState<Record<string, number>>({})
  const [userTypeTab, setUserTypeTab] = useState<"bu_staff" | "cluster_user">("bu_staff")
  const [activeModules, setActiveModules] = useState<string[]>(initialActiveModules)
  
  const buStaffCount = initialBuStaffCount
  const clusterUserCount = initialClusterUserCount

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

        // Calculate license distribution
        const distribution: Record<string, number> = {}
        rolesData.forEach(role => {
          // For this example, we'll consider the first role as the license type
          if (role.roles.length > 0) {
            const licenseType = role.roles[0]
            distribution[licenseType] = (distribution[licenseType] || 0) + 1
          }
        })
        setLicenseDistribution(distribution)
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

  const getUserLicenseType = useCallback((userId: string): string => {
    const roleRecord = userRoles.find(record => record.userId === userId)
    return roleRecord?.roles[0] || "none"
  }, [userRoles]);

  // Filter users based on search query, user type, and module access
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      // Filter by search query
      const matchesSearch = !searchQuery || 
        user.name.toLowerCase().includes(searchQuery?.toLowerCase() || '') || 
        user.email.toLowerCase().includes(searchQuery?.toLowerCase() || '');
      
      // Filter by user type
      const matchesUserType = filterUserType === 'all' || !filterUserType || 
        (filterUserType === 'bu_staff' && user.userType === 'bu_staff') ||
        (filterUserType === 'cluster_user' && user.userType === 'cluster_user');
      
      // Filter by module access
      const userLicenseType = getUserLicenseType(user.id);
      const matchesModule = !filterModule || filterModule === 'all' || 
        (userLicenseType === 'admin') || // Admins have access to all modules
        (userLicenseType === 'power' && activeModules.includes(filterModule)) || // Power users have access to all active modules
        // Check if user has specific module access (would be implemented in a real system)
        (userLicenseType !== 'none'); // For now, assume all users with a license have access to the module
      
      return matchesSearch && matchesUserType && matchesModule;
    });
  }, [users, searchQuery, filterUserType, filterModule, activeModules, getUserLicenseType]);

  const handleAddUser = async () => {
    if (!selectedUser || !selectedLicenseType) {
      toast({
        variant: "destructive",
        title: "Invalid selection",
        description: "Please select a user and a license type."
      })
      return
    }

    if (currentUsers >= maxUsers) {
      toast({
        variant: "destructive",
        title: "License limit reached",
        description: "You have reached the maximum number of users for this subscription."
      })
      return
    }

    try {
      // Add license role to the user for this business unit
      await userService.addRoles(businessUnitId, selectedUser, {
        roles: [selectedLicenseType],
        systemId: "carmen-platform"
      })
      
      // Update user type (BU Staff or Cluster User)
      const selectedUserData = availableUsers.find(user => user.id === selectedUser)
      if (selectedUserData) {
        // In a real implementation, this would be a separate API call
        // We're using the default value from the form
        const userTypeSelect = document.getElementById('userType') as HTMLSelectElement;
        const userType = userTypeSelect?.value as 'bu_staff' | 'cluster_user' || 'bu_staff';
        
        selectedUserData.userType = userType;
        if (userType === 'cluster_user') {
          const clusterSelect = document.getElementById('cluster') as HTMLSelectElement;
          selectedUserData.clusterId = clusterSelect?.value || 'cluster-1';
        }
      }

      // Refresh the user list
      const [updatedUsers, updatedRoles] = await Promise.all([
        userService.getUsersByBusinessUnit(businessUnitId),
        userService.getUserRolesByBusinessUnit(businessUnitId)
      ])
      setUsers(updatedUsers)
      setUserRoles(updatedRoles)

      // Update available users
      setAvailableUsers(prev => prev.filter(user => !updatedUsers.some(u => u.id === user.id)))

      // Update license distribution
      const newDistribution = { ...licenseDistribution }
      newDistribution[selectedLicenseType] = (newDistribution[selectedLicenseType] || 0) + 1
      setLicenseDistribution(newDistribution)

      // Reset selection
      setSelectedUser("")
      setSelectedLicenseType("")
      setAddUserDialogOpen(false)

      toast({
        title: "License assigned",
        description: "The user has been assigned a license in this subscription."
      })
    } catch (error) {
      console.error('Failed to add user:', error)
      toast({
        variant: "destructive",
        title: "Error assigning license",
        description: "There was a problem assigning the license to the user."
      })
    }
  }

  const handleRemoveUser = async (userId: string) => {
    try {
      const licenseType = getUserLicenseType(userId)
      
      // Remove license from the user for this business unit
      await userService.removeRoles(businessUnitId, userId, {
        roles: [licenseType],
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

      // Update license distribution
      const newDistribution = { ...licenseDistribution }
      if (newDistribution[licenseType]) {
        newDistribution[licenseType] -= 1
        if (newDistribution[licenseType] <= 0) {
          delete newDistribution[licenseType]
        }
      }
      setLicenseDistribution(newDistribution)

      toast({
        title: "License removed",
        description: "The user's license has been removed from this subscription."
      })
    } catch (error) {
      console.error('Failed to remove user:', error)
      toast({
        variant: "destructive",
        title: "Error removing license",
        description: "There was a problem removing the user's license."
      })
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading license data...</div>
  }

  const usagePercentage = (currentUsers / maxUsers) * 100
  const isNearLimit = usagePercentage >= 80

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-medium">License Management</CardTitle>
            <CardDescription>Manage user licenses for this subscription</CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              {currentUsers} of {maxUsers} licenses used
            </div>
            <Dialog open={addUserDialogOpen} onOpenChange={setAddUserDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" disabled={currentUsers >= maxUsers}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Assign License
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Assign License to User</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="user">Select User</Label>
                    <Select value={selectedUser} onValueChange={setSelectedUser}>
                      <SelectTrigger id="user">
                        <SelectValue placeholder="Select a user" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableUsers.map(user => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name} ({user.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="licenseType">License Type</Label>
                    <Select value={selectedLicenseType} onValueChange={setSelectedLicenseType}>
                      <SelectTrigger id="licenseType">
                        <SelectValue placeholder="Select a license type" />
                      </SelectTrigger>
                      <SelectContent>
                        {licenseTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="userType">User Type</Label>
                    <Select defaultValue="bu_staff">
                      <SelectTrigger id="userType">
                        <SelectValue placeholder="Select user type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bu_staff">BU Staff</SelectItem>
                        <SelectItem value="cluster_user">Cluster User</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cluster">Select Cluster</Label>
                    <Select defaultValue="cluster-1">
                      <SelectTrigger id="cluster">
                        <SelectValue placeholder="Select a cluster" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cluster-1">City Properties</SelectItem>
                        <SelectItem value="cluster-2">All Properties</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setAddUserDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddUser}>
                    Assign License
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-sm font-medium">License Utilization</div>
                <div className="text-sm text-muted-foreground">
                  {currentUsers} of {maxUsers} licenses used ({Math.round((currentUsers / maxUsers) * 100)}%)
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500" />
                  <span className="text-sm">BU Staff: {buStaffCount}/{buStaffMax}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="text-sm">Cluster Users: {clusterUserCount}/{clusterUserMax}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>BU Staff</span>
                <span>{buStaffCount} of {buStaffMax}</span>
              </div>
              <Progress value={(buStaffCount / buStaffMax) * 100} className="h-2" />
              
              <div className="flex items-center justify-between text-sm">
                <span>Cluster Users</span>
                <span>{clusterUserCount} of {clusterUserMax}</span>
              </div>
              <Progress value={(clusterUserCount / clusterUserMax) * 100} className="h-2" />
            </div>
            
            <Progress value={(currentUsers / maxUsers) * 100} className={isNearLimit ? "bg-yellow-100" : ""} />
            
            {isNearLimit && (
              <div className="flex items-center gap-2 text-sm text-yellow-600">
                <AlertCircle className="h-4 w-4" />
                <span>Approaching license limit. Consider optimizing license allocation.</span>
              </div>
            )}
          </div>

          <Tabs value={userTypeTab} onValueChange={(value) => setUserTypeTab(value as "bu_staff" | "cluster_user")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="bu_staff">BU Staff</TabsTrigger>
              <TabsTrigger value="cluster_user">Cluster Users</TabsTrigger>
            </TabsList>
            
            <TabsContent value="bu_staff">
              {filteredUsers.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  No users have been assigned licenses in this subscription.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>License Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => {
                      const licenseType = getUserLicenseType(user.id)
                      const licenseLabel = licenseTypes.find(l => l.value === licenseType)?.label || licenseType
                      
                      return (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {licenseLabel}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={user.status === 'active' ? 'default' : 'secondary'}
                              className="capitalize"
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(user.lastActive).toLocaleDateString()}
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
                      )
                    })}
                  </TableBody>
                </Table>
              )}
            </TabsContent>
            
            <TabsContent value="cluster_user">
              <div className="grid gap-4 md:grid-cols-3">
                {Object.entries(licenseDistribution).length === 0 ? (
                  <div className="col-span-3 text-center py-6 text-muted-foreground">
                    No licenses have been assigned yet.
                  </div>
                ) : (
                  Object.entries(licenseDistribution).map(([licenseType, count]) => {
                    const licenseLabel = licenseTypes.find(l => l.value === licenseType)?.label || licenseType
                    return (
                      <div key={licenseType} className="rounded-lg border p-4">
                        <div className="text-sm font-medium capitalize">{licenseLabel}</div>
                        <div className="mt-1 text-2xl font-bold">{count}</div>
                        <div className="text-xs text-muted-foreground">Licenses assigned</div>
                        <Progress 
                          value={(count / currentUsers) * 100} 
                          className="mt-2 h-1" 
                        />
                      </div>
                    )
                  })
                )}
              </div>
              
              <div className="mt-6 rounded-lg border p-4 bg-muted/50">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <h3 className="font-medium">License Optimization Tips</h3>
                </div>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Assign Administrator licenses only to users who need full system access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Consider downgrading inactive Power Users to Standard User licenses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Use Read-Only licenses for users who only need to view data</span>
                  </li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Module Activation</CardTitle>
          <CardDescription>Manage module activation for this business unit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {moduleOptions.map(module => (
                <div key={module.value} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`module-${module.value}`} 
                    checked={activeModules.includes(module.value)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setActiveModules(prev => [...prev, module.value]);
                      } else {
                        setActiveModules(prev => prev.filter(m => m !== module.value));
                      }
                    }}
                  />
                  <Label htmlFor={`module-${module.value}`}>{module.label}</Label>
                </div>
              ))}
            </div>
            <Button className="mt-4">Save Module Configuration</Button>
          </div>
        </CardContent>
      </Card>

      {clusters && clusters.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Cluster Information</CardTitle>
            <CardDescription>Users distributed across clusters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clusters.map(cluster => (
                <div key={cluster.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                  <div>
                    <div className="font-medium">{cluster.name}</div>
                    <div className="text-sm text-muted-foreground">{cluster.users} users</div>
                  </div>
                  <Badge variant="outline">{Math.round((cluster.users / clusterUserMax) * 100)}% of capacity</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 