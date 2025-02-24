import { BusinessUnit, BusinessUnitCluster } from '@/types/tenant'
import { mockBusinessUnits } from '@/data/business-units'
import { mockClusters } from '@/data/clusters'

interface BusinessUnitFormData {
  name: string
  brand: string
  head: string
  location: {
    city: string
    country: string
  }
  details: {
    rooms: number
    teams: number
    members: number
  }
  contact: {
    email: string
    phone: string
    address: string
  }
  configuration: {
    database: {
      host: string
      name: string
      type: 'mysql' | 'postgres'
    }
  }
  settings: {
    notifications: {
      email: boolean
      slack: boolean
      webhook: boolean
    }
    integrations: string[]
  }
}

class BusinessUnitService {
  private businessUnits: BusinessUnit[] = [...mockBusinessUnits]
  private clusters: BusinessUnitCluster[] = [...mockClusters]

  async createBusinessUnit(clusterId: string, data: BusinessUnitFormData): Promise<BusinessUnit> {
    const cluster = await this.getCluster(clusterId)
    if (!cluster) {
      throw new Error('Cluster not found')
    }

    const businessUnit: BusinessUnit = {
      id: `BU-${Date.now()}`,
      name: data.name,
      brand: data.brand,
      clusterId,
      head: data.head,
      location: data.location,
      details: data.details,
      contact: data.contact,
      configuration: {
        database: data.configuration.database,
        cluster: {
          id: clusterId,
          name: cluster.name
        }
      },
      settings: {
        notifications: data.settings.notifications,
        integrations: {
          enabled: data.settings.integrations,
          configurations: {}
        }
      },
      reports: [],
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    this.businessUnits.push(businessUnit)
    cluster.businessUnits.push(businessUnit.id)

    return businessUnit
  }

  async getBusinessUnit(id: string): Promise<BusinessUnit | null> {
    return this.businessUnits.find(bu => bu.id === id) || null
  }

  async updateBusinessUnit(
    id: string,
    data: Partial<Omit<BusinessUnit, 'id' | 'clusterId' | 'configuration' | 'reports' | 'createdAt' | 'updatedAt'>>
  ): Promise<BusinessUnit> {
    const index = this.businessUnits.findIndex(bu => bu.id === id)
    if (index === -1) {
      throw new Error('Business unit not found')
    }

    const businessUnit = this.businessUnits[index]
    const updated: BusinessUnit = {
      ...businessUnit,
      ...(data.name && { name: data.name }),
      ...(data.brand && { brand: data.brand }),
      ...(data.head && { head: data.head }),
      ...(data.location && { location: data.location }),
      ...(data.details && { details: data.details }),
      ...(data.contact && { contact: data.contact }),
      ...(data.settings && { 
        settings: {
          ...businessUnit.settings,
          ...data.settings
        }
      }),
      updatedAt: new Date().toISOString()
    }

    this.businessUnits[index] = updated
    return updated
  }

  async getCluster(id: string): Promise<BusinessUnitCluster | null> {
    return this.clusters.find(c => c.id === id) || null
  }

  async getBusinessUnitsInCluster(clusterId: string): Promise<BusinessUnit[]> {
    return this.businessUnits.filter(bu => bu.clusterId === clusterId)
  }

  async updateBusinessUnitConfiguration(
    id: string,
    config: Partial<BusinessUnit['configuration']>
  ): Promise<BusinessUnit> {
    const businessUnit = await this.getBusinessUnit(id)
    if (!businessUnit) {
      throw new Error('Business unit not found')
    }

    const updated: BusinessUnit = {
      ...businessUnit,
      configuration: {
        ...businessUnit.configuration,
        ...config
      },
      updatedAt: new Date().toISOString()
    }

    const index = this.businessUnits.findIndex(bu => bu.id === id)
    this.businessUnits[index] = updated

    return updated
  }

  async updateBusinessUnitStatus(id: string, status: BusinessUnit['status']): Promise<BusinessUnit> {
    const businessUnit = await this.getBusinessUnit(id)
    if (!businessUnit) {
      throw new Error('Business unit not found')
    }

    const updated: BusinessUnit = {
      ...businessUnit,
      status,
      updatedAt: new Date().toISOString()
    }

    const index = this.businessUnits.findIndex(bu => bu.id === id)
    this.businessUnits[index] = updated

    return updated
  }
}

export const businessUnitService = new BusinessUnitService()
