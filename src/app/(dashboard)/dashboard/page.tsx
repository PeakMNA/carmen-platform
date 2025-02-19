import { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { DashboardStats } from "@/components/dashboard/DashboardStats"
import { RecentActivity } from "@/components/dashboard/RecentActivity"
import { QuickActions } from "@/components/dashboard/QuickActions"

export const metadata: Metadata = {
  title: "Dashboard | Carmen Platform",
  description: "Overview of your Carmen Platform",
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <DashboardHeader />
      <DashboardStats />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
        <RecentActivity className="md:col-span-1 lg:col-span-4" />
        <QuickActions className="md:col-span-1 lg:col-span-3" />
      </div>
    </div>
  )
} 