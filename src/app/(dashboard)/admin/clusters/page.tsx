"use client"

import { Button } from "@/components/ui/button"
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
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Building2,
  FolderTree,
  MoreHorizontal,
  Plus,
  Search,
  Users,
  Database,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useState } from "react"

// Mock data - replace with API call
const metrics = {
  totalClusters: 8,
  activeClusters: 6,
  totalBusinessUnits: 48,
  totalUsers: 342,
}

const clusters = [
  {
    id: "c-1",
    name: "APAC Cluster",
    region: "Asia Pacific",
    businessUnits: 12,
    activeReports: 156,
    status: "active",
    lastUpdated: "2024-03-15",
  },
  {
    id: "c-2",
    name: "EMEA Cluster",
    region: "Europe, Middle East, Africa",
    businessUnits: 8,
    activeReports: 98,
    status: "active",
    lastUpdated: "2024-03-14",
  },
  {
    id: "c-3",
    name: "Americas Cluster",
    region: "North & South America",
    businessUnits: 4,
    activeReports: 45,
    status: "active",
    lastUpdated: "2024-03-13",
  },
]

const regions = ["All Regions", "Asia Pacific", "Europe", "North America", "Middle East"]
const statuses = ["All Statuses", "active", "maintenance", "inactive"]

export default function ClustersPage() {
  const [search, setSearch] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("All Regions")
  const [selectedStatus, setSelectedStatus] = useState("All Statuses")

  const filteredClusters = clusters.filter((cluster) => {
    const matchesSearch = cluster.name.toLowerCase().includes(search.toLowerCase())
    const matchesRegion = selectedRegion === "All Regions" || cluster.region === selectedRegion
    const matchesStatus = selectedStatus === "All Statuses" || cluster.status === selectedStatus
    return matchesSearch && matchesRegion && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Clusters</h2>
          <p className="text-muted-foreground">
            Manage your cluster configurations and business units
          </p>
        </div>
        <Link href="/admin/clusters/add">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Cluster
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clusters</CardTitle>
            <FolderTree className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalClusters}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.activeClusters} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Business Units</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalBusinessUnits}</div>
            <p className="text-xs text-muted-foreground">
              Across all clusters
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Platform-wide users
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Database Status</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <Badge variant="outline" className="text-base">
                Healthy
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              All systems operational
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clusters..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select region" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((region) => (
              <SelectItem key={region} value={region}>
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Region</TableHead>
            <TableHead>Business Units</TableHead>
            <TableHead>Active Reports</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredClusters.map((cluster) => (
            <TableRow key={cluster.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <FolderTree className="h-4 w-4 text-muted-foreground" />
                  {cluster.name}
                </div>
              </TableCell>
              <TableCell>{cluster.region}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  {cluster.businessUnits}
                </div>
              </TableCell>
              <TableCell>{cluster.activeReports}</TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {cluster.status}
                </Badge>
              </TableCell>
              <TableCell>{cluster.lastUpdated}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/clusters/${cluster.id}`}>
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Edit Settings</DropdownMenuItem>
                    <DropdownMenuItem>Manage Business Units</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Delete Cluster
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 