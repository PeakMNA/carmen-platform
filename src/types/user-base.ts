// Platform-level roles
export type PlatformRole = 'platform_admin' | 'cluster_admin' | 'support'

// Business unit roles
export type BusinessUnitRole = 'hotel_admin' | 'department_head' | 'staff'

// Department types
export type Department = 
  | 'front_office'
  | 'housekeeping'
  | 'food_beverage'
  | 'maintenance'
  | 'finance'
  | 'hr'

// Module types
export type ModuleType = 
  | 'inventory'
  | 'scheduling'
  | 'maintenance'
  | 'reports'
  | 'finance'
  | 'procurement'

// Access levels
export type AccessLevel = 'read' | 'write' | 'admin'

// Module access configuration
export interface ModuleAccess {
  moduleId: ModuleType
  accessLevel: AccessLevel
}

// Business unit assignment
export interface BusinessUnitAssignment {
  id: string
  businessUnitId: string
  businessUnitName: string
  role: BusinessUnitRole
  department?: Department
  modules: ModuleAccess[]
  assignedAt: string
  updatedAt: string
}

// Base user interface
export interface BaseUser {
  id: string
  name: string
  email: string
  status: 'active' | 'inactive'
  platformRole?: PlatformRole
  businessUnitAssignments: BusinessUnitAssignment[]
  lastActive: string
  createdAt: string
  updatedAt: string
}

// Role validation helpers
export const isPlatformRole = (role: string): role is PlatformRole => {
  return ['platform_admin', 'cluster_admin', 'support'].includes(role)
}

export const isBusinessUnitRole = (role: string): role is BusinessUnitRole => {
  return ['hotel_admin', 'department_head', 'staff'].includes(role)
}

export const isDepartment = (value: string): value is Department => {
  return ['front_office', 'housekeeping', 'food_beverage', 'maintenance', 'finance', 'hr'].includes(value)
}

export const isModuleType = (value: string): value is ModuleType => {
  return ['inventory', 'scheduling', 'maintenance', 'reports', 'finance', 'procurement'].includes(value)
}

// Role configuration
export const ROLE_CONFIG = {
  platform_admin: {
    canManageUsers: true,
    canManageClusters: true,
    canManageBusinessUnits: true,
    canManageSubscriptions: true,
    inheritsPlatformAdmin: true
  },
  cluster_admin: {
    canManageUsers: true,
    canManageClusters: false,
    canManageBusinessUnits: true,
    canManageSubscriptions: false,
    inheritsHotelAdmin: true
  },
  support: {
    canManageUsers: false,
    canManageClusters: false,
    canManageBusinessUnits: false,
    canManageSubscriptions: false,
    hasGlobalRead: true
  },
  hotel_admin: {
    canManageDepartments: true,
    canAssignRoles: true,
    canManageModules: true,
    inheritsDepartmentHead: true
  },
  department_head: {
    canManageStaff: true,
    canAssignTasks: true,
    canViewReports: true,
    inheritsStaff: true
  },
  staff: {
    canAccessAssignedModules: true,
    canViewOwnReports: true
  }
} as const

// Module configuration
export const MODULE_CONFIG = {
  inventory: {
    requiresDepartment: true,
    availableToRoles: ['hotel_admin', 'department_head', 'staff']
  },
  scheduling: {
    requiresDepartment: true,
    availableToRoles: ['hotel_admin', 'department_head']
  },
  maintenance: {
    requiresDepartment: true,
    availableToRoles: ['hotel_admin', 'department_head', 'staff']
  },
  reports: {
    requiresDepartment: false,
    availableToRoles: ['hotel_admin', 'department_head']
  },
  finance: {
    requiresDepartment: true,
    availableToRoles: ['hotel_admin', 'department_head']
  },
  procurement: {
    requiresDepartment: true,
    availableToRoles: ['hotel_admin', 'department_head']
  }
} as const
