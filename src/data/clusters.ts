import { BusinessUnitCluster } from '@/types/tenant'

export const mockClusters: BusinessUnitCluster[] = [
  {
    id: "C-1",
    name: "US-East Cluster",
    businessUnits: ["BU-1234"],
    region: "US-East",
    status: "active"
  },
  {
    id: "C-2",
    name: "US-Central Cluster",
    businessUnits: ["BU-1235"],
    region: "US-Central",
    status: "active"
  },
  {
    id: "C-3",
    name: "APAC Cluster",
    businessUnits: ["BU-1236"],
    region: "APAC",
    status: "active"
  }
]
