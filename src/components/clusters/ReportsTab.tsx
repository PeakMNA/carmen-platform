"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const reports = [
  {
    id: "r-1",
    name: "Inventory Stock Level Report",
    type: "standard",
    businessUnit: "Grand Hotel Downtown",
    status: "active",
    lastGenerated: "2024-03-15",
  },
  // Add more reports...
]

export function ReportsTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Reports</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search reports..."
              className="w-[200px]"
            />
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Assign Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {reports.map((report) => (
          <Card key={report.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{report.name}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {report.businessUnit}
                </div>
              </div>
              <Badge variant="outline" className="capitalize">
                {report.type}
              </Badge>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="text-muted-foreground">
                Last generated: {report.lastGenerated}
              </div>
              <Badge>{report.status}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 