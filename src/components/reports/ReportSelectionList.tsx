"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { ReportTemplate } from "@/types/reports"
import { reportService } from "@/services/reportService"

interface ReportSelectionListProps {
  onSelect: (reports: ReportTemplate[]) => void
  selectedReports: ReportTemplate[]
}

export function ReportSelectionList({ onSelect, selectedReports }: ReportSelectionListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [templates, setTemplates] = useState<ReportTemplate[]>([])

  useEffect(() => {
    reportService.getTemplates().then(setTemplates)
  }, [])

  const filteredTemplates = templates.filter(template => 
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Reports</CardTitle>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reports..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="flex items-start gap-2 p-2 rounded-lg border"
            >
              <Checkbox
                checked={selectedReports.some(r => r.id === template.id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onSelect([...selectedReports, template])
                  } else {
                    onSelect(selectedReports.filter(r => r.id !== template.id))
                  }
                }}
              />
              <div className="space-y-1">
                <div className="font-medium">{template.name}</div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{template.category}</Badge>
                  <Badge variant="secondary">{template.department}</Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 