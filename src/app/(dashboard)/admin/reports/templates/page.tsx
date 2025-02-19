import { Metadata } from "next"
import { ReportsHeader } from "@/components/reports/ReportsHeader"
import { ReportTemplates } from "@/components/reports/ReportTemplates"

export const metadata: Metadata = {
  title: "Report Templates | Carmen Platform",
  description: "Manage report templates and configurations",
}

export default function ReportTemplatesPage() {
  return (
    <div className="space-y-8">
      <ReportsHeader />
      <ReportTemplates />
    </div>
  )
} 