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
import { MoreHorizontal, Server } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const clusters = [
  {
    id: "c-1234",
    name: "Luxury Collection Hotels & Resorts",
    region: "Global",
    status: "healthy",
    type: "Luxury",
    properties: "25",
    revenue: "$2.8B",
    lastUpdated: "2 hours ago",
  },
  {
    id: "c-1235",
    name: "Business Hotels Division",
    region: "Global",
    status: "healthy",
    type: "Business",
    properties: "40",
    revenue: "$3.2B",
    lastUpdated: "1 day ago",
  },
  {
    id: "c-1236",
    name: "Resort Collection",
    region: "Global",
    status: "healthy",
    type: "Resort",
    properties: "15",
    revenue: "$1.8B",
    lastUpdated: "3 days ago",
  },
]

export function ClustersTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Region</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Properties</TableHead>
            <TableHead>Revenue</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clusters.map((cluster) => (
            <TableRow key={cluster.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-muted-foreground" />
                  {cluster.name}
                </div>
              </TableCell>
              <TableCell>{cluster.region}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    cluster.status === "healthy"
                      ? "default"
                      : cluster.status === "warning"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {cluster.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{cluster.type}</Badge>
              </TableCell>
              <TableCell>{cluster.properties}</TableCell>
              <TableCell>{cluster.revenue}</TableCell>
              <TableCell className="text-muted-foreground">
                {cluster.lastUpdated}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Cluster</DropdownMenuItem>
                    <DropdownMenuItem>Scale Nodes</DropdownMenuItem>
                    <DropdownMenuItem>Upgrade Version</DropdownMenuItem>
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