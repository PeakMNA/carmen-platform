"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useSearchParams } from "next/navigation"

export function ReportsHeader() {
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab") || "list"

  const getTitle = () => {
    switch (tab) {
      case "templates":
        return "Report Templates"
      case "requests":
        return "Report Requests"
      default:
        return "Generated Reports"
    }
  }

  const getDescription = () => {
    switch (tab) {
      case "templates":
        return "Manage and customize report templates"
      case "requests":
        return "Handle report requests and approvals"
      default:
        return "View and manage generated reports"
    }
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{getTitle()}</h1>
        <p className="text-sm text-muted-foreground">
          {getDescription()}
        </p>
      </div>
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        {tab === "templates" ? "New Template" : "New Report"}
      </Button>
    </div>
  )
} 