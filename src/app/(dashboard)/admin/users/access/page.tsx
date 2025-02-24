"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Users, Building2, AlertTriangle } from "lucide-react"

interface ModuleAccess {
  id: string
  module: string
  clusterId: string
  clusterName: string
  totalLimit: number
  usedCount: number
  activeUsers: string[]
  status: "active" | "warning" | "exceeded"
  lastUpdated: string
}

const mockClusters = [
  { id: "c-1", name: "Luxury Hotels Group" },
  { id: "c-2", name: "Premium Resorts Collection" },
  { id: "c-3", name: "Business Hotels Network" }
]

const mockAccess: ModuleAccess[] = [
  {
    id: "ma-1",
    module: "Finance",
    clusterId: "c-1",
    clusterName: "Luxury Hotels Group",
    totalLimit: 20,
    usedCount: 15,
    activeUsers: ["Sarah Johnson", "Michael Chen", "Emily Brown"],
    status: "active",
    lastUpdated: "2024-02-22T10:30:00Z"
  },
  {
    id: "ma-2",
    module: "Inventory",
    clusterId: "c-1",
    clusterName: "Luxury Hotels Group",
    totalLimit: 30,
    usedCount: 28,
    activeUsers: ["David Wilson", "Lisa Anderson", "James Lee"],
    status: "warning",
    lastUpdated: "2024-02-22T09:45:00Z"
  },
  {
    id: "ma-3",
    module: "Reports",
    clusterId: "c-2",
    clusterName: "Premium Resorts Collection",
    totalLimit: 15,
    usedCount: 15,
    activeUsers: ["Robert Taylor", "Maria Garcia"],
    status: "exceeded",
    lastUpdated: "2024-02-21T15:20:00Z"
  }
]

const modules = [
  { value: "all", label: "All Modules" },
  { value: "finance", label: "Finance" },
  { value: "inventory", label: "Inventory" },
  { value: "procurement", label: "Procurement" },
  { value: "reports", label: "Reports" }
]

export default function AccessControlPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Access Control</h1>
        <p className="text-muted-foreground">
          Manage module access and user limits
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="w-[200px]">
          <Label>Hotel Group</Label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Filter by group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Groups</SelectItem>
              {mockClusters.map(cluster => (
                <SelectItem key={cluster.id} value={cluster.id}>
                  {cluster.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-[200px]">
          <Label>Module</Label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Filter by module" />
            </SelectTrigger>
            <SelectContent>
              {modules.map(module => (
                <SelectItem key={module.value} value={module.value}>
                  {module.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">58</div>
            <p className="text-xs text-muted-foreground">
              Across all modules
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Modules</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              In use across groups
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usage Warnings</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Approaching limits
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exceeded Limits</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              Over user limits
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Module Access</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Module</TableHead>
                <TableHead>Hotel Group</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Active Users</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAccess.map(access => (
                <TableRow key={access.id}>
                  <TableCell className="font-medium">{access.module}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      {access.clusterName}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{access.usedCount} of {access.totalLimit} users</span>
                        <span className="text-muted-foreground">
                          {Math.round((access.usedCount / access.totalLimit) * 100)}%
                        </span>
                      </div>
                      <Progress
                        value={(access.usedCount / access.totalLimit) * 100}
                        className={
                          access.status === "exceeded" ? "bg-red-100" :
                          access.status === "warning" ? "bg-yellow-100" :
                          undefined
                        }
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{access.activeUsers.length} active</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        access.status === "active" ? "default" :
                        access.status === "warning" ? "secondary" :
                        "destructive"
                      }
                    >
                      {access.status === "exceeded" ? "Limit Exceeded" :
                       access.status === "warning" ? "Near Limit" :
                       "Active"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(access.lastUpdated).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
