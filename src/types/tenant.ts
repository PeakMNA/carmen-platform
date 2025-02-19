export interface Tenant {
  id: string
  name: string
  region: string
  businessUnits: BusinessUnit[]
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

export interface BusinessUnit {
  id: string
  name: string
  brand: string
  tenantId: string
  reports: AssignedReport[]
  status: 'active' | 'inactive'
}

export interface AssignedReport {
  id: string
  templateId: string
  businessUnitId: string
  status: 'active' | 'inactive'
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly'
    time: string
    startDate: string
  }
  configuration?: Record<string, unknown>
} 