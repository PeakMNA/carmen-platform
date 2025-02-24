"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AddTemplateDialog } from "./AddTemplateDialog"

interface ReportTemplate {
  id: string
  name: string
  category: string
  description: string
  schedule: string
  dataPoints: string[]
  assignedTo: {
    clusterId: string
    clusterName: string
    hotelCount: number
  }[]
  lastUpdated: string
  status: "active" | "draft" | "archived"
}

const mockTemplates: ReportTemplate[] = [
  {
    id: "rt-1",
    name: "Monthly Revenue Report",
    category: "Finance",
    description: "Comprehensive monthly revenue analysis with breakdown by department",
    schedule: "Monthly",
    dataPoints: [
      "Total Revenue",
      "Revenue by Department",
      "Year-over-Year Growth",
      "RevPAR",
      "ADR"
    ],
    assignedTo: [
      { clusterId: "c-1", clusterName: "Luxury Hotels Group", hotelCount: 12 },
      { clusterId: "c-2", clusterName: "Premium Resorts Collection", hotelCount: 8 }
    ],
    lastUpdated: "2025-02-20T15:30:00Z",
    status: "active"
  },
  {
    id: "rt-2",
    name: "Inventory Status Report",
    category: "Operations",
    description: "Daily inventory levels and stock movement tracking",
    schedule: "Daily",
    dataPoints: [
      "Current Stock Levels",
      "Stock Movement",
      "Low Stock Alerts",
      "Reorder Points"
    ],
    assignedTo: [
      { clusterId: "c-1", clusterName: "Luxury Hotels Group", hotelCount: 12 }
    ],
    lastUpdated: "2025-02-19T10:15:00Z",
    status: "active"
  },
  {
    id: "rt-3",
    name: "Staff Performance Analysis",
    category: "HR",
    description: "Quarterly staff performance metrics and KPIs",
    schedule: "Quarterly",
    dataPoints: [
      "Employee Productivity",
      "Attendance Rate",
      "Guest Satisfaction Scores",
      "Training Completion"
    ],
    assignedTo: [],
    lastUpdated: "2025-02-18T09:45:00Z",
    status: "draft"
  }
]

export function ReportTemplates() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Report Templates</h2>
          <p className="text-muted-foreground">
            Manage and customize report templates
          </p>
        </div>
        <AddTemplateDialog />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Data Points</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTemplates.map(template => (
                <TableRow key={template.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{template.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {template.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{template.category}</Badge>
                  </TableCell>
                  <TableCell>{template.schedule}</TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">
                      {template.dataPoints.length} data points
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {template.assignedTo.length > 0 ? (
                        template.assignedTo.map(assignment => (
                          <div key={assignment.clusterId} className="text-sm">
                            {assignment.clusterName}
                            <span className="text-muted-foreground"> • {assignment.hotelCount} hotels</span>
                          </div>
                        ))
                      ) : (
                        <span className="text-sm text-muted-foreground">Not assigned</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(template.lastUpdated).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        template.status === "active" ? "default" :
                        template.status === "draft" ? "secondary" :
                        "outline"
                      }
                    >
                      {template.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
