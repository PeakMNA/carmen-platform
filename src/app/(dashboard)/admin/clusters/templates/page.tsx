"use client"

import { ClusterTemplates } from "@/components/clusters/ClusterTemplates"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ClusterTemplatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/clusters">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Report Templates</h2>
          <p className="text-muted-foreground">
            Manage and assign report templates across clusters
          </p>
        </div>
      </div>

      <ClusterTemplates />
    </div>
  )
}
