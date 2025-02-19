import { Metadata } from "next"
import { ReportsHeader } from "@/components/reports/ReportsHeader"
import { ReportRequestManagement } from "@/components/reports/ReportRequestManagement"

export const metadata: Metadata = {
  title: "Report Requests | Carmen Platform",
  description: "Manage report requests and approvals",
}

export default function ReportRequestsPage() {
  return (
    <div className="space-y-8">
      <ReportsHeader />
      <ReportRequestManagement />
    </div>
  )
} 