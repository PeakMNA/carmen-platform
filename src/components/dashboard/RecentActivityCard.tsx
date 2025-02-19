"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity } from "lucide-react"

export function RecentActivityCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
        <Activity className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Activity Items */}
          <div className="flex items-center gap-4 rounded-lg border p-4">
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">Report Template Updated</span>
                <Badge variant="outline">APAC Cluster</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Inventory Stock Level Report v2.1
              </div>
            </div>
            <div className="text-sm text-muted-foreground">2m ago</div>
          </div>

          <div className="flex items-center gap-4 rounded-lg border p-4">
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">New Business Unit Added</span>
                <Badge variant="outline">EMEA Cluster</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Paris Downtown Hotel
              </div>
            </div>
            <div className="text-sm text-muted-foreground">1h ago</div>
          </div>

          <div className="flex items-center gap-4 rounded-lg border p-4">
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">Bulk Report Assignment</span>
                <Badge variant="outline">Americas Cluster</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                5 reports assigned to 3 business units
              </div>
            </div>
            <div className="text-sm text-muted-foreground">3h ago</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 