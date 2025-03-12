"use client"

import { DetailDialog } from "@/components/ui/detail-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Download, Calendar, User, RefreshCw, Filter } from "lucide-react"

interface ReportDetailsProps {
  report: {
    id: string
    name: string
    description: string
    date: string
    type: string
    format: string
    size: string
    status: string
    createdBy: string
  }
  isOpen: boolean
  onClose: () => void
}

export function ReportDetails({ report, isOpen, onClose }: ReportDetailsProps) {
  return (
    <DetailDialog
      title={report.name}
      description="Report Details and Configuration"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Tabs defaultValue="overview" className="mt-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Report Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Report ID:</span>
                  <span className="text-sm text-muted-foreground">{report.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Generated:</span>
                  <span className="text-sm text-muted-foreground">{report.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Created By:</span>
                  <span className="text-sm text-muted-foreground">{report.createdBy}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Status:</span>
                  <Badge variant="default">{report.status}</Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Report Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {report.description}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Type:</span>
                  <Badge variant="outline">{report.type}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Format:</span>
                  <span className="text-sm text-muted-foreground">{report.format}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Size:</span>
                  <span className="text-sm text-muted-foreground">{report.size}</span>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Regenerate
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="data" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">
                  Data Sources
                </CardTitle>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Configure Filters
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Data source configuration will go here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Schedule Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Schedule configuration will go here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Generation History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Report generation history will go here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DetailDialog>
  )
} 