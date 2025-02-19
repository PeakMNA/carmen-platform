"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, Plus, FileText, Settings } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReportRequestManagement } from "@/components/reports/ReportRequestManagement"

interface ReportAssignment {
  id: string
  entityType: "brand" | "hotel"
  entityId: string
  entityName: string
  reportType: "standard" | "custom"
  reportName: string
  assignedBy: string
  assignedDate: string
  status: string
  priority: "low" | "medium" | "high"
}

const assignments: ReportAssignment[] = [
  {
    id: "RA-1234",
    entityType: "brand",
    entityId: "hb-1234",
    entityName: "Luxury Collection Hotels & Resorts",
    reportType: "standard",
    reportName: "Brand Performance Report",
    assignedBy: "Support Team",
    assignedDate: "2024-03-15",
    status: "active",
    priority: "high",
  },
  {
    id: "RA-1235",
    entityType: "hotel",
    entityId: "h-1234",
    entityName: "Grand Hotel Downtown",
    reportType: "custom",
    reportName: "Custom Revenue Analysis",
    assignedBy: "Support Team",
    assignedDate: "2024-03-14",
    status: "active",
    priority: "medium",
  },
]

export function SupportReportManagement() {
  const [showAssignmentForm, setShowAssignmentForm] = useState(false)
  const [selectedEntityType, setSelectedEntityType] = useState<"brand" | "hotel">("brand")
  const [reportType, setReportType] = useState<"standard" | "custom">("standard")

  return (
    <Tabs defaultValue="requests" className="space-y-4">
      <TabsList>
        <TabsTrigger value="requests">Report Requests</TabsTrigger>
        <TabsTrigger value="assignments">Active Reports</TabsTrigger>
        <TabsTrigger value="templates">Report Templates</TabsTrigger>
      </TabsList>

      <TabsContent value="requests">
        <ReportRequestManagement />
      </TabsContent>

      <TabsContent value="assignments">
        <div className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Report Assignments</CardTitle>
              <Button onClick={() => setShowAssignmentForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Assign Report
              </Button>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search assignments..." className="pl-8" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="standard">Standard Reports</SelectItem>
                    <SelectItem value="custom">Custom Reports</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{assignment.entityName}</span>
                        <Badge variant="outline">
                          {assignment.entityType === "brand" ? "Hotel Brand" : "Hotel"}
                        </Badge>
                        <Badge variant={assignment.reportType === "standard" ? "default" : "secondary"}>
                          {assignment.reportType === "standard" ? "Standard" : "Custom"}
                        </Badge>
                        <Badge variant={
                          assignment.priority === "high" 
                            ? "destructive" 
                            : assignment.priority === "medium" 
                            ? "default" 
                            : "secondary"
                        }>
                          {assignment.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Report: {assignment.reportName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Assigned by {assignment.assignedBy} on {assignment.assignedDate}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Settings className="mr-2 h-4 w-4" />
                        Configure
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        View Report
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {showAssignmentForm && (
            <Card>
              <CardHeader>
                <CardTitle>Assign Report</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Report Type</Label>
                    <Select
                      value={reportType}
                      onValueChange={(value: "standard" | "custom") => setReportType(value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Report</SelectItem>
                        <SelectItem value="custom">Custom Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {reportType === "custom" && (
                    <div className="space-y-2">
                      <Label>Custom Report Details</Label>
                      <Textarea
                        placeholder="Enter custom report requirements..."
                        className="min-h-[100px]"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Entity Type</Label>
                    <Select
                      value={selectedEntityType}
                      onValueChange={(value: "brand" | "hotel") => setSelectedEntityType(value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="brand">Hotel Brand</SelectItem>
                        <SelectItem value="hotel">Hotel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowAssignmentForm(false)}>
                      Cancel
                    </Button>
                    <Button>Assign Report</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </TabsContent>

      <TabsContent value="templates">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Report Templates</CardTitle>
              <Button>Create Template</Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Template management content */}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
} 