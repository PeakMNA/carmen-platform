"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Users, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

import { BusinessUnitRole, Department } from "@/types/user-base"
import { PlatformUser, PlatformUserFormData, platformRoles, PLATFORM_ROLE_DESCRIPTIONS } from "@/types/platform-user"
import { PlatformUserForm } from "@/components/users/PlatformUserForm"
import { PlatformUserDetails } from "@/components/users/PlatformUserDetails"

const initialUsers: PlatformUser[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    platformRole: "platform_admin",
    status: "active",
    businessUnitAssignments: [],
    lastActive: "2024-02-22T10:30:00Z",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-02-22T10:30:00Z",
    stats: {
      totalAssignments: 0,
      activeBusinessUnits: 0,
      lastLoginAt: "2024-02-22T10:30:00Z",
      totalModulesAccessed: 0
    },
    auditLog: []
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael@example.com",
    platformRole: "cluster_admin",
    status: "active",
    businessUnitAssignments: [
      {
        id: "ba-1",
        businessUnitId: "bu-1",
        businessUnitName: "Grand Hotel Downtown",
        role: "hotel_admin",
        modules: [
          { moduleId: "inventory", accessLevel: "admin" },
          { moduleId: "reports", accessLevel: "write" }
        ],
        assignedAt: "2024-01-15T00:00:00Z",
        updatedAt: "2024-01-15T00:00:00Z"
      }
    ],
    lastActive: "2024-02-22T09:45:00Z",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-02-22T09:45:00Z",
    stats: {
      totalAssignments: 1,
      activeBusinessUnits: 1,
      lastLoginAt: "2024-02-22T09:45:00Z",
      totalModulesAccessed: 2
    },
    auditLog: []
  },
  {
    id: "3",
    name: "Emily Brown",
    email: "emily@example.com",
    platformRole: "support",
    status: "inactive",
    businessUnitAssignments: [],
    lastActive: "2024-02-21T15:20:00Z",
    createdAt: "2024-01-20T00:00:00Z",
    updatedAt: "2024-02-21T15:20:00Z",
    stats: {
      totalAssignments: 0,
      activeBusinessUnits: 0,
      lastLoginAt: "2024-02-21T15:20:00Z",
      totalModulesAccessed: 0
    },
    auditLog: []
  }
]

export default function PlatformUsersPage() {
  const [users, setUsers] = useState<PlatformUser[]>(initialUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedUser, setSelectedUser] = useState<PlatformUser | null>(null)

  const handleAddUser = useCallback((formData: PlatformUserFormData) => {
    const newUser: PlatformUser = {
      ...formData,
      id: `U-${Date.now()}`,
      businessUnitAssignments: (formData.businessUnitAssignments || []).map(assignment => ({
        id: `BA-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        businessUnitId: assignment.businessUnitId,
        businessUnitName: "Loading...", // This would typically come from an API
        role: assignment.role as BusinessUnitRole,
        department: assignment.department as Department | undefined,
        modules: assignment.modules,
        assignedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })),
      lastActive: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      stats: {
        totalAssignments: formData.businessUnitAssignments?.length || 0,
        activeBusinessUnits: formData.businessUnitAssignments?.length || 0,
        lastLoginAt: new Date().toISOString(),
        totalModulesAccessed: formData.businessUnitAssignments?.reduce((total, assignment) => 
          total + assignment.modules.length, 0) || 0
      },
      auditLog: []
    }
    setUsers(prev => [...prev, newUser])
  }, [])

  const handleEditUser = useCallback((formData: PlatformUserFormData) => {
    setUsers(prev => prev.map(user => 
      user.id === formData.id 
        ? {
            ...user,
            ...formData,
            updatedAt: new Date().toISOString(),
            businessUnitAssignments: formData.businessUnitAssignments 
              ? formData.businessUnitAssignments.map(assignment => ({
                  id: assignment.id || `BA-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                  businessUnitId: assignment.businessUnitId,
                  businessUnitName: user.businessUnitAssignments.find(a => a.businessUnitId === assignment.businessUnitId)?.businessUnitName || "Loading...",
                  role: assignment.role as BusinessUnitRole,
                  department: assignment.department as Department | undefined,
                  modules: assignment.modules,
                  assignedAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString()
                }))
              : user.businessUnitAssignments,
            stats: {
              ...user.stats,
              totalAssignments: formData.businessUnitAssignments?.length || 0,
              activeBusinessUnits: formData.businessUnitAssignments?.length || 0,
              totalModulesAccessed: formData.businessUnitAssignments?.reduce((total, assignment) => 
                total + assignment.modules.length, 0) || 0
            }
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
        ? { ...user, status: newStatus, updatedAt: new Date().toISOString() }
        : user
    ))
  }, [])

  const filteredUsers = users.filter(user => {
    const searchMatch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const roleMatch = selectedRole === "all" || user.platformRole === selectedRole
    const statusMatch = selectedStatus === "all" || user.status === selectedStatus

    return searchMatch && roleMatch && statusMatch
  })

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Platform Users</h1>
          <p className="text-muted-foreground">
            Manage platform-wide user access and roles
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
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="w-[200px]">
            <Label>Role</Label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {platformRoles.map(role => (
                  <SelectItem 
                    key={role.value} 
                    value={role.value}
                    title={PLATFORM_ROLE_DESCRIPTIONS[role.value]}
                  >
                    {role.label}
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
          <CardTitle>Platform Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Business Units</TableHead>
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
                    <Badge variant="outline">
                      {platformRoles.find(r => r.value === user.platformRole)?.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.businessUnitAssignments.length > 0 ? (
                      <Badge variant="secondary">
                        {user.businessUnitAssignments.length} assigned
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">None</span>
                    )}
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

      <PlatformUserForm
        open={showAddForm}
        onClose={() => setShowAddForm(false)}
        onSubmit={handleAddUser}
      />

      {selectedUser && (
        <PlatformUserDetails
          user={selectedUser}
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
