"use client"

import { DashboardStats } from "@/components/dashboard/DashboardStats"
import { ReportsOverviewCard } from "@/components/dashboard/ReportsOverviewCard"
import { HotelsOverviewCard } from "@/components/dashboard/HotelsOverviewCard"
import { ClusterOverviewCard } from "@/components/dashboard/ClusterOverviewCard"
import { RecentActivityCard } from "@/components/dashboard/RecentActivityCard"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Platform overview and key metrics
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardStats />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          <ReportsOverviewCard />
          <HotelsOverviewCard />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <ClusterOverviewCard />
          <RecentActivityCard />
        </div>
      </div>
    </div>
  )
} 