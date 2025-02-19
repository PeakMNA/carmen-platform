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
import { MoreHorizontal, Building2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const tickets = [
  {
    id: "T-1234",
    subject: "Login Issues",
    tenant: "Acme Corp",
    status: "open",
    priority: "high",
    assignee: "John Doe",
    created: "2 hours ago",
  },
  {
    id: "T-1235",
    subject: "Data Export Not Working",
    tenant: "Tech Inc",
    status: "in-progress",
    priority: "medium",
    assignee: "Jane Smith",
    created: "4 hours ago",
  },
  {
    id: "T-1236",
    subject: "Feature Request",
    tenant: "Dev Co",
    status: "open",
    priority: "low",
    assignee: "Unassigned",
    created: "1 day ago",
  },
]

export function SupportTickets() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ticket ID</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Tenant</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell className="font-medium">{ticket.id}</TableCell>
              <TableCell>{ticket.subject}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  {ticket.tenant}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    ticket.status === "open"
                      ? "default"
                      : ticket.status === "in-progress"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {ticket.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    ticket.priority === "high"
                      ? "destructive"
                      : ticket.priority === "medium"
                      ? "default"
                      : "secondary"
                  }
                >
                  {ticket.priority}
                </Badge>
              </TableCell>
              <TableCell>{ticket.assignee}</TableCell>
              <TableCell className="text-muted-foreground">
                {ticket.created}
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
                    <DropdownMenuItem>Assign Ticket</DropdownMenuItem>
                    <DropdownMenuItem>Update Status</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Close Ticket
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