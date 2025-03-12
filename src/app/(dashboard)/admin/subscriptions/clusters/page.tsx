"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, ChevronRight, Edit, Plus, Search, Settings, Users } from "lucide-react"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data for clusters
const clusters = [
  { 
    id: "cl-1", 
    name: "European Hotels", 
    status: "active",
    businessUnits: 4, 
    users: 104,
    clusterUserLicenses: { total: 150, used: 104 },
    expirationDate: "2024-12-31",
    createdAt: "2023-01-15",
    businessUnitsList: [
      "Grand Hotel Berlin",
      "Luxury Resort Paris",
      "Seaside Hotel Barcelona",
      "Mountain Lodge Zurich"
    ]
  },
  { 
    id: "cl-2", 
    name: "American Hotels", 
    status: "active",
    businessUnits: 3, 
    users: 92,
    clusterUserLicenses: { total: 120, used: 92 },
    expirationDate: "2024-12-31",
    createdAt: "2023-02-10",
    businessUnitsList: [
      "City Center Hotel New York",
      "Beach Resort Miami",
      "Mountain View Lodge Colorado"
    ]
  },
  { 
    id: "cl-3", 
    name: "Asian Hotels", 
    status: "active",
    businessUnits: 2, 
    users: 45,
    clusterUserLicenses: { total: 80, used: 45 },
    expirationDate: "2024-12-31",
    createdAt: "2023-03-05",
    businessUnitsList: [
      "Luxury Hotel Tokyo",
      "Beach Resort Bali"
    ]
  },
  { 
    id: "cl-4", 
    name: "African Hotels", 
    status: "inactive",
    businessUnits: 0, 
    users: 0,
    clusterUserLicenses: { total: 50, used: 0 },
    expirationDate: "2023-12-31",
    createdAt: "2023-04-20",
    businessUnitsList: []
  },
]

// Mock data for cluster users
const clusterUsers = [
  { id: "user-1", name: "John Smith", email: "john.smith@example.com", role: "Cluster Manager", status: "active", lastActive: "2023-10-15" },
  { id: "user-2", name: "Emma Johnson", email: "emma.johnson@example.com", role: "Regional Director", status: "active", lastActive: "2023-10-14" },
  { id: "user-3", name: "Michael Brown", email: "michael.brown@example.com", role: "Operations Manager", status: "active", lastActive: "2023-10-13" },
  { id: "user-4", name: "Sophia Davis", email: "sophia.davis@example.com", role: "Finance Director", status: "active", lastActive: "2023-10-12" },
  { id: "user-5", name: "Robert Wilson", email: "robert.wilson@example.com", role: "Marketing Manager", status: "inactive", lastActive: "2023-09-30" },
]

export default function ClustersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null)
  
  // Filter clusters based on search query and filters
  const filteredClusters = clusters.filter((cluster) => {
    const matchesSearch = cluster.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || cluster.status === statusFilter
    
    return matchesSearch && matchesStatus
  })
  
  // Get selected cluster details
  const selectedClusterDetails = selectedCluster 
    ? clusters.find(cluster => cluster.id === selectedCluster) 
    : null
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Clusters</h2>
          <p className="text-muted-foreground">
            Manage clusters, their associated business units, and cluster user licenses
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/subscriptions/business-units">
              Manage Business Units
            </Link>
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Cluster
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4">
                <div className="space-y-1">
                  <CardTitle>Clusters</CardTitle>
                  <CardDescription>
                    Select a cluster to manage
                  </CardDescription>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search clusters..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filteredClusters.map((cluster) => (
                  <div 
                    key={cluster.id} 
                    className={`flex items-center justify-between rounded-lg border p-3 cursor-pointer hover:bg-muted/50 ${selectedCluster === cluster.id ? 'bg-muted' : ''}`}
                    onClick={() => setSelectedCluster(cluster.id)}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{cluster.name}</h3>
                        {cluster.status === "inactive" && (
                          <Badge variant="outline" className="text-muted-foreground">Inactive</Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {cluster.businessUnits} business units · {cluster.users} users
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
                
                {filteredClusters.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <p className="text-sm text-muted-foreground">No clusters found</p>
                    <Button variant="outline" className="mt-4">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Cluster
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                <CardTitle>License Allocation</CardTitle>
              </div>
              <CardDescription>
                Current cluster user license utilization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Cluster User Licenses</span>
                  <span>241/400</span>
                </div>
                <Progress value={60.25} className="h-2" />
              </div>
              <div className="pt-2">
                <Button variant="outline" className="w-full">
                  Manage License Pool
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                <CardTitle>Expiration Summary</CardTitle>
              </div>
              <CardDescription>
                Upcoming cluster expirations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Next 30 days</span>
                  <Badge variant="outline">0 clusters</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Next 60 days</span>
                  <Badge variant="outline">0 clusters</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Next 90 days</span>
                  <Badge variant="outline">4 clusters</Badge>
                </div>
              </div>
              <div className="pt-2">
                <Button variant="outline" className="w-full">
                  View Expiration Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          {selectedClusterDetails ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle>{selectedClusterDetails.name}</CardTitle>
                        {selectedClusterDetails.status === "inactive" && (
                          <Badge variant="outline" className="text-muted-foreground">Inactive</Badge>
                        )}
                      </div>
                      <CardDescription>
                        Created on {new Date(selectedClusterDetails.createdAt).toLocaleDateString()} · 
                        Expires on {new Date(selectedClusterDetails.expirationDate).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button size="sm">
                        <Settings className="mr-2 h-4 w-4" />
                        Configure
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="business-units">
                    <TabsList className="mb-4">
                      <TabsTrigger value="business-units">Business Units</TabsTrigger>
                      <TabsTrigger value="users">Users</TabsTrigger>
                      <TabsTrigger value="licenses">Licenses</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="business-units">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-medium">Associated Business Units</h3>
                          <Button variant="outline" size="sm">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Business Unit
                          </Button>
                        </div>
                        
                        {selectedClusterDetails.businessUnitsList.length > 0 ? (
                          <div className="space-y-2">
                            {selectedClusterDetails.businessUnitsList.map((bu, index) => (
                              <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                                <div className="font-medium">{bu}</div>
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="sm" asChild>
                                    <Link href={`/admin/subscriptions/business-units/bu-${index + 1}`}>
                                      <Settings className="h-4 w-4" />
                                      <span className="sr-only">Configure</span>
                                    </Link>
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-8 text-center">
                            <p className="text-sm text-muted-foreground">No business units associated with this cluster</p>
                            <Button variant="outline" className="mt-4">
                              <Plus className="mr-2 h-4 w-4" />
                              Add Business Unit
                            </Button>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="users">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-medium">Cluster Users</h3>
                          <div className="flex items-center gap-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="flex items-center">
                                    <Badge variant="outline" className="mr-2">
                                      {selectedClusterDetails.users}/{selectedClusterDetails.clusterUserLicenses.total} licenses used
                                    </Badge>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-xs">Number of cluster user licenses used out of total allocated</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <Button variant="outline" size="sm">
                              <Plus className="mr-2 h-4 w-4" />
                              Add User
                            </Button>
                          </div>
                        </div>
                        
                        <div className="rounded-md border">
                          <div className="grid grid-cols-12 gap-4 p-3 bg-muted/50 text-sm font-medium">
                            <div className="col-span-4">Name</div>
                            <div className="col-span-3">Role</div>
                            <div className="col-span-3">Status</div>
                            <div className="col-span-2">Actions</div>
                          </div>
                          <Separator />
                          {clusterUsers.map((user) => (
                            <div key={user.id} className="grid grid-cols-12 gap-4 p-3 text-sm items-center">
                              <div className="col-span-4">
                                <div className="font-medium">{user.name}</div>
                                <div className="text-xs text-muted-foreground">{user.email}</div>
                              </div>
                              <div className="col-span-3">{user.role}</div>
                              <div className="col-span-3">
                                <Badge variant={user.status === "active" ? "secondary" : "outline"}>
                                  {user.status === "active" ? "Active" : "Inactive"}
                                </Badge>
                              </div>
                              <div className="col-span-2 flex items-center gap-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                  <span className="sr-only">Edit</span>
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Settings className="h-4 w-4" />
                                  <span className="sr-only">Configure</span>
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="licenses">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-medium">License Allocation</h3>
                          <Button variant="outline" size="sm">
                            Adjust Allocation
                          </Button>
                        </div>
                        
                        <Card>
                          <CardContent className="pt-6">
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="cluster-licenses">Cluster User Licenses</Label>
                                <div className="flex items-center gap-4 mt-2">
                                  <div className="flex-1">
                                    <div className="flex justify-between text-sm mb-1">
                                      <span>{selectedClusterDetails.clusterUserLicenses.used}</span>
                                      <span>of {selectedClusterDetails.clusterUserLicenses.total}</span>
                                    </div>
                                    <Progress 
                                      value={(selectedClusterDetails.clusterUserLicenses.used / selectedClusterDetails.clusterUserLicenses.total) * 100} 
                                      className="h-2"
                                    />
                                  </div>
                                  <Input 
                                    id="cluster-licenses"
                                    type="number" 
                                    className="w-24" 
                                    defaultValue={selectedClusterDetails.clusterUserLicenses.total} 
                                  />
                                </div>
                              </div>
                              
                              <div className="rounded-md border p-4 bg-muted/50">
                                <h4 className="text-sm font-medium mb-2">License Validation Rules</h4>
                                <ul className="space-y-2 text-sm">
                                  <li className="flex items-start gap-2">
                                    <span>•</span>
                                    <span>Each Cluster user consumes exactly one cluster license</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <span>•</span>
                                    <span>Cluster user licenses are specific to a single Cluster</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <span>•</span>
                                    <span>Cluster users can access multiple Business Units within their assigned Cluster</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <span>•</span>
                                    <span>When a Cluster user is deactivated, their license is returned to the available pool</span>
                                  </li>
                                </ul>
                              </div>
                              
                              <div className="flex justify-end">
                                <Button>Save Changes</Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Select a Cluster</h3>
                <p className="text-sm text-muted-foreground">
                  Select a cluster from the list to view and manage its details, business units, and users
                </p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Cluster
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
} 