"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Users, Building2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ClusterUser, ClusterUserFormData, clusterRoles, moduleOptions } from "@/types/cluster-user"
import { ClusterUserForm } from "@/components/users/ClusterUserForm"
import { ClusterUserDetails } from "@/components/users/ClusterUserDetails"

const clusters = [
  { id: "c-1", name: "Luxury Hotels Group" },
  { id: "c-2", name: "Premium Resorts Collection" },
  { id: "c-3", name: "Business Hotels Network" }
]

const initialUsers: ClusterUser[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    clusterId: "c-1",
    clusterName: "Luxury Hotels Group",
    role: "cluster_admin",
    modules: ["finance", "inventory", "reports"],
    status: "active",
    lastActive: "2024-02-22T10:30:00Z"
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael@example.com",
    clusterId: "c-2",
    clusterName: "Premium Resorts Collection",
    role: "hotel_manager",
    modules: ["inventory", "procurement"],
    status: "active",
    lastActive: "2024-02-22T09:45:00Z"
  },
  {
    id: "3",
    name: "Emily Brown",
    email: "emily@example.com",
    clusterId: "c-1",
    clusterName: "Luxury Hotels Group",
    role: "staff",
    modules: ["reports"],
    status: "inactive",
    lastActive: "2024-02-21T15:20:00Z"
  }
]

const roleOptions = [
  { value: "all", label: "All Roles" },
  ...clusterRoles
]

const moduleFilterOptions = [
  { value: "all", label: "All Modules" },
  ...moduleOptions
]

export default function ClusterUsersPage() {
  const [users, setUsers] = useState<ClusterUser[]>(initialUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCluster, setSelectedCluster] = useState("all")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedModule, setSelectedModule] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedUser, setSelectedUser] = useState<ClusterUser | null>(null)

  const handleAddUser = useCallback((formData: ClusterUserFormData) => {
    const cluster = clusters.find(c => c.id === formData.clusterId)
    if (!cluster) return

    const newUser: ClusterUser = {
      ...formData,
      id: `U-${Date.now()}`,
      clusterName: cluster.name,
      lastActive: new Date().toISOString()
    }
    setUsers(prev => [...prev, newUser])
  }, [])

  const handleEditUser = useCallback((formData: ClusterUserFormData) => {
    const cluster = clusters.find(c => c.id === formData.clusterId)
    if (!cluster) return

    setUsers(prev => prev.map(user => 
      user.id === formData.id 
        ? { 
            ...user,
            ...formData,
            clusterName: cluster.name
          }
        : user
    ))
  }, [])

  const handleDeleteUser = useCallback((userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId))
  }, [])

  const handleStatusChange = useCallback((userId: string, newStatus: "active" | "inactive") => {
    setUsers(prev => prev.map(user =>
      user.id === userId
        ? { ...user, status: newStatus }
        : user
    ))
  }, [])

  const filteredUsers = users.filter(user => {
    const searchMatch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const clusterMatch = selectedCluster === "all" || user.clusterId === selectedCluster
    const roleMatch = selectedRole === "all" || user.role === selectedRole
    const moduleMatch = selectedModule === "all" || user.modules.includes(selectedModule)
    const statusMatch = selectedStatus === "all" || user.status === selectedStatus

    return searchMatch && clusterMatch && roleMatch && moduleMatch && statusMatch
  })

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Cluster Users</h1>
          <p className="text-muted-foreground">
            Manage users and access across hotel groups
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium">{filteredUsers.length} Users</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="w-[200px]">
            <Label>Hotel Group</Label>
            <Select value={selectedCluster} onValueChange={setSelectedCluster}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Groups</SelectItem>
                {clusters.map((cluster: { id: string; name: string }) => (
                  <SelectItem key={cluster.id} value={cluster.id}>
                    {cluster.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-[200px]">
            <Label>Role</Label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                {roleOptions.map(role => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-[200px]">
            <Label>Module</Label>
            <Select value={selectedModule} onValueChange={setSelectedModule}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by module" />
              </SelectTrigger>
              <SelectContent>
                {moduleFilterOptions.map(module => (
                  <SelectItem key={module.value} value={module.value}>
                    {module.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-[200px]">
            <Label>Status</Label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cluster Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Hotel Group</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Modules</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map(user => (
                <TableRow 
                  key={user.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => setSelectedUser(user)}
                >
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      {user.clusterName}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {roleOptions.find(r => r.value === user.role)?.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.modules.map(moduleId => (
                        <Badge key={moduleId} variant="secondary">
                          {moduleOptions.find(m => m.value === moduleId)?.label}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.status === "active" ? "default" : "secondary"}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(user.lastActive).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Button
        onClick={() => setShowAddForm(true)}
        className="fixed bottom-6 right-6"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add User
      </Button>

      <ClusterUserForm
        clusters={clusters}
        open={showAddForm}
        onClose={() => setShowAddForm(false)}
        onSubmit={handleAddUser}
      />

      {selectedUser && (
        <ClusterUserDetails
          user={selectedUser}
          clusters={clusters}
          open={true}
          onClose={() => setSelectedUser(null)}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  )
}
