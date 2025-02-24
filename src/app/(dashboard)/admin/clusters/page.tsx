"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, FolderTree, Building2, Globe, Users } from "lucide-react"
import Link from "next/link"
import { mockClusters } from "@/data/clusters"
import { mockBusinessUnits } from "@/data/business-units"

export default function ClustersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Clusters</h2>
          <p className="text-muted-foreground">
            Manage cluster infrastructure and business units
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Cluster
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockClusters.map((cluster) => {
          const clusterBusinessUnits = mockBusinessUnits.filter(
            bu => bu.clusterId === cluster.id
          )
          const activeBusinessUnits = clusterBusinessUnits.filter(
            bu => bu.status === 'active'
          ).length
          const totalRooms = clusterBusinessUnits.reduce(
            (sum, bu) => sum + bu.details.rooms, 0
          )
          const totalMembers = clusterBusinessUnits.reduce(
            (sum, bu) => sum + bu.details.members, 0
          )

          return (
            <Card key={cluster.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      <FolderTree className="h-5 w-5 text-muted-foreground" />
                      {cluster.name}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{cluster.region}</span>
                      <Badge variant="outline">{cluster.status}</Badge>
                    </div>
                  </div>
                  <Link href={`/admin/clusters/${cluster.id}/business-units`}>
                    <Button variant="outline" size="sm">View Units</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Business Units</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Active Units</span>
                      <span>{activeBusinessUnits}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total Rooms</span>
                      <span>{totalRooms}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Members</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total Members</span>
                      <span>{totalMembers}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Avg per Unit</span>
                      <span>{Math.round(totalMembers / clusterBusinessUnits.length)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
