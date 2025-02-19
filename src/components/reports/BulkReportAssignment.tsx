"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ReportSelectionList } from "./ReportSelectionList"
import { AssignmentConfig } from "./AssignmentConfig"
import { SelectedReportsPreview } from "./SelectedReportsPreview"
import { ReportTemplate } from "@/types/reports"
import { toast } from "@/components/ui/use-toast"

interface SelectedReport extends ReportTemplate {
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly'
    time: string
    startDate: string
  }
  distribution?: {
    format: 'PDF' | 'Excel' | 'CSV'
    recipients: string[]
  }
}

export function BulkReportAssignment() {
  const [selectedReports, setSelectedReports] = useState<SelectedReport[]>([])
  const [selectedBU, setSelectedBU] = useState<string>("")
  const [open, setOpen] = useState(false)
  
  const handleSubmit = async () => {
    if (!selectedBU) {
      toast({
        title: "Error",
        description: "Please select a business unit",
        variant: "destructive",
      })
      return
    }

    if (selectedReports.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one report",
        variant: "destructive",
      })
      return
    }

    try {
      // TODO: Implement actual submission
      toast({
        title: "Success",
        description: `Assigned ${selectedReports.length} reports to the selected business unit`,
      })
      setOpen(false)
      setSelectedReports([])
      setSelectedBU("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to assign reports",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Assign Multiple Reports
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Assign Multiple Reports</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-12 gap-4">
          {/* Report Selection - 5 columns */}
          <div className="col-span-5">
            <ReportSelectionList 
              onSelect={(reports) => setSelectedReports(reports)}
              selectedReports={selectedReports}
            />
          </div>

          {/* Configuration - 7 columns */}
          <div className="col-span-7 space-y-4">
            {/* Business Unit Selection */}
            <AssignmentConfig
              selectedBU={selectedBU}
              onBUSelect={setSelectedBU}
            />

            {/* Selected Reports Preview */}
            <SelectedReportsPreview
              reports={selectedReports}
              onRemove={(id) => {
                setSelectedReports(prev => 
                  prev.filter(report => report.id !== id)
                )
              }}
              onConfigChange={(id, config) => {
                setSelectedReports(prev =>
                  prev.map(report =>
                    report.id === id
                      ? { ...report, ...config }
                      : report
                  )
                )
              }}
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Assign Reports
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 