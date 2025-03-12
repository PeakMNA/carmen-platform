"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter, ArrowUpDown, Edit, Eye } from "lucide-react"
import Link from "next/link"
import { mockBusinessUnits } from "@/data/business-units"

export function BusinessUnitsManageClient() {
  // Use the mock data from the data file
  const businessUnits = mockBusinessUnits;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Business Units</h1>
          <p className="text-muted-foreground">
            Manage all hotels and properties in the system
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/business-units/add">
            <Button className="gap-1">
              <Plus className="h-4 w-4" />
              Add Business Unit
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Business Units</CardTitle>
          <CardDescription>
            A list of all business units in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 w-full max-w-sm">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search business units..."
                  className="pl-8"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">Export</Button>
              <Button variant="outline" size="sm">Import</Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1 cursor-pointer">
                      Name
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Cluster</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Rooms</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {businessUnits.map((unit) => (
                  <TableRow key={unit.id} className="cursor-pointer" onClick={() => window.location.href = `/admin/business-units/${unit.id}`}>
                    <TableCell className="font-medium">{unit.id}</TableCell>
                    <TableCell>
                      <Link href={`/admin/business-units/${unit.id}`} className="hover:underline">
                        {unit.name}
                      </Link>
                    </TableCell>
                    <TableCell>{unit.configuration.cluster.name}</TableCell>
                    <TableCell>{unit.brand}</TableCell>
                    <TableCell>{`${unit.location.city}, ${unit.location.country}`}</TableCell>
                    <TableCell>{unit.details.rooms}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          unit.status === "active"
                            ? "default"
                            : unit.status === "inactive"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {unit.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(unit.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Link href={`/admin/business-units/${unit.id}`} onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" title="View">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/admin/business-units/${unit.id}/edit`} onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" title="Edit">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
              Showing <strong>1-3</strong> of <strong>3</strong> business units
            </div>
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 