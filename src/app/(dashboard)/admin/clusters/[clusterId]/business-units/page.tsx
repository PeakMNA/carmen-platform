"use client"

import { use } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"
import { BusinessUnitsTab } from "@/components/clusters/BusinessUnitsTab"

export default function BusinessUnitsPage({
  params,
}: {
  params: Promise<{ clusterId: string }>
}) {
  const { clusterId } = use(params)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/admin/clusters/${clusterId}`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Business Units</h2>
            <p className="text-muted-foreground">
              Manage hotels and properties in this cluster
            </p>
          </div>
        </div>
        <Link href={`/admin/clusters/${clusterId}/business-units/add`}>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Business Unit
          </Button>
        </Link>
      </div>

      <BusinessUnitsTab clusterId={clusterId} />
    </div>
  )
} 