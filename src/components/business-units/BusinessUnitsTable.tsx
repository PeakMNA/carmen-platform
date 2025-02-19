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
import { MoreHorizontal, Briefcase, Users } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BusinessUnitDetails } from "./BusinessUnitDetails"

const businessUnits = [
  {
    id: "bu-1234",
    name: "Grand Hotel Downtown",
    head: "Sarah Johnson",
    teams: "8",
    members: "350",
    brand: "Luxury Collection",
    status: "active",
    location: "New York",
    rooms: "280",
  },
  {
    id: "bu-1235",
    name: "Business Tower Hotel",
    head: "Michael Chen",
    teams: "6",
    members: "220",
    brand: "Business Hotels",
    status: "active",
    location: "Chicago",
    rooms: "180",
  },
  {
    id: "bu-1236",
    name: "Beachfront Resort & Spa",
    head: "Maria Garcia",
    teams: "10",
    members: "400",
    brand: "Resort Collection",
    status: "active",
    location: "Bali",
    rooms: "320",
  },
  {
    id: "bu-1237",
    name: "City Center Hotel",
    head: "James Wilson",
    teams: "7",
    members: "280",
    brand: "Business Hotels",
    status: "active",
    location: "London",
    rooms: "240",
  },
]

export function BusinessUnitsTable() {
  const [selectedUnit, setSelectedUnit] = useState<typeof businessUnits[0] | null>(null)

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Head</TableHead>
              <TableHead>Teams</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Rooms</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {businessUnits.map((unit) => (
              <TableRow key={unit.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    {unit.name}
                  </div>
                </TableCell>
                <TableCell>{unit.head}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    {unit.teams}
                  </div>
                </TableCell>
                <TableCell>{unit.members}</TableCell>
                <TableCell>{unit.brand}</TableCell>
                <TableCell>
                  <Badge variant="default">
                    {unit.status}
                  </Badge>
                </TableCell>
                <TableCell>{unit.location}</TableCell>
                <TableCell>{unit.rooms}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSelectedUnit(unit)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>Edit Unit</DropdownMenuItem>
                      <DropdownMenuItem>Manage Teams</DropdownMenuItem>
                      <DropdownMenuItem>Assign Tenants</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Deactivate Unit
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedUnit && (
        <BusinessUnitDetails
          unit={selectedUnit}
          isOpen={!!selectedUnit}
          onClose={() => setSelectedUnit(null)}
        />
      )}
    </>
  )
} 