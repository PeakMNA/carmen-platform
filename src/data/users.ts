import { User, BusinessUnitUserRole } from '@/types/user'

export const mockUsers: User[] = [
  {
    id: "U-1234",
    name: "Sarah Johnson",
    email: "sarah.johnson@luxurycollection.com",
    status: "active",
    lastActive: "2024-03-15T08:30:00Z",
    platformRole: "admin"
  },
  {
    id: "U-1235",
    name: "Michael Chen",
    email: "michael.chen@businesshotels.com",
    status: "active",
    lastActive: "2024-03-15T09:15:00Z",
    platformRole: "admin"
  },
  {
    id: "U-1236",
    name: "Maria Garcia",
    email: "maria.garcia@resortcollection.com",
    status: "active",
    lastActive: "2024-03-15T07:45:00Z",
    platformRole: "admin"
  },
  {
    id: "U-1237",
    name: "John Smith",
    email: "john.smith@luxurycollection.com",
    status: "active",
    lastActive: "2024-03-15T08:00:00Z"
  },
  {
    id: "U-1238",
    name: "Emily Brown",
    email: "emily.brown@businesshotels.com",
    status: "active",
    lastActive: "2024-03-15T09:30:00Z"
  },
  {
    id: "U-1239",
    name: "David Wilson",
    email: "david.wilson@resortcollection.com",
    status: "active",
    lastActive: "2024-03-15T10:00:00Z"
  }
]

export const mockUserRoles: BusinessUnitUserRole[] = [
  {
    userId: "U-1234",
    businessUnitId: "BU-1234",
    roles: ["manager", "finance", "inventory"],
    lastUpdated: "2024-03-01T00:00:00Z",
    updatedBy: "supply-chain-system"
  },
  {
    userId: "U-1235",
    businessUnitId: "BU-1235",
    roles: ["manager", "procurement"],
    lastUpdated: "2024-03-01T00:00:00Z",
    updatedBy: "supply-chain-system"
  },
  {
    userId: "U-1236",
    businessUnitId: "BU-1236",
    roles: ["manager", "inventory", "spa-manager"],
    lastUpdated: "2024-03-01T00:00:00Z",
    updatedBy: "supply-chain-system"
  },
  {
    userId: "U-1237",
    businessUnitId: "BU-1234",
    roles: ["inventory", "reports"],
    lastUpdated: "2024-03-01T00:00:00Z",
    updatedBy: "supply-chain-system"
  },
  {
    userId: "U-1238",
    businessUnitId: "BU-1235",
    roles: ["procurement", "reports"],
    lastUpdated: "2024-03-01T00:00:00Z",
    updatedBy: "supply-chain-system"
  },
  {
    userId: "U-1239",
    businessUnitId: "BU-1236",
    roles: ["inventory", "restaurant-manager"],
    lastUpdated: "2024-03-01T00:00:00Z",
    updatedBy: "supply-chain-system"
  }
]
