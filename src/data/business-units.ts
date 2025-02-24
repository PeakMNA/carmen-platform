import { BusinessUnit } from '@/types/tenant'

export const mockBusinessUnits: BusinessUnit[] = [
  {
    id: "BU-1234",
    name: "Grand Hotel Downtown",
    brand: "Luxury Collection",
    clusterId: "C-1",
    head: "Sarah Johnson",
    location: {
      city: "New York",
      country: "USA"
    },
    details: {
      rooms: 280,
      teams: 8,
      members: 350
    },
    configuration: {
      database: {
        host: "db-nyc-1.hotel.internal",
        name: "grand_hotel_db",
        type: "postgres"
      },
      cluster: {
        id: "C-1",
        name: "US-East Cluster"
      }
    },
    contact: {
      email: "operations.grand@luxurycollection.com",
      phone: "+1-212-555-0123",
      address: "123 Broadway, New York, NY 10013"
    },
    settings: {
      notifications: {
        email: true,
        slack: true,
        webhook: false
      },
      integrations: {
        enabled: ["supply-chain", "inventory", "procurement"],
        configurations: {}
      }
    },
    reports: [],
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-03-15T10:30:00Z"
  },
  {
    id: "BU-1235",
    name: "Business Tower Hotel",
    brand: "Business Hotels",
    clusterId: "C-2",
    head: "Michael Chen",
    location: {
      city: "Chicago",
      country: "USA"
    },
    details: {
      rooms: 180,
      teams: 6,
      members: 220
    },
    configuration: {
      database: {
        host: "db-chi-1.hotel.internal",
        name: "business_tower_db",
        type: "mysql"
      },
      cluster: {
        id: "C-2",
        name: "US-Central Cluster"
      }
    },
    contact: {
      email: "operations.tower@businesshotels.com",
      phone: "+1-312-555-0123",
      address: "456 Michigan Ave, Chicago, IL 60601"
    },
    settings: {
      notifications: {
        email: true,
        slack: false,
        webhook: true
      },
      integrations: {
        enabled: ["supply-chain", "maintenance"],
        configurations: {}
      }
    },
    reports: [],
    status: "active",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-03-14T15:45:00Z"
  },
  {
    id: "BU-1236",
    name: "Beachfront Resort & Spa",
    brand: "Resort Collection",
    clusterId: "C-3",
    head: "Maria Garcia",
    location: {
      city: "Bali",
      country: "Indonesia"
    },
    details: {
      rooms: 320,
      teams: 10,
      members: 400
    },
    configuration: {
      database: {
        host: "db-bali-1.hotel.internal",
        name: "beachfront_resort_db",
        type: "postgres"
      },
      cluster: {
        id: "C-3",
        name: "APAC Cluster"
      }
    },
    contact: {
      email: "operations.beachfront@resortcollection.com",
      phone: "+62-361-555-0123",
      address: "789 Beach Road, Kuta, Bali 80361"
    },
    settings: {
      notifications: {
        email: true,
        slack: true,
        webhook: true
      },
      integrations: {
        enabled: ["supply-chain", "spa-booking", "restaurant"],
        configurations: {}
      }
    },
    reports: [],
    status: "active",
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-03-15T08:15:00Z"
  }
]

export const getBusinessUnitStats = (businessUnits: BusinessUnit[]) => {
  const totalUnits = businessUnits.length
  const totalTeams = businessUnits.reduce((sum, bu) => sum + bu.details.teams, 0)
  const totalMembers = businessUnits.reduce((sum, bu) => sum + bu.details.members, 0)
  const totalRooms = businessUnits.reduce((sum, bu) => sum + bu.details.rooms, 0)
  const activeUnits = businessUnits.filter(bu => bu.status === 'active').length

  return {
    totalUnits,
    totalTeams,
    totalMembers,
    totalRooms,
    activeUnits,
    utilizationRate: Math.round((activeUnits / totalUnits) * 100)
  }
}
