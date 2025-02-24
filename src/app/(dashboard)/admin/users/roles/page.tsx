"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, Building2, Building } from "lucide-react"

interface Role {
  id: string
  name: string
  type: "platform" | "cluster" | "department"
  scope?: string
  permissions: string[]
  userCount: number
  lastUpdated: string
}

const mockRoles: Role[] = [
  // Platform Roles
  {
    id: "role-1",
    name: "Platform Admin",
    type: "platform",
    permissions: ["all_access", "user_management", "system_config"],
    userCount: 3,
    lastUpdated: "2024-02-22T10:30:00Z"
  },
  {
    id: "role-2",
    name: "Cluster Admin",
    type: "platform",
    permissions: ["cluster_management", "user_management", "reporting"],
    userCount: 8,
    lastUpdated: "2024-02-22T09:45:00Z"
  },
  {
    id: "role-3",
    name: "Hotel Manager",
    type: "platform",
    permissions: ["hotel_management", "staff_management", "reporting"],
    userCount: 15,
    lastUpdated: "2024-02-21T15:20:00Z"
  },

  // Cluster Roles
  {
    id: "role-4",
    name: "Regional Manager",
    type: "cluster",
    scope: "Luxury Hotels Group",
    permissions: ["cluster_reporting", "hotel_oversight", "budget_management"],
    userCount: 2,
    lastUpdated: "2024-02-22T11:30:00Z"
  },
  {
    id: "role-5",
    name: "Operations Director",
    type: "cluster",
    scope: "Premium Resorts Collection",
    permissions: ["operations_management", "staff_oversight", "inventory_control"],
    userCount: 3,
    lastUpdated: "2024-02-21T14:20:00Z"
  },

  // Department Roles
  {
    id: "role-6",
    name: "Finance Head",
    type: "department",
    scope: "Finance",
    permissions: ["finance_management", "reporting", "budget_control"],
    userCount: 5,
    lastUpdated: "2024-02-22T08:30:00Z"
  },
  {
    id: "role-7",
    name: "Housekeeping Supervisor",
    type: "department",
    scope: "Housekeeping",
    permissions: ["staff_scheduling", "inventory_management", "quality_control"],
    userCount: 12,
    lastUpdated: "2024-02-21T16:45:00Z"
  }
]

function RoleList({ roles }: { roles: Role[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Role Name</TableHead>
          <TableHead>Scope</TableHead>
          <TableHead>Permissions</TableHead>
          <TableHead>Users</TableHead>
          <TableHead>Last Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {roles.map(role => (
          <TableRow key={role.id}>
            <TableCell className="font-medium">{role.name}</TableCell>
            <TableCell>
              {role.scope ? (
                <Badge variant="outline">{role.scope}</Badge>
              ) : (
                <span className="text-muted-foreground">Global</span>
              )}
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {role.permissions.map(permission => (
                  <Badge key={permission} variant="secondary">
                    {permission.split("_").map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(" ")}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{role.userCount}</span>
              </div>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {new Date(role.lastUpdated).toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default function RolesPage() {
  const platformRoles = mockRoles.filter(role => role.type === "platform")
  const clusterRoles = mockRoles.filter(role => role.type === "cluster")
  const departmentRoles = mockRoles.filter(role => role.type === "department")

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Role Management</h1>
        <p className="text-muted-foreground">
          Configure and manage user roles across the platform
        </p>
      </div>

      <Tabs defaultValue="platform" className="space-y-4">
        <TabsList>
          <TabsTrigger value="platform" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Platform Roles
          </TabsTrigger>
          <TabsTrigger value="cluster" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Cluster Roles
          </TabsTrigger>
          <TabsTrigger value="department" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Department Roles
          </TabsTrigger>
        </TabsList>

        <TabsContent value="platform">
          <Card>
            <CardHeader>
              <CardTitle>Platform Roles</CardTitle>
            </CardHeader>
            <CardContent>
              <RoleList roles={platformRoles} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cluster">
          <Card>
            <CardHeader>
              <CardTitle>Cluster Roles</CardTitle>
            </CardHeader>
            <CardContent>
              <RoleList roles={clusterRoles} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="department">
          <Card>
            <CardHeader>
              <CardTitle>Department Roles</CardTitle>
            </CardHeader>
            <CardContent>
              <RoleList roles={departmentRoles} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
