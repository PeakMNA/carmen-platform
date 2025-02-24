"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface BusinessUnitTemplatesProps {
  businessUnitId: string
}

interface Template {
  id: string
  name: string
  category: string
  description: string
  schedule: string
  lastGenerated: string
  nextGeneration: string
  status: "active" | "paused"
}

interface BusinessUnit {
  id: string
  name: string
  clusterId: string
  assignedTemplates: string[]
}

const mockBusinessUnits: BusinessUnit[] = [
  {
    id: "bu-1",
    name: "Grand Hotel Singapore",
    clusterId: "c-1",
    assignedTemplates: ["t-1", "t-2"]
  },
  {
    id: "bu-2",
    name: "Luxury Resort Bali",
    clusterId: "c-1",
    assignedTemplates: ["t-1"]
  },
  {
    id: "bu-3",
    name: "Business Hotel Bangkok",
    clusterId: "c-2",
    assignedTemplates: ["t-2", "t-3"]
  }
]

const mockTemplates: Template[] = [
  {
    id: "t-1",
    name: "Monthly Revenue Report",
    category: "Finance",
    description: "Comprehensive monthly revenue analysis with breakdown by department",
    schedule: "Monthly",
    lastGenerated: "2025-02-01T10:00:00Z",
    nextGeneration: "2025-03-01T10:00:00Z",
    status: "active"
  },
  {
    id: "t-2",
    name: "Inventory Status Report",
    category: "Operations",
    description: "Daily inventory levels and stock movement tracking",
    schedule: "Daily",
    lastGenerated: "2025-02-21T06:00:00Z",
    nextGeneration: "2025-02-22T06:00:00Z",
    status: "active"
  },
  {
    id: "t-3",
    name: "Staff Performance Analysis",
    category: "HR",
    description: "Quarterly staff performance metrics and KPIs",
    schedule: "Quarterly",
    lastGenerated: "2025-01-01T09:00:00Z",
    nextGeneration: "2025-04-01T09:00:00Z",
    status: "paused"
  }
]

export function BusinessUnitTemplates({ businessUnitId }: BusinessUnitTemplatesProps) {
  const businessUnit = mockBusinessUnits.find(bu => bu.id === businessUnitId)
  const assignedTemplates = mockTemplates.filter(template => 
    businessUnit?.assignedTemplates.includes(template.id)
  )

  if (!businessUnit) {
    return (
      <div className="text-center text-muted-foreground py-8">
        Business unit not found
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Report Templates</h2>
        <p className="text-muted-foreground">
          View and manage assigned report templates for {businessUnit.name}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assigned Templates</CardTitle>
        </CardHeader>
        <CardContent>
          {assignedTemplates.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Last Generated</TableHead>
                  <TableHead>Next Generation</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignedTemplates.map(template => (
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
                      {new Date(template.lastGenerated).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {new Date(template.nextGeneration).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={template.status === "active" ? "default" : "secondary"}
                      >
                        {template.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              No templates assigned to this business unit
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
