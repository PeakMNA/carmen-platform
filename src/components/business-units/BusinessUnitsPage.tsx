"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { BusinessUnitsTable } from "@/components/business-units/BusinessUnitsTable"

export function BusinessUnitsPage() {
  const { clusterId } = useParams()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Business Units</h2>
          <p className="text-muted-foreground">
            Manage organizational structure and teams
          </p>
        </div>
        <Link href={`/admin/clusters/${clusterId}/business-units/add`}>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Business Unit
          </Button>
        </Link>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">12</h3>
            <span className="text-sm text-muted-foreground">Total Units</span>
          </div>
          <p className="text-xs text-muted-foreground">Active business units</p>
          <p className="text-xs text-green-600">+2 this quarter</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">48</h3>
            <span className="text-sm text-muted-foreground">Total Teams</span>
          </div>
          <p className="text-xs text-muted-foreground">Across all units</p>
          <p className="text-xs text-green-600">+5 this month</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">24</h3>
            <span className="text-sm text-muted-foreground">Tenants</span>
          </div>
          <p className="text-xs text-muted-foreground">Associated tenants</p>
          <p className="text-xs text-green-600">+3 this month</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">82%</h3>
            <span className="text-sm text-muted-foreground">Resource Usage</span>
          </div>
          <p className="text-xs text-muted-foreground">Average utilization</p>
          <p className="text-xs text-green-600">+5% from last month</p>
        </div>
      </div>

      <BusinessUnitsTable />
    </div>
  )
} 