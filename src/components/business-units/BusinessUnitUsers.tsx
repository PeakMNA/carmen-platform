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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, BusinessUnitUserRole } from "@/types/user"
import { userService } from "@/services/userService"

interface BusinessUnitUsersProps {
  businessUnitId: string
}

export function BusinessUnitUsers({ businessUnitId }: BusinessUnitUsersProps) {
  const [users, setUsers] = useState<User[]>([])
  const [userRoles, setUserRoles] = useState<BusinessUnitUserRole[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const [usersData, rolesData] = await Promise.all([
          userService.getUsersByBusinessUnit(businessUnitId),
          userService.getUserRolesByBusinessUnit(businessUnitId)
        ])
        setUsers(usersData)
        setUserRoles(rolesData)
      } catch (error) {
        console.error('Failed to load users:', error)
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [businessUnitId])

  if (loading) {
    return <div>Loading users...</div>
  }

  const getUserRoles = (userId: string): string[] => {
    const roleRecord = userRoles.find(record => record.userId === userId)
    return roleRecord?.roles || []
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Users & Roles</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Platform Role</TableHead>
                <TableHead>Business Unit Roles</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
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
                  <TableCell className="text-muted-foreground">
                    {new Date(user.lastActive).toLocaleString()}
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
