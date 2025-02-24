import { create } from 'zustand'
import type { Cluster } from '@/types/cluster'

interface ClusterState {
  clusters: Cluster[]
  selectedClusterId: string | null
  isLoading: boolean
  error: string | null
}

interface ClusterActions {
  setSelectedCluster: (clusterId: string) => void
  fetchClusters: () => Promise<void>
}

type ClusterStore = ClusterState & ClusterActions

export const useClusterStore = create<ClusterStore>((set) => ({
  // Initial state
  clusters: [],
  selectedClusterId: null,
  isLoading: false,
  error: null,

  // Actions
  setSelectedCluster: (clusterId: string) => set({ selectedClusterId: clusterId }),
  fetchClusters: async () => {
    set({ isLoading: true, error: null })
    try {
      // Replace with your actual API call
      const response = await fetch('/api/clusters')
      const clusters = await response.json()
      set({ clusters, isLoading: false })
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  }
}))
