"use client"

import { useEffect } from 'react'
import { useClusterStore } from '@/stores/cluster-store'
import { ClusterSelector } from '@/components/clusters/ClusterSelector'

export default function DashboardPage() {
  const { fetchClusters, selectedClusterId, setSelectedCluster, isLoading, error } = useClusterStore()

  useEffect(() => {
    fetchClusters()
  }, [fetchClusters])

  if (isLoading) {
    return <div>Loading clusters...</div>
  }

  if (error) {
    return <div>Error loading clusters: {error}</div>
  }

  return (
    <div>
      <ClusterSelector 
        selectedCluster={selectedClusterId || ''} 
        onClusterChange={setSelectedCluster} 
      />
    </div>
  )
}
