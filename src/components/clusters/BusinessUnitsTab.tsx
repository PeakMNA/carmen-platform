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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Building2, MoreHorizontal, Plus } from "lucide-react"
import Link from "next/link"

// Mock data - replace with API call
const businessUnits = [
  {
    id: "bu-1",
    name: "Singapore Downtown",
    brand: "Luxury Collection",
    type: "Hotel",
    clusterId: "cluster-1",
    head: "David Chen",
    location: {
      city: "Singapore",
      country: "Singapore"
    },
    details: {
      rooms: 245,
      teams: 12,
      members: 150
    },
    contact: {
      email: "info@singaporedowntown.com",
      phone: "+65 1234 5678",
      address: "123 Marina Bay, Singapore"
    },
    configuration: {
      database: {
        host: "db.singaporedowntown.com",
        name: "singapore_db",
        type: "postgres"
      },
      cluster: {
        id: "cluster-1",
        name: "Southeast Asia"
      }
    },
    settings: {
      notifications: {
        email: true,
        slack: true,
        webhook: false
      },
      integrations: {
        enabled: ["pms", "crm"],
        configurations: {}
      }
    },
    reports: [],
    status: "active",
    createdAt: "2024-01-15T08:00:00Z",
    updatedAt: "2024-03-15T10:30:00Z"
  },
  {
    id: "bu-2",
    name: "Bangkok Riverside",
    brand: "Premium Resorts",
    type: "Resort",
    clusterId: "cluster-1",
    head: "Somchai Patel",
    location: {
      city: "Bangkok",
      country: "Thailand"
    },
    details: {
      rooms: 180,
      teams: 10,
      members: 120
    },
    contact: {
      email: "info@bangkokriverside.com",
      phone: "+66 2345 6789",
      address: "456 Chao Phraya, Bangkok"
    },
    configuration: {
      database: {
        host: "db.bangkokriverside.com",
        name: "bangkok_db",
        type: "mysql"
      },
      cluster: {
        id: "cluster-1",
        name: "Southeast Asia"
      }
    },
    settings: {
      notifications: {
        email: true,
        slack: false,
        webhook: true
      },
      integrations: {
        enabled: ["pms"],
        configurations: {}
      }
    },
    reports: [],
    status: "active",
    createdAt: "2024-01-20T09:00:00Z",
    updatedAt: "2024-03-14T11:45:00Z"
  }
]

interface BusinessUnitsTabProps {
  clusterId: string
}

export function BusinessUnitsTab({ clusterId }: BusinessUnitsTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Business Units</h2>
        <Link href={`/admin/clusters/${clusterId}/business-units/add`}>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Business Unit
          </Button>
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Rooms</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {businessUnits.map((unit) => (
              <TableRow key={unit.id} className="cursor-pointer" onClick={() => window.location.href = `/admin/business-units/${unit.id}`}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Building2 className="mr-2 h-4 w-4 text-muted-foreground" />
                    {unit.name}
                  </div>
                </TableCell>
                <TableCell>{unit.type}</TableCell>
                <TableCell>{`${unit.location.city}, ${unit.location.country}`}</TableCell>
                <TableCell>{unit.details.rooms}</TableCell>
                <TableCell>
                  <Badge variant={unit.status === "active" ? "default" : "secondary"}>
                    {unit.status}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(unit.updatedAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `/admin/business-units/${unit.id}`;
                      }}>
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/clusters/${clusterId}/business-units/${unit.id}/edit`}>
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
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