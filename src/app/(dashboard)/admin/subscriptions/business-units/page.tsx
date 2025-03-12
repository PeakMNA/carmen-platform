"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, ExternalLink, Filter, Home, Plus, Search, Settings } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"
import { DataTable, convertColumns } from "@/components/ui/data-table"

// Mock data for business units
const businessUnits = [
  {
    id: "bu-1",
    name: "Grand Hotel Berlin",
    status: "active",
    cluster: "European Hotels",
    modules: ["Accounting", "Inventory", "Sales"],
    buStaffLicenses: { total: 30, used: 22 },
    clusterUserLicenses: { total: 20, used: 15 },
    expirationDate: "2024-12-31",
    createdAt: "2023-01-15",
  },
  {
    id: "bu-2",
    name: "Luxury Resort Paris",
    status: "active",
    cluster: "European Hotels",
    modules: ["Accounting", "Inventory", "Sales", "Analytics", "PMS"],
    buStaffLicenses: { total: 150, used: 98 },
    clusterUserLicenses: { total: 100, used: 67 },
    expirationDate: "2024-12-31",
    createdAt: "2023-02-20",
  },
  {
    id: "bu-3",
    name: "Seaside Hotel Barcelona",
    status: "active",
    cluster: "European Hotels",
    modules: ["Accounting", "Inventory", "Sales", "Analytics"],
    buStaffLicenses: { total: 50, used: 42 },
    clusterUserLicenses: { total: 30, used: 22 },
    expirationDate: "2024-12-31",
    createdAt: "2023-03-10",
  },
  {
    id: "bu-4",
    name: "Mountain Lodge Zurich",
    status: "inactive",
    cluster: "European Hotels",
    modules: ["Accounting", "Inventory"],
    buStaffLicenses: { total: 20, used: 0 },
    clusterUserLicenses: { total: 10, used: 0 },
    expirationDate: "2023-12-31",
    createdAt: "2023-04-05",
  },
  {
    id: "bu-5",
    name: "City Center Hotel New York",
    status: "active",
    cluster: "American Hotels",
    modules: ["Accounting", "Inventory", "Sales", "Analytics", "PMS", "HR"],
    buStaffLicenses: { total: 200, used: 187 },
    clusterUserLicenses: { total: 100, used: 92 },
    expirationDate: "2024-12-31",
    createdAt: "2023-05-15",
  },
]

// Mock data for clusters
const clusters = [
  { id: "cl-1", name: "European Hotels", businessUnits: 4, users: 104 },
  { id: "cl-2", name: "American Hotels", businessUnits: 3, users: 92 },
  { id: "cl-3", name: "Asian Hotels", businessUnits: 2, users: 45 },
]

// Mock data for modules
const availableModules = [
  { id: "mod-1", name: "Accounting", description: "Financial management and reporting" },
  { id: "mod-2", name: "Inventory", description: "Stock and inventory management" },
  { id: "mod-3", name: "Sales", description: "Sales tracking and management" },
  { id: "mod-4", name: "Analytics", description: "Business intelligence and reporting" },
  { id: "mod-5", name: "PMS", description: "Property Management System" },
  { id: "mod-6", name: "HR", description: "Human Resources management" },
]

// Define columns for the business units table
const columns: ColumnDef<typeof businessUnits[0]>[] = [
  {
    accessorKey: "name",
    header: "Business Unit",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="font-medium">{row.original.name}</div>
        {row.original.status === "inactive" && (
          <Badge variant="outline" className="text-muted-foreground">Expired</Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "cluster",
    header: "Cluster",
  },
  {
    accessorKey: "modules",
    header: "Modules",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        {row.original.modules.slice(0, 3).map((module) => (
          <Badge key={module} variant="secondary" className="text-xs">
            {module}
          </Badge>
        ))}
        {row.original.modules.length > 3 && (
          <Badge variant="outline" className="text-xs">
            +{row.original.modules.length - 3} more
          </Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "buStaffLicenses",
    header: "Business Unit Staff",
    cell: ({ row }) => (
      <div className="w-32">
        <div className="flex justify-between text-xs mb-1">
          <span>{row.original.buStaffLicenses.used}</span>
          <span>of {row.original.buStaffLicenses.total}</span>
        </div>
        <Progress 
          value={(row.original.buStaffLicenses.used / row.original.buStaffLicenses.total) * 100} 
          className="h-2"
        />
      </div>
    ),
  },
  {
    accessorKey: "clusterUserLicenses",
    header: "Cluster Users",
    cell: ({ row }) => (
      <div className="w-32">
        <div className="flex justify-between text-xs mb-1">
          <span>{row.original.clusterUserLicenses.used}</span>
          <span>of {row.original.clusterUserLicenses.total}</span>
        </div>
        <Progress 
          value={(row.original.clusterUserLicenses.used / row.original.clusterUserLicenses.total) * 100} 
          className="h-2"
        />
      </div>
    ),
  },
  {
    accessorKey: "expirationDate",
    header: "Expiration",
    cell: ({ row }) => {
      const date = new Date(row.original.expirationDate);
      const now = new Date();
      const diffTime = date.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      return (
        <div className="flex items-center gap-2">
          <span>{new Date(row.original.expirationDate).toLocaleDateString()}</span>
          {diffDays < 30 && diffDays > 0 && (
            <Badge variant="destructive" className="text-xs">
              {diffDays} days left
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" asChild>
                <Link href={`/admin/subscriptions/business-units/${row.original.id}`}>
                  <Settings className="h-4 w-4" />
                  <span className="sr-only">Configure</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Configure business unit settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
  },
]

export default function BusinessUnitsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [clusterFilter, setClusterFilter] = useState("all")
  const [licenseView, setLicenseView] = useState<"summary" | "detailed">("summary")
  
  // Filter business units based on search query and filters
  const filteredBusinessUnits = businessUnits.filter((bu) => {
    const matchesSearch = bu.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || bu.status === statusFilter
    const matchesCluster = clusterFilter === "all" || bu.cluster === clusterFilter
    
    return matchesSearch && matchesStatus && matchesCluster
  })
  
  // Calculate license totals
  const totalBUStaffLicenses = businessUnits.reduce((acc, bu) => acc + bu.buStaffLicenses.total, 0)
  const usedBUStaffLicenses = businessUnits.reduce((acc, bu) => acc + bu.buStaffLicenses.used, 0)
  const totalClusterUserLicenses = businessUnits.reduce((acc, bu) => acc + bu.clusterUserLicenses.total, 0)
  const usedClusterUserLicenses = businessUnits.reduce((acc, bu) => acc + bu.clusterUserLicenses.used, 0)
  
  // Calculate module usage
  const moduleUsage = availableModules.map(module => {
    const count = businessUnits.filter(bu => bu.modules.includes(module.name)).length
    return {
      ...module,
      count,
      percentage: Math.round((count / businessUnits.length) * 100)
    }
  }).sort((a, b) => b.count - a.count)
  
  return (
    <div className="space-y-6">
      {/* Breadcrumb navigation */}
      <nav className="flex items-center text-sm text-muted-foreground">
        <Link href="/admin" className="flex items-center hover:text-foreground">
          <Home className="mr-1 h-4 w-4" />
          <span>Admin</span>
        </Link>
        <span className="mx-2">/</span>
        <Link href="/admin/subscriptions" className="hover:text-foreground">
          Subscriptions
        </Link>
        <span className="mx-2">/</span>
        <span className="font-medium text-foreground">Business Units</span>
      </nav>
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Business Units</h2>
          <p className="text-muted-foreground">
            Manage business units, licenses, and module activation
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/subscriptions/clusters" className="flex items-center">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Clusters
            </Link>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="business-units">
        <TabsList className="mb-4">
          <TabsTrigger value="business-units">Business Units</TabsTrigger>
          <TabsTrigger value="license-management">License Management</TabsTrigger>
        </TabsList>
        
        <TabsContent value="business-units">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <CardTitle>Business Units</CardTitle>
                  <CardDescription>
                    Configure business units and manage their licenses
                  </CardDescription>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search business units..."
                      className="pl-8 w-full sm:w-[200px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={clusterFilter} onValueChange={setClusterFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Cluster" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Clusters</SelectItem>
                      {clusters.map((cluster) => (
                        <SelectItem key={cluster.id} value={cluster.name}>
                          {cluster.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Business Unit
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable columns={convertColumns(columns)} data={filteredBusinessUnits} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="license-management">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-3">
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <CardTitle>License Allocation</CardTitle>
                    <CardDescription>
                      Manage and monitor license utilization across business units
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setLicenseView("summary")} className={licenseView === "summary" ? "bg-secondary" : ""}>
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Summary View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setLicenseView("detailed")} className={licenseView === "detailed" ? "bg-secondary" : ""}>
                      <Filter className="mr-2 h-4 w-4" />
                      Detailed View
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">BU Staff Licenses</CardTitle>
                        <CardDescription>
                          Licenses for staff working within specific business units
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex justify-between items-center mb-2">
                          <div className="text-2xl font-bold">{usedBUStaffLicenses}/{totalBUStaffLicenses}</div>
                          <Badge variant={usedBUStaffLicenses / totalBUStaffLicenses > 0.9 ? "destructive" : "outline"}>
                            {Math.round((usedBUStaffLicenses / totalBUStaffLicenses) * 100)}% Used
                          </Badge>
                        </div>
                        <Progress 
                          value={(usedBUStaffLicenses / totalBUStaffLicenses) * 100} 
                          className="h-2"
                        />
                      </CardContent>
                      <CardFooter className="pt-0">
                        {usedBUStaffLicenses / totalBUStaffLicenses > 0.9 && (
                          <p className="text-sm text-muted-foreground">
                            <span className="text-destructive font-medium">Warning:</span> You are approaching your license limit. Consider upgrading your plan.
                          </p>
                        )}
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Cluster User Licenses</CardTitle>
                        <CardDescription>
                          Licenses for users working across multiple business units
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex justify-between items-center mb-2">
                          <div className="text-2xl font-bold">{usedClusterUserLicenses}/{totalClusterUserLicenses}</div>
                          <Badge variant={usedClusterUserLicenses / totalClusterUserLicenses > 0.9 ? "destructive" : "outline"}>
                            {Math.round((usedClusterUserLicenses / totalClusterUserLicenses) * 100)}% Used
                          </Badge>
                        </div>
                        <Progress 
                          value={(usedClusterUserLicenses / totalClusterUserLicenses) * 100} 
                          className="h-2"
                        />
                      </CardContent>
                      <CardFooter className="pt-0">
                        {usedClusterUserLicenses / totalClusterUserLicenses > 0.9 && (
                          <p className="text-sm text-muted-foreground">
                            <span className="text-destructive font-medium">Warning:</span> You are approaching your license limit. Consider upgrading your plan.
                          </p>
                        )}
                      </CardFooter>
                    </Card>
                  </div>
                  
                  {licenseView === "detailed" && (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Business Unit</TableHead>
                            <TableHead>BU Staff</TableHead>
                            <TableHead>Cluster Users</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {businessUnits.map((bu) => (
                            <TableRow key={bu.id}>
                              <TableCell>
                                <div className="font-medium">{bu.name}</div>
                                <div className="text-xs text-muted-foreground">{bu.cluster}</div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <div className="w-24">
                                    <div className="flex justify-between text-xs mb-1">
                                      <span>{bu.buStaffLicenses.used}</span>
                                      <span>of {bu.buStaffLicenses.total}</span>
                                    </div>
                                    <Progress 
                                      value={(bu.buStaffLicenses.used / bu.buStaffLicenses.total) * 100} 
                                      className="h-2"
                                    />
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <div className="w-24">
                                    <div className="flex justify-between text-xs mb-1">
                                      <span>{bu.clusterUserLicenses.used}</span>
                                      <span>of {bu.clusterUserLicenses.total}</span>
                                    </div>
                                    <Progress 
                                      value={(bu.clusterUserLicenses.used / bu.clusterUserLicenses.total) * 100} 
                                      className="h-2"
                                    />
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                {bu.buStaffLicenses.used + bu.clusterUserLicenses.used}/
                                {bu.buStaffLicenses.total + bu.clusterUserLicenses.total}
                              </TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">
                                  Adjust Licenses
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Module Activation</CardTitle>
                        <CardDescription>
                          Most activated modules across business units
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {moduleUsage.slice(0, 4).map((module) => (
                            <div key={module.id}>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium">{module.name}</span>
                                <span className="text-sm text-muted-foreground">{module.count}/{businessUnits.length} units</span>
                              </div>
                              <Progress value={module.percentage} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Expiration Summary</CardTitle>
                        <CardDescription>
                          Upcoming business unit expirations
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Next 30 days</span>
                              <Badge variant="outline">0 units</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Next 60 days</span>
                              <Badge variant="outline">0 units</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Next 90 days</span>
                              <Badge variant="outline">5 units</Badge>
                            </div>
                          </div>
                          <Button variant="outline" className="w-full">
                            View Expiration Schedule
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>
                      Manage License Pool
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Table component for the detailed license view
function Table({ children }: { children: React.ReactNode }) {
  return <table className="w-full caption-bottom text-sm">{children}</table>
}

function TableHeader({ children }: { children: React.ReactNode }) {
  return <thead>{children}</thead>
}

function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>
}

function TableRow({ children }: { children: React.ReactNode }) {
  return <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">{children}</tr>
}

function TableHead({ children }: { children: React.ReactNode }) {
  return <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">{children}</th>
}

function TableCell({ children }: { children: React.ReactNode }) {
  return <td className="p-4 align-middle">{children}</td>
}
