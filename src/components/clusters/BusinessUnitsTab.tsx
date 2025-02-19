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
    type: "Hotel",
    location: "Singapore",
    rooms: 245,
    status: "active",
    lastUpdated: "2024-03-15",
  },
  {
    id: "bu-2",
    name: "Bangkok Riverside",
    type: "Resort",
    location: "Thailand",
    rooms: 180,
    status: "active",
    lastUpdated: "2024-03-14",
  },
  // Add more mock data as needed
]

interface BusinessUnitsTabProps {
  clusterId: string
}

export function BusinessUnitsTab({ clusterId }: BusinessUnitsTabProps) {
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Rooms</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {businessUnits.map((unit) => (
            <TableRow key={unit.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  {unit.name}
                </div>
              </TableCell>
              <TableCell>{unit.type}</TableCell>
              <TableCell>{unit.location}</TableCell>
              <TableCell>{unit.rooms}</TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {unit.status}
                </Badge>
              </TableCell>
              <TableCell>{unit.lastUpdated}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/clusters/${clusterId}/business-units/${unit.id}`}>
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Edit Settings</DropdownMenuItem>
                    <DropdownMenuItem>View Reports</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Delete Business Unit
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