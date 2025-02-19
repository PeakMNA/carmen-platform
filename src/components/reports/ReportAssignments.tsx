"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, MoreHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { BulkReportAssignment } from "./BulkReportAssignment"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const assignments = [
  {
    id: "a-1",
    hotel: "Grand Hotel Downtown",
    brand: "Luxury Collection",
    reportName: "Inventory Stock Level Report",
    type: "standard",
    schedule: "Daily",
    nextGeneration: "2024-03-25",
    status: "active",
    department: "Supply Chain",
  },
  {
    id: "a-2",
    hotel: "Business Tower Hotel",
    brand: "Business Hotels",
    reportName: "Custom Supplier Analysis",
    type: "custom",
    schedule: "Weekly",
    nextGeneration: "2024-03-25",
    status: "active",
    department: "Procurement",
  },
  {
    id: "a-3",
    hotel: "Beachfront Resort & Spa",
    brand: "Resort Collection",
    reportName: "Kitchen Supplies Usage",
    type: "standard",
    schedule: "Daily",
    nextGeneration: "2024-03-25",
    status: "active",
    department: "F&B",
  },
  {
    id: "a-4",
    hotel: "Grand Hotel Downtown",
    brand: "Luxury Collection",
    reportName: "Housekeeping Stock Alert",
    type: "custom",
    schedule: "Daily",
    nextGeneration: "2024-03-25",
    status: "active",
    department: "Housekeeping",
  },
]

export function ReportAssignments() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Report Assignments</CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative w-[300px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search assignments..." className="pl-8" />
          </div>
          <BulkReportAssignment />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{assignment.reportName}</span>
                  <Badge variant="outline">{assignment.type}</Badge>
                  <Badge>{assignment.status}</Badge>
                  <Badge variant="secondary">{assignment.department}</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {assignment.hotel} • {assignment.brand}
                </div>
                <div className="text-sm text-muted-foreground">
                  {assignment.schedule} • Next: {assignment.nextGeneration}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Disable</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 