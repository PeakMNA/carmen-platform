"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FolderTree } from "lucide-react"

export function ClusterOverviewCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Cluster Overview</CardTitle>
        <FolderTree className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* APAC Cluster */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-1">
              <div className="font-medium">APAC Cluster</div>
              <div className="text-sm text-muted-foreground">12 Business Units</div>
            </div>
            <Badge>Active</Badge>
          </div>

          {/* EMEA Cluster */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-1">
              <div className="font-medium">EMEA Cluster</div>
              <div className="text-sm text-muted-foreground">8 Business Units</div>
            </div>
            <Badge>Active</Badge>
          </div>

          {/* Americas Cluster */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-1">
              <div className="font-medium">Americas Cluster</div>
              <div className="text-sm text-muted-foreground">4 Business Units</div>
            </div>
            <Badge>Active</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 