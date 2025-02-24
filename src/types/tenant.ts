export interface BusinessUnit {
  id: string
  name: string
  brand: string
  clusterId: string
  head: string
  location: {
    city: string
    country: string
  }
  details: {
    rooms: number
    teams: number
    members: number
    maxUsers?: number
  }
  configuration: {
    database: {
      host: string
      name: string
      type: 'mysql' | 'postgres'
    }
    cluster: {
      id: string
      name: string
    }
  }
  contact: {
    email: string
    phone: string
    address: string
  }
  settings: {
    notifications: {
      email: boolean
      slack: boolean
      webhook: boolean
    }
    integrations: {
      enabled: string[]
      configurations: Record<string, unknown>
    }
  }
  reports: AssignedReport[]
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
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
  configuration?: {
    database?: {
      connection: string
      tables: string[]
    }
    filters?: Record<string, unknown>
    customFields?: string[]
  }
}

export interface BusinessUnitCluster {
  id: string
  name: string
  businessUnits: string[] // Business Unit IDs
  region: string
  status: 'active' | 'inactive'
}
