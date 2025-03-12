"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Users, Building2, Building, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

import { HotelUser, HotelUserFormData, departments, departmentRoles, moduleOptions } from "@/types/hotel-user"
import { HotelUserForm } from "@/components/users/HotelUserForm"
import { HotelUserDetails } from "@/components/users/HotelUserDetails"

const clusters = [
  { id: "c-1", name: "Luxury Hotels Group" },
  { id: "c-2", name: "Premium Resorts Collection" },
  { id: "c-3", name: "Business Hotels Network" }
]

const hotels = [
  { id: "h-1", clusterId: "c-1", name: "Grand Hotel Downtown" },
  { id: "h-2", clusterId: "c-1", name: "Luxury Resort & Spa" },
  { id: "h-3", clusterId: "c-2", name: "Premium Beach Resort" },
  { id: "h-4", clusterId: "c-2", name: "Mountain View Hotel" },
  { id: "h-5", clusterId: "c-3", name: "Business Center Hotel" }
]

const initialUsers: HotelUser[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    clusterId: "c-1",
    clusterName: "Luxury Hotels Group",
    hotelId: "h-1",
    hotelName: "Grand Hotel Downtown",
    department: "front_office",
    role: "department_head",
    modules: ["scheduling", "reports"],
    status: "active",
    lastActive: "2024-02-22T10:30:00Z"
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael@example.com",
    clusterId: "c-1",
    clusterName: "Luxury Hotels Group",
    hotelId: "h-2",
    hotelName: "Luxury Resort & Spa",
    department: "housekeeping",
    role: "supervisor",
    modules: ["inventory", "maintenance"],
    status: "active",
    lastActive: "2024-02-22T09:45:00Z"
  },
  {
    id: "3",
    name: "Emily Brown",
    email: "emily@example.com",
    clusterId: "c-2",
    clusterName: "Premium Resorts Collection",
    hotelId: "h-3",
    hotelName: "Premium Beach Resort",
    department: "food_beverage",
    role: "staff",
    modules: ["inventory"],
    status: "inactive",
    lastActive: "2024-02-21T15:20:00Z"
  }
]

const departmentOptions = [
  { value: "all", label: "All Departments" },
  ...departments
]

const roleOptions = [
  { value: "all", label: "All Roles" },
  ...departmentRoles
]

const moduleFilterOptions = [
  { value: "all", label: "All Modules" },
  ...moduleOptions
]

export default function BUStaffPage() {
  const [users, setUsers] = useState<HotelUser[]>(initialUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCluster, setSelectedCluster] = useState("all")
  const [selectedHotel, setSelectedHotel] = useState("all")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedModule, setSelectedModule] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedUser, setSelectedUser] = useState<HotelUser | null>(null)

  const filteredHotels = selectedCluster === "all"
    ? hotels
    : hotels.filter(hotel => hotel.clusterId === selectedCluster)

  const handleAddUser = useCallback((formData: HotelUserFormData) => {
    const cluster = clusters.find(c => c.id === formData.clusterId)
    const hotel = hotels.find(h => h.id === formData.hotelId)
    if (!cluster || !hotel) return

    const newUser: HotelUser = {
      ...formData,
      id: `U-${Date.now()}`,
      clusterName: cluster.name,
      hotelName: hotel.name,
      lastActive: new Date().toISOString()
    }
    setUsers(prev => [...prev, newUser])
  }, [])

  const handleEditUser = useCallback((formData: HotelUserFormData) => {
    const cluster = clusters.find(c => c.id === formData.clusterId)
    const hotel = hotels.find(h => h.id === formData.hotelId)
    if (!cluster || !hotel) return

    setUsers(prev => prev.map(user => 
      user.id === formData.id 
        ? { 
            ...user,
            ...formData,
            clusterName: cluster.name,
            hotelName: hotel.name
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
    const hotelMatch = selectedHotel === "all" || user.hotelId === selectedHotel
    const departmentMatch = selectedDepartment === "all" || user.department === selectedDepartment
    const roleMatch = selectedRole === "all" || user.role === selectedRole
    const moduleMatch = selectedModule === "all" || user.modules.includes(selectedModule)
    const statusMatch = selectedStatus === "all" || user.status === selectedStatus

    return searchMatch && clusterMatch && hotelMatch && departmentMatch && roleMatch && moduleMatch && statusMatch
  })

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Business Unit Staff</h1>
          <p className="text-muted-foreground">
            Manage business unit staff and department access
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium">{filteredUsers.length} Staff Members</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search staff..."
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
                {clusters.map(cluster => (
                  <SelectItem key={cluster.id} value={cluster.id}>
                    {cluster.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-[200px]">
            <Label>Hotel</Label>
            <Select 
              value={selectedHotel} 
              onValueChange={setSelectedHotel}
              disabled={selectedCluster === "all"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by hotel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Hotels</SelectItem>
                {filteredHotels.map(hotel => (
                  <SelectItem key={hotel.id} value={hotel.id}>
                    {hotel.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-[200px]">
            <Label>Department</Label>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                {departmentOptions.map(dept => (
                  <SelectItem key={dept.value} value={dept.value}>
                    {dept.label}
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
          <CardTitle>Business Unit Staff</CardTitle>
          <CardDescription>
            Staff members with access to this business unit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Cluster</TableHead>
                <TableHead>Hotel</TableHead>
                <TableHead>Department</TableHead>
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
                      <span>{user.clusterName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      {user.hotelName}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {departments.find(d => d.value === user.department)?.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {departmentRoles.find(r => r.value === user.role)?.label}
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
        Add Staff Member
      </Button>

      <HotelUserForm
        clusters={clusters}
        hotels={hotels}
        open={showAddForm}
        onClose={() => setShowAddForm(false)}
        onSubmit={handleAddUser}
      />

      {selectedUser && (
        <HotelUserDetails
          user={selectedUser}
          clusters={clusters}
          hotels={hotels}
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
