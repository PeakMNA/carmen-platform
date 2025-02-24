"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Building2 } from "lucide-react"
import { PageHeader } from "@/components/shared/PageHeader"
import { SearchFilterBar, FilterOption, SortOption } from "@/components/shared/SearchFilterBar"
import { PlatformUser } from "@/types/platform-user"
import { BusinessUnit } from "@/types/tenant"
import { mockBusinessUnits } from "@/data/business-units"

interface UserListProps {
  users: PlatformUser[]
  title: string
  description?: string
  filter?: {
    clusterId?: string
    businessUnitId?: string
  }
  onUserClick?: (user: PlatformUser) => void
  onUserAction?: (action: string, user: PlatformUser) => void
  onAddUser?: () => void
}

const roleFilters: FilterOption[] = [
  { label: "Hotel Admin", value: "hotel_admin" },
  { label: "Department Head", value: "department_head" },
  { label: "Staff", value: "staff" }
]

const statusFilters: FilterOption[] = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" }
]

const sortOptions: SortOption[] = [
  { label: "Name", value: "name" },
  { label: "Last Active", value: "lastActive" },
  { label: "Status", value: "status" }
]

export function UserList({
  users,
  title,
  description,
  filter,
  onUserClick,
  onUserAction,
  onAddUser
}: UserListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState<string | null>(null)

  const filteredUsers = users
    .filter(user => {
      // Text search
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        return (
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower)
        )
      }
      return true
    })
    .filter(user => {
      // Context filter
      if (filter?.clusterId) {
        return user.businessUnitAssignments.some(assignment => {
          const businessUnit = mockBusinessUnits.find((bu: BusinessUnit) => 
            bu.id === assignment.businessUnitId
          )
          return businessUnit?.clusterId === filter.clusterId
        })
      }
      if (filter?.businessUnitId) {
        return user.businessUnitAssignments.some(
          assignment => assignment.businessUnitId === filter.businessUnitId
        )
      }
      return true
    })
    .filter(user => {
      // Role filter
      if (roleFilter !== "all") {
        return user.businessUnitAssignments.some(
          assignment => assignment.role === roleFilter
        )
      }
      return true
    })
    .filter(user => {
      // Status filter
      if (statusFilter !== "all") {
        return user.status === statusFilter
      }
      return true
    })
    .sort((a, b) => {
      // Sorting
      if (!sortBy) return 0
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "lastActive":
          return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime()
        case "status":
          return a.status.localeCompare(b.status)
        default:
          return 0
      }
    })

  return (
    <div className="space-y-6">
      <PageHeader
        title={title}
        description={description}
        action={
          onAddUser && (
            <Button onClick={onAddUser}>
              Add User
            </Button>
          )
        }
      >
        <SearchFilterBar
          searchPlaceholder="Search users..."
          filterOptions={[
            {
              label: "Role",
              options: roleFilters
            },
            {
              label: "Status",
              options: statusFilters
            }
          ]}
          sortOptions={sortOptions}
          onSearch={setSearchTerm}
          onFilter={(filters) => {
            if ("role" in filters) setRoleFilter(filters.role)
            if ("status" in filters) setStatusFilter(filters.status)
          }}
          onSort={setSortBy}
        />
      </PageHeader>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Platform Role</TableHead>
              <TableHead>Business Units</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map(user => (
              <TableRow 
                key={user.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onUserClick?.(user)}
              >
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
                  <Badge variant="outline">
                    {user.platformRole}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {user.businessUnitAssignments.map((assignment, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{assignment.businessUnitName}</span>
                        <Badge variant="secondary" className="text-xs">
                          {assignment.role}
                        </Badge>
                        {assignment.department && (
                          <Badge variant="outline" className="text-xs">
                            {assignment.department}
                          </Badge>
                        )}
                      </div>
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
                <TableCell className="text-right">
                  <Button
                    variant={user.status === "active" ? "destructive" : "default"}
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onUserAction?.(
                        user.status === "active" ? "deactivate" : "activate",
                        user
                      )
                    }}
                  >
                    {user.status === "active" ? "Deactivate" : "Activate"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
