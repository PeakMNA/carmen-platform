"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { BusinessUnitsTable } from "@/components/business-units/BusinessUnitsTable"
import { mockBusinessUnits, getBusinessUnitStats } from "@/data/business-units"
import { useState, useEffect } from "react"
import { BusinessUnit } from "@/types/tenant"

export function BusinessUnitsPage() {
  const { clusterId } = useParams()
  const router = useRouter()
  const [businessUnits, setBusinessUnits] = useState<BusinessUnit[]>([])
  const [stats, setStats] = useState({
    totalUnits: 0,
    totalTeams: 0,
    totalMembers: 0,
    totalRooms: 0,
    activeUnits: 0,
    utilizationRate: 0
  })

  useEffect(() => {
    if (!clusterId || clusterId === 'undefined') {
      router.push('/admin/clusters')
      return
    }

    // Filter business units by cluster
    const filteredUnits = mockBusinessUnits.filter(bu => bu.clusterId === clusterId)
    setBusinessUnits(filteredUnits)
    setStats(getBusinessUnitStats(filteredUnits))
  }, [clusterId, router])

  if (!clusterId || clusterId === 'undefined') {
    return <div>Redirecting to clusters...</div>
  }

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
            <h3 className="text-lg font-semibold">{stats.totalUnits}</h3>
            <span className="text-sm text-muted-foreground">Total Units</span>
          </div>
          <p className="text-xs text-muted-foreground">{stats.activeUnits} active units</p>
          <p className="text-xs text-green-600">+{stats.totalUnits - stats.activeUnits} this quarter</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{stats.totalTeams}</h3>
            <span className="text-sm text-muted-foreground">Total Teams</span>
          </div>
          <p className="text-xs text-muted-foreground">Across all units</p>
          <p className="text-xs text-green-600">+{Math.round(stats.totalTeams * 0.1)} this month</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{stats.totalMembers}</h3>
            <span className="text-sm text-muted-foreground">Total Members</span>
          </div>
          <p className="text-xs text-muted-foreground">Across all teams</p>
          <p className="text-xs text-green-600">+{Math.round(stats.totalMembers * 0.05)} this month</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{stats.utilizationRate}%</h3>
            <span className="text-sm text-muted-foreground">Resource Usage</span>
          </div>
          <p className="text-xs text-muted-foreground">Average utilization</p>
          <p className="text-xs text-green-600">+{Math.round(stats.utilizationRate * 0.05)}% from last month</p>
        </div>
      </div>

      <BusinessUnitsTable businessUnits={businessUnits} />
    </div>
  )
}
