export interface User {
  id: string
  name: string
  email: string
  status: 'active' | 'inactive'
  lastActive: string
  platformRole?: 'admin' | 'support' | 'finance'
}

export interface BusinessUnitUserRole {
  userId: string
  businessUnitId: string
  roles: string[]  // Multiple roles from supply chain system
  lastUpdated: string
  updatedBy: string  // Supply chain system identifier
}

export interface RoleChangeAudit {
  id: string
  userId: string
  businessUnitId: string
  systemId: string
  timestamp: string
  action: 'add' | 'remove' | 'sync'
  previousRoles: string[]
  newRoles: string[]
}

export interface RoleUpdateRequest {
  roles: string[]
  systemId: string
}

export interface RoleUpdateResponse {
  userId: string
  businessUnitId: string
  roles: string[]
  lastUpdated: string
}

export interface ErrorResponse {
  error: string
  code: string
  details?: {
    invalidRoles?: string[]
    missingPermissions?: string[]
    validationErrors?: Record<string, string>
  }
}

// API Request/Response Types
export type AddRolesRequest = RoleUpdateRequest
export type RemoveRolesRequest = RoleUpdateRequest
export type SyncRolesRequest = RoleUpdateRequest

export interface GetUserRolesResponse {
  roles: string[]
  lastUpdated: string
}

// Service Types
export interface UserService {
  // Role Management
  addRoles(businessUnitId: string, userId: string, request: AddRolesRequest): Promise<RoleUpdateResponse>
  removeRoles(businessUnitId: string, userId: string, request: RemoveRolesRequest): Promise<RoleUpdateResponse>
  syncRoles(businessUnitId: string, userId: string, request: SyncRolesRequest): Promise<RoleUpdateResponse>
  getUserRoles(businessUnitId: string, userId: string): Promise<GetUserRolesResponse>

  // User Management
  getUsers(): Promise<User[]>
  getUser(id: string): Promise<User | null>
  getUsersByBusinessUnit(businessUnitId: string): Promise<User[]>
  getUserRolesByBusinessUnit(businessUnitId: string): Promise<BusinessUnitUserRole[]>
  getAuditLog(businessUnitId: string, userId?: string): Promise<RoleChangeAudit[]>
  getUsersByRole(businessUnitId: string, role: string): Promise<User[]>
}
