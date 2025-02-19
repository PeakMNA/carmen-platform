"use client"

import { ReportTabs } from "@/components/reports/ReportTabs"

export default function ReportsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Reports</h2>
        <p className="text-muted-foreground">
          Manage report assignments and templates
        </p>
      </div>
      <ReportTabs />
    </div>
  )
} 