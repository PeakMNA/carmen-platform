"use client"

import { useState } from "react"
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
import { MoreHorizontal, Building2, Search } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

type PlatformRole = "platform_admin" | "cluster_admin" | "hotel_manager" | "staff"

interface User {
  id: string
  name: string
  email: string
  platformRole: PlatformRole
  hotelGroup?: string
  hotelGroupId?: string
  department?: string
  status: "active" | "inactive"
  lastActive: string
}

const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    platformRole: "platform_admin",
    status: "active",
    lastActive: "2025-02-21T10:30:00Z"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    platformRole: "cluster_admin",
    hotelGroup: "Luxury Hotels Group",
    hotelGroupId: "c-1",
    department: "Operations",
    status: "active",
    lastActive: "2025-02-21T09:45:00Z"
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    platformRole: "hotel_manager",
    hotelGroup: "Premium Resorts Collection",
    hotelGroupId: "c-2",
    department: "Front Office",
    status: "inactive",
    lastActive: "2025-02-20T15:20:00Z"
  },
  {
    id: "4",
    name: "Sarah Chen",
    email: "sarah@example.com",
    platformRole: "staff",
    hotelGroup: "Luxury Hotels Group",
    hotelGroupId: "c-1",
    department: "Housekeeping",
    status: "active",
    lastActive: "2025-02-21T11:15:00Z"
  }
]

const hotelGroups = [
  { id: "c-1", name: "Luxury Hotels Group" },
  { id: "c-2", name: "Premium Resorts Collection" },
  { id: "c-3", name: "Business Hotels Network" }
]

const platformRoles = [
  { value: "platform_admin", label: "Platform Admin" },
  { value: "cluster_admin", label: "Cluster Admin" },
  { value: "hotel_manager", label: "Hotel Manager" },
  { value: "staff", label: "Staff" }
]

export function UsersTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState<string>("all")
  const [selectedGroup, setSelectedGroup] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  const filteredUsers = users.filter(user => {
    // Search filter
    const searchMatch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.department?.toLowerCase() || "").includes(searchTerm.toLowerCase())

    // Role filter
    const roleMatch = selectedRole === "all" || user.platformRole === selectedRole

    // Group filter
    const groupMatch = 
      selectedGroup === "all" || 
      (user.platformRole === "platform_admin" && selectedGroup === "all") || 
      user.hotelGroupId === selectedGroup

    // Status filter
    const statusMatch = selectedStatus === "all" || user.status === selectedStatus

    return searchMatch && roleMatch && groupMatch && statusMatch
  })

  const showGroupFilter = selectedRole !== "platform_admin" && selectedRole !== "all"

  return (
    <div className="space-y-4">
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
            <Label>Platform Role</Label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {platformRoles.map(role => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {showGroupFilter && (
            <div className="w-[200px]">
              <Label>Hotel Group</Label>
              <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Groups</SelectItem>
                  {hotelGroups.map(group => (
                    <SelectItem key={group.id} value={group.id}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

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

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Hotel Group</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {platformRoles.find(role => role.value === user.platformRole)?.label}
                  </Badge>
                </TableCell>
                <TableCell>
                  {user.hotelGroup ? (
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      {user.hotelGroup}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  {user.department || <span className="text-muted-foreground">-</span>}
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
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit User</DropdownMenuItem>
                      <DropdownMenuItem>Change Role</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        {user.status === "active" ? "Deactivate" : "Activate"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
