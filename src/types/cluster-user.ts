export interface ClusterUser {
  id: string
  name: string
  email: string
  clusterId: string
  clusterName: string
  role: string
  modules: string[]
  status: "active" | "inactive"
  lastActive: string
}

export interface ClusterUserFormData {
  id?: string
  name: string
  email: string
  clusterId: string
  role: string
  modules: string[]
  status: "active" | "inactive"
}

export const clusterRoles = [
  { value: "cluster_admin", label: "Cluster Admin" },
  { value: "regional_manager", label: "Regional Manager" },
  { value: "operations_director", label: "Operations Director" },
  { value: "finance_manager", label: "Finance Manager" }
] as const

export const moduleOptions = [
  { value: "finance", label: "Finance" },
  { value: "inventory", label: "Inventory" },
  { value: "procurement", label: "Procurement" },
  { value: "reports", label: "Reports" }
] as const
