"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, MoreHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const templates = [
  {
    id: "T-1234",
    name: "Inventory Stock Level Report",
    description: "Comprehensive inventory tracking and stock level analysis",
    category: "Inventory",
    department: "Supply Chain",
    status: "active",
    sections: [
      "Current Stock Levels",
      "Reorder Points",
      "Safety Stock Analysis",
      "Stock Movement Trends"
    ],
    modifiedBy: "Sarah Johnson",
    lastModified: "2 days ago",
  },
  {
    id: "T-1235",
    name: "Supplier Performance Dashboard",
    description: "Vendor performance metrics and delivery analysis",
    category: "Vendor Management",
    department: "Procurement",
    status: "active",
    sections: [
      "Delivery Performance",
      "Quality Metrics",
      "Cost Analysis",
      "Supplier Compliance"
    ],
    modifiedBy: "James Wilson",
    lastModified: "1 week ago",
  },
  {
    id: "T-1236",
    name: "Warehouse Operations Report",
    description: "Daily warehouse operations and efficiency metrics",
    category: "Warehouse",
    department: "Supply Chain",
    status: "active",
    sections: [
      "Storage Utilization",
      "Picking Efficiency",
      "Receiving Operations",
      "Inventory Accuracy"
    ],
    modifiedBy: "Michael Chen",
    lastModified: "3 days ago",
  },
  {
    id: "T-1237",
    name: "Supply Chain Cost Analysis",
    description: "Comprehensive cost tracking across supply chain operations",
    category: "Finance",
    department: "Supply Chain",
    status: "active",
    sections: [
      "Logistics Costs",
      "Storage Costs",
      "Processing Costs",
      "Cost Optimization"
    ],
    modifiedBy: "Emma Davis",
    lastModified: "5 days ago",
  }
]

export function ReportTemplates() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Report Templates</CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative w-[300px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search templates..." className="pl-8" />
          </div>
          <Button>Create Template</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="flex flex-col space-y-4 rounded-lg border p-4"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{template.name}</span>
                    <Badge variant="outline">{template.category}</Badge>
                    <Badge variant="secondary">{template.department}</Badge>
                    <Badge>{template.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {template.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Use Template
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit Template</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate Template</DropdownMenuItem>
                      <DropdownMenuItem>View History</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Delete Template
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {template.sections.map((section) => (
                  <Badge key={section} variant="outline">
                    {section}
                  </Badge>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                Modified {template.lastModified} by {template.modifiedBy}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 