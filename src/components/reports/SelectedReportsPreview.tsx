"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { ReportTemplate } from "@/types/reports"

interface SelectedReportsPreviewProps {
  reports: ReportTemplate[]
  onRemove: (id: string) => void
}

export function SelectedReportsPreview({ 
  reports, 
  onRemove
}: SelectedReportsPreviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Selected Reports ({reports.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="flex items-start justify-between p-2 rounded-lg border"
            >
              <div className="space-y-1">
                <div className="font-medium">{report.name}</div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{report.category}</Badge>
                  <Badge variant="secondary">{report.department}</Badge>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemove(report.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {reports.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              No reports selected
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 