"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useClusterStore } from "@/stores/cluster-store"
import type { Cluster } from "@/types/cluster"

interface ClusterSelectorProps {
  selectedCluster: string
  onClusterChange: (clusterId: string) => void
}

export function ClusterSelector({ selectedCluster, onClusterChange }: ClusterSelectorProps) {
  const { clusters } = useClusterStore()
  
  return (
    <Select value={selectedCluster} onValueChange={onClusterChange}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select hotel group" />
      </SelectTrigger>
      <SelectContent>
        {clusters.map((cluster: Cluster) => (
          <SelectItem key={cluster.id} value={cluster.id}>
            {cluster.name} ({cluster.businessUnits.length} hotels)
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
