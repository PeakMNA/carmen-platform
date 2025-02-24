"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, FileText } from "lucide-react"

interface Cluster {
  id: string
  name: string
  region: string
  hotelCount: number
}

const clusters: Cluster[] = [
  { id: "c-1", name: "Luxury Hotels Group", region: "Asia Pacific", hotelCount: 12 },
  { id: "c-2", name: "Premium Resorts Collection", region: "Southeast Asia", hotelCount: 8 },
  { id: "c-3", name: "Business Hotels Network", region: "East Asia", hotelCount: 15 },
]

const standardReports = [
  { 
    id: "sr-1", 
    name: "Inventory Stock Level Report", 
    category: "Inventory"
  },
  { 
    id: "sr-2", 
    name: "Supplier Performance Analysis", 
    category: "Procurement"
  },
  { 
    id: "sr-3", 
    name: "Purchase Order Summary", 
    category: "Procurement"
  },
  { 
    id: "sr-4", 
    name: "Kitchen Supplies Usage", 
    category: "F&B"
  },
  { 
    id: "sr-5", 
    name: "Housekeeping Inventory Status", 
    category: "Housekeeping"
  },
  { 
    id: "sr-6", 
    name: "Cost Analysis Report", 
    category: "Finance"
  },
]

export function ReportAssignmentDialog() {
  const [reportType, setReportType] = useState<"standard" | "custom">("standard")
  const [selectedCluster, setSelectedCluster] = useState("")
  const [selectedReport, setSelectedReport] = useState("")
  const [customReportDetails, setCustomReportDetails] = useState("")
  const [schedule, setSchedule] = useState("monthly")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Assign Report
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Assign Report to Hotel Group</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Hotel Group</Label>
            <Select value={selectedCluster} onValueChange={setSelectedCluster}>
              <SelectTrigger>
                <SelectValue placeholder="Select hotel group..." />
              </SelectTrigger>
              <SelectContent>
                {clusters.map((cluster) => (
                  <SelectItem key={cluster.id} value={cluster.id}>
                    {cluster.name} ({cluster.region} • {cluster.hotelCount} hotels)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Report Type</Label>
            <Select value={reportType} onValueChange={(value: "standard" | "custom") => setReportType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard Report</SelectItem>
                <SelectItem value="custom">Custom Report</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {reportType === "standard" ? (
            <div className="space-y-2">
              <Label>Standard Report</Label>
              <Select value={selectedReport} onValueChange={setSelectedReport}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report..." />
                </SelectTrigger>
                <SelectContent>
                  {standardReports.map((report) => (
                    <SelectItem key={report.id} value={report.id}>
                      {report.name} ({report.category})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                This report will be assigned to all hotels in the selected group
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <Label>Custom Report Details</Label>
              <Input
                placeholder="Report Name"
                className="mb-2"
              />
              <Textarea
                placeholder="Enter custom report requirements..."
                value={customReportDetails}
                onChange={(e) => setCustomReportDetails(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>Schedule</Label>
            <Select value={schedule} onValueChange={setSchedule}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Additional Settings</Label>
            <div className="rounded-md border p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Input type="time" className="w-32" />
                <span className="text-sm text-muted-foreground">Generation Time</span>
              </div>
              <div className="flex items-center gap-2">
                <Input type="email" placeholder="Email notifications" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <DialogTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogTrigger>
          <Button onClick={() => {
            // TODO: Handle report assignment
            console.log({
              clusterId: selectedCluster,
              reportType,
              reportId: selectedReport,
              customDetails: customReportDetails,
              schedule,
            })
          }}>
            <FileText className="mr-2 h-4 w-4" />
            Assign Report
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
