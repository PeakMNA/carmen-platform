"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Building2, MoreHorizontal, FolderTree } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const clusterReports = [
  {
    id: "c-1",
    name: "APAC Cluster",
    businessUnits: [
      {
        id: "bu-1",
        name: "Grand Hotel Downtown",
        brand: "Luxury Collection",
        reports: [
          {
            name: "Inventory Stock Level Report",
            type: "standard",
            department: "Supply Chain",
            status: "active",
          },
          {
            name: "Low Stock Alert Report",
            type: "custom",
            department: "Supply Chain",
            status: "active",
          },
        ],
      },
      {
        id: "bu-2",
        name: "Business Tower Hotel",
        brand: "Business Hotels",
        reports: [
          {
            name: "Weekly Supplier Performance",
            type: "standard",
            department: "Procurement",
            status: "active",
          },
        ],
      },
    ],
  },
  {
    id: "c-2",
    name: "EMEA Cluster",
    businessUnits: [
      {
        id: "bu-3",
        name: "Beachfront Resort & Spa",
        brand: "Resort Collection",
        reports: [
          {
            name: "Kitchen Supplies Usage",
            type: "standard",
            department: "F&B",
            status: "active",
          },
        ],
      },
    ],
  },
]

export function BusinessUnitReports() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Business Unit Reports</CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative w-[300px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search business units..." className="pl-8" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {clusterReports.map((cluster) => (
            <div key={cluster.id} className="space-y-4">
              <div className="flex items-center gap-2">
                <FolderTree className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold">{cluster.name}</h3>
              </div>
              <div className="grid gap-4 pl-6">
                {cluster.businessUnits.map((bu) => (
                  <Card key={bu.id}>
                    <CardHeader className="flex flex-row items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{bu.name}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {bu.brand}
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Manage Reports</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {bu.reports.map((report, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between rounded-lg border p-2"
                          >
                            <div className="flex items-center gap-2">
                              <span>{report.name}</span>
                              <Badge variant="outline">{report.type}</Badge>
                              <Badge variant="secondary">
                                {report.department}
                              </Badge>
                              <Badge>{report.status}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 