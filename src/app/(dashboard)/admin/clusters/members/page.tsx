"use client"

import { ClusterUsers } from "@/components/clusters/ClusterUsers"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ClusterMembersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/clusters">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Cluster Members</h2>
          <p className="text-muted-foreground">
            Manage users and roles across clusters
          </p>
        </div>
      </div>

      <ClusterUsers />
    </div>
  )
}
