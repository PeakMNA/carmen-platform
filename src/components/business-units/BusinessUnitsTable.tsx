"use client"

import { useParams, useRouter } from "next/navigation"
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
import { MoreHorizontal, Briefcase, Users, FolderTree } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BusinessUnit } from '@/types/tenant'

interface BusinessUnitsTableProps {
  businessUnits: BusinessUnit[]
}

export function BusinessUnitsTable({ businessUnits }: BusinessUnitsTableProps) {
  const { clusterId } = useParams()
  const router = useRouter()

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Head</TableHead>
              <TableHead>Cluster</TableHead>
              <TableHead>Teams</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Database</TableHead>
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
                    <FolderTree className="h-4 w-4 text-muted-foreground" />
                    {unit.configuration.cluster.name}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    {unit.details.teams}
                  </div>
                </TableCell>
                <TableCell>{unit.details.members}</TableCell>
                <TableCell>{unit.brand}</TableCell>
                <TableCell>
                  <Badge variant="default">
                    {unit.status}
                  </Badge>
                </TableCell>
                <TableCell>{`${unit.location.city}, ${unit.location.country}`}</TableCell>
                <TableCell>{unit.configuration.database.name}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => 
                        router.push(`/admin/clusters/${clusterId}/business-units/${unit.id}`)
                      }>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => 
                        router.push(`/admin/clusters/${clusterId}/business-units/${unit.id}/edit`)
                      }>
                        Edit Unit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => 
                        router.push(`/admin/clusters/${clusterId}/business-units/${unit.id}`)
                      }>
                        Manage Users & Roles
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => 
                        router.push(`/admin/business-units/${unit.id}/templates`)
                      }>
                        Templates
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => 
                        router.push(`/admin/reports?businessUnitId=${unit.id}`)
                      }>
                        Reports
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => {
                          if (confirm('Are you sure you want to deactivate this business unit?')) {
                            // TODO: Implement deactivation
                            console.log('Deactivating unit:', unit.id)
                          }
                        }}
                      >
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

    </>
  )
}
