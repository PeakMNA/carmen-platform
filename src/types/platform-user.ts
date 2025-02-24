import { BaseUser, PlatformRole, BusinessUnitAssignment, ROLE_CONFIG, ModuleAccess } from './user-base'

// Form data interface for creating/updating platform users
export interface PlatformUserFormData {
  id?: string
  name: string
  email: string
  platformRole: PlatformRole
  status: 'active' | 'inactive'
  businessUnitAssignments?: {
    id?: string
    businessUnitId: string
    role: string
    department?: string
    modules: ModuleAccess[]
  }[]
}

// Platform roles for selection
export const platformRoles = [
  { value: 'platform_admin', label: 'Platform Administrator' },
  { value: 'cluster_admin', label: 'Cluster Administrator' },
  { value: 'support', label: 'Support Staff' }
] as const

export interface PlatformUserStats {
  totalAssignments: number
  activeBusinessUnits: number
  lastLoginAt: string
  totalModulesAccessed: number
}

export interface PlatformUserAudit {
  id: string
  action: 'role_change' | 'assignment_add' | 'assignment_remove' | 'module_change'
  timestamp: string
  details: string
  performedBy: string
}

export interface PlatformUser extends BaseUser {
  platformRole: PlatformRole  // Required for platform users
  stats: PlatformUserStats
  auditLog: PlatformUserAudit[]
}

// Platform-specific role helpers
export const getPlatformPermissions = (role: PlatformRole) => {
  return ROLE_CONFIG[role]
}

export const canManageUsers = (role: PlatformRole) => {
  return ROLE_CONFIG[role].canManageUsers
}

export const canManageClusters = (role: PlatformRole) => {
  return ROLE_CONFIG[role].canManageClusters
}

export const canManageBusinessUnits = (role: PlatformRole) => {
  return ROLE_CONFIG[role].canManageBusinessUnits
}

export const canManageSubscriptions = (role: PlatformRole) => {
  return ROLE_CONFIG[role].canManageSubscriptions
}

// Assignment helpers
export const getActiveBusinessUnits = (assignments: BusinessUnitAssignment[]) => {
  return assignments.filter(a => a.role === 'hotel_admin').map(a => a.businessUnitId)
}

export const hasBusinessUnitAccess = (
  assignments: BusinessUnitAssignment[],
  businessUnitId: string
) => {
  return assignments.some(a => a.businessUnitId === businessUnitId)
}

export const getBusinessUnitRole = (
  assignments: BusinessUnitAssignment[],
  businessUnitId: string
) => {
  return assignments.find(a => a.businessUnitId === businessUnitId)?.role
}

// Platform role labels for display
export const PLATFORM_ROLE_LABELS: Record<PlatformRole, string> = {
  platform_admin: "Platform Administrator",
  cluster_admin: "Cluster Administrator",
  support: "Support Staff"
}

// Platform role descriptions
export const PLATFORM_ROLE_DESCRIPTIONS: Record<PlatformRole, string> = {
  platform_admin: "Full system access with ability to manage all aspects of the platform",
  cluster_admin: "Manage specific clusters and their business units, can also be assigned as Hotel Admin",
  support: "Platform-wide read access for providing support and assistance"
}

// Platform role capabilities
export const PLATFORM_ROLE_CAPABILITIES: Record<PlatformRole, string[]> = {
  platform_admin: [
    "Manage all platform users",
    "Configure platform settings",
    "Manage clusters and business units",
    "Control subscription plans",
    "Access all system features",
    "View system analytics"
  ],
  cluster_admin: [
    "Manage cluster users",
    "Configure cluster settings",
    "Manage business units",
    "View cluster analytics",
    "Can be assigned as Hotel Admin"
  ],
  support: [
    "View user information",
    "Access support tools",
    "View system status",
    "Generate support reports"
  ]
}
