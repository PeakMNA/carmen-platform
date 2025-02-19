"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, Download, MoreHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Report } from "@/types/reports"
import { reportService } from "@/services/reportService"
import { ReportAssignmentDialog } from "./ReportAssignmentDialog"

export function ReportsList() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadReports() {
      try {
        const data = await reportService.getReports()
        setReports(data)
      } catch (error) {
        console.error("Failed to load reports:", error)
      } finally {
        setLoading(false)
      }
    }

    loadReports()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Generated Reports</CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative w-[300px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search reports..." className="pl-8" />
          </div>
          <ReportAssignmentDialog />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{report.name}</span>
                  <Badge variant="outline">{report.type}</Badge>
                  <Badge>{report.status}</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {report.hotel} • {report.brand}
                </div>
                <div className="text-sm text-muted-foreground">
                  Generated on {report.generatedAt} • {report.format}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Share Report</DropdownMenuItem>
                    <DropdownMenuItem>Schedule Update</DropdownMenuItem>
                    <DropdownMenuItem>Configure Alerts</DropdownMenuItem>
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