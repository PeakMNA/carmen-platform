"use client"

import { useState } from "react"
import { ClusterSelector } from "./ClusterSelector"
import { AddMemberForm, AddMemberFormData } from "./AddMemberForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Building2 } from "lucide-react"
import { useUserData } from "@/hooks/useUserData"
import { userService } from "@/services/userService"

export function ClusterUsers() {
  const [selectedCluster, setSelectedCluster] = useState("C-1")
  const [showAddForm, setShowAddForm] = useState(false)
  const { users, loading, error, roleDistribution } = useUserData({ clusterId: selectedCluster })

  if (loading) {
    return <div>Loading users...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const handleAddMember = async (data: AddMemberFormData) => {
    try {
      // Add roles for each business unit assignment
      await Promise.all(
        data.businessUnitAssignments.map(assignment => 
          userService.addRoles(assignment.businessUnitId, data.id || `U-${Date.now()}`, {
            roles: [assignment.role, ...assignment.modules.map(m => m.moduleId)],
            systemId: "supply-chain-system"
          })
        )
      )
      setShowAddForm(false)
    } catch (error) {
      console.error('Failed to add member:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold tracking-tight">Cluster Members</h2>
          <ClusterSelector
            selectedCluster={selectedCluster}
            onClusterChange={setSelectedCluster}
          />
        </div>
        <Button onClick={() => setShowAddForm(true)}>Add Member</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Users & Roles</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Platform Role</TableHead>
                <TableHead>Business Unit Roles</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        {user.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {user.platformRole.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {user.businessUnitAssignments.map((assignment, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{assignment.businessUnitName}</span>
                          <Badge variant="secondary" className="text-xs capitalize">
                            {assignment.role.replace('_', ' ')}
                          </Badge>
                          {assignment.department && (
                            <Badge variant="outline" className="text-xs capitalize">
                              {assignment.department.replace('_', ' ')}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.status === "active" ? "default" : "secondary"}
                      className="capitalize"
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(user.lastActive).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant={user.status === "active" ? "destructive" : "default"}
                      size="sm"
                      onClick={async (e) => {
                        e.stopPropagation()
                        try {
                          if (user.status === "active") {
                            // Remove all roles to effectively deactivate
                            await Promise.all(
                              user.businessUnitAssignments.map(assignment =>
                                userService.removeRoles(assignment.businessUnitId, user.id, {
                                  roles: assignment.modules.map(m => m.moduleId),
                                  systemId: "supply-chain-system"
                                })
                              )
                            )
                          } else {
                            // Re-add roles to activate
                            await Promise.all(
                              user.businessUnitAssignments.map(assignment =>
                                userService.addRoles(assignment.businessUnitId, user.id, {
                                  roles: assignment.modules.map(m => m.moduleId),
                                  systemId: "supply-chain-system"
                                })
                              )
                            )
                          }
                        } catch (error) {
                          console.error('Failed to update user status:', error)
                        }
                      }}
                    >
                      {user.status === "active" ? "Deactivate" : "Activate"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Role Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {roleDistribution.map(({ role, count }) => (
              <div key={role} className="rounded-lg border p-3">
                <div className="text-sm font-medium capitalize">{role.replace('_', ' ')}</div>
                <div className="mt-1 text-2xl font-bold">{count}</div>
                <div className="text-xs text-muted-foreground">Users assigned</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AddMemberForm
        open={showAddForm}
        onClose={() => setShowAddForm(false)}
        onSubmit={handleAddMember}
      />
    </div>
  )
}
