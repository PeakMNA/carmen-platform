"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, X } from "lucide-react"

interface Report {
  id: string
  name: string
  category: string
  description: string
}

interface Cluster {
  id: string
  name: string
  region: string
  hotelCount: number
}

const reports: Report[] = [
  {
    id: "r1",
    name: "Inventory Stock Level Report",
    category: "Inventory",
    description: "Track current inventory levels and stock movement"
  },
  {
    id: "r2",
    name: "Supplier Performance Analysis",
    category: "Procurement",
    description: "Analyze supplier delivery times and quality metrics"
  },
  {
    id: "r3",
    name: "Warehouse Operations Report",
    category: "Supply Chain",
    description: "Monitor warehouse efficiency and operations"
  },
  {
    id: "r4",
    name: "Supply Chain Cost Analysis",
    category: "Finance",
    description: "Analyze supply chain related costs and expenses"
  },
  {
    id: "r5",
    name: "Demand Forecasting Template",
    category: "Planning",
    description: "Template for demand forecasting and planning"
  }
]

const clusters: Cluster[] = [
  {
    id: "c-1",
    name: "Luxury Hotels Group",
    region: "Asia Pacific",
    hotelCount: 12
  },
  {
    id: "c-2",
    name: "Premium Resorts Collection",
    region: "Southeast Asia",
    hotelCount: 8
  },
  {
    id: "c-3",
    name: "Business Hotels Network",
    region: "East Asia",
    hotelCount: 15
  }
]

export function BulkReportAssignment() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedReports, setSelectedReports] = useState<string[]>([])
  const [selectedCluster, setSelectedCluster] = useState("")

  const filteredReports = reports.filter(report =>
    report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Assign Multiple Reports
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Assign Multiple Reports</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Available Reports</h3>
            <div className="relative mb-4">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="space-y-4">
              {filteredReports.map(report => (
                <div
                  key={report.id}
                  className="flex items-start space-x-3 rounded-lg border p-3"
                >
                  <Checkbox
                    id={report.id}
                    checked={selectedReports.includes(report.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedReports(prev => [...prev, report.id])
                      } else {
                        setSelectedReports(prev => prev.filter(id => id !== report.id))
                      }
                    }}
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor={report.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {report.name}
                        <Badge variant="outline">{report.category}</Badge>
                      </div>
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {report.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Assignment Configuration</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Hotel Group</Label>
                <Select value={selectedCluster} onValueChange={setSelectedCluster}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select hotel group..." />
                  </SelectTrigger>
                  <SelectContent>
                    {clusters.map(cluster => (
                      <SelectItem key={cluster.id} value={cluster.id}>
                        {cluster.name} ({cluster.region} • {cluster.hotelCount} hotels)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-lg border p-4">
                <h4 className="font-medium mb-2">Selected Reports ({selectedReports.length})</h4>
                <div className="space-y-2">
                  {selectedReports.map(reportId => {
                    const report = reports.find(r => r.id === reportId)
                    if (!report) return null
                    return (
                      <div key={report.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span>{report.name}</span>
                          <Badge variant="outline">{report.category}</Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedReports(prev => prev.filter(id => id !== report.id))}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )
                  })}
                  {selectedReports.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      No reports selected
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <Button
                className="w-full"
                disabled={selectedReports.length === 0 || !selectedCluster}
                onClick={() => {
                  // TODO: Implement report assignment
                  console.log({
                    clusterId: selectedCluster,
                    reportIds: selectedReports
                  })
                }}
              >
                Assign Reports
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                Selected reports will be assigned to all hotels in the group
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
