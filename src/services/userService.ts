import { 
  User,
  UserService, 
  AddRolesRequest, 
  RemoveRolesRequest, 
  SyncRolesRequest,
  RoleUpdateResponse,
  GetUserRolesResponse,
  BusinessUnitUserRole,
  RoleChangeAudit
} from '@/types/user'
import { mockUsers, mockUserRoles } from '@/data/users'

class UserManagementService implements UserService {
  private users: User[] = [...mockUsers]
  private userRoles: BusinessUnitUserRole[] = [...mockUserRoles]
  private auditLog: RoleChangeAudit[] = []

  private async getUserRoleRecord(businessUnitId: string, userId: string): Promise<BusinessUnitUserRole | null> {
    return this.userRoles.find(
      record => record.businessUnitId === businessUnitId && record.userId === userId
    ) || null
  }

  private async saveUserRoleRecord(record: BusinessUnitUserRole): Promise<void> {
    const index = this.userRoles.findIndex(
      r => r.businessUnitId === record.businessUnitId && r.userId === record.userId
    )
    
    if (index !== -1) {
      this.userRoles[index] = record
    } else {
      this.userRoles.push(record)
    }
  }

  private async createAuditRecord(audit: Omit<RoleChangeAudit, 'id'>): Promise<void> {
    const auditRecord: RoleChangeAudit = {
      id: `AUDIT-${Date.now()}`,
      ...audit
    }
    this.auditLog.push(auditRecord)
  }

  private async validateRequest(businessUnitId: string, userId: string, systemId: string): Promise<void> {
    if (!businessUnitId) {
      throw new Error('Business unit ID is required')
    }
    if (!userId) {
      throw new Error('User ID is required')
    }
    if (!systemId) {
      throw new Error('System ID is required')
    }

    const validSystemIds = ['supply-chain-system', 'inventory-system']
    if (!validSystemIds.includes(systemId)) {
      throw new Error('Invalid system ID')
    }

    const user = this.users.find(u => u.id === userId)
    if (!user) {
      throw new Error('User not found')
    }

    const businessUnitExists = businessUnitId.startsWith('BU')
    if (!businessUnitExists) {
      throw new Error('Business unit not found')
    }
  }

  async addRoles(businessUnitId: string, userId: string, request: AddRolesRequest): Promise<RoleUpdateResponse> {
    await this.validateRequest(businessUnitId, userId, request.systemId)

    const currentRecord = await this.getUserRoleRecord(businessUnitId, userId)
    const previousRoles = currentRecord?.roles || []
    
    // Combine existing and new roles, remove duplicates
    const newRoles = [...new Set([...previousRoles, ...request.roles])]
    
    const timestamp = new Date().toISOString()
    
    const record: BusinessUnitUserRole = {
      userId,
      businessUnitId,
      roles: newRoles,
      lastUpdated: timestamp,
      updatedBy: request.systemId
    }

    await this.saveUserRoleRecord(record)
    
    await this.createAuditRecord({
      userId,
      businessUnitId,
      systemId: request.systemId,
      timestamp,
      action: 'add',
      previousRoles,
      newRoles
    })

    return {
      userId,
      businessUnitId,
      roles: newRoles,
      lastUpdated: timestamp
    }
  }

  async removeRoles(businessUnitId: string, userId: string, request: RemoveRolesRequest): Promise<RoleUpdateResponse> {
    await this.validateRequest(businessUnitId, userId, request.systemId)

    const currentRecord = await this.getUserRoleRecord(businessUnitId, userId)
    if (!currentRecord) {
      throw new Error('User role record not found')
    }

    const previousRoles = currentRecord.roles
    const newRoles = previousRoles.filter(role => !request.roles.includes(role))
    
    const timestamp = new Date().toISOString()
    
    const record: BusinessUnitUserRole = {
      userId,
      businessUnitId,
      roles: newRoles,
      lastUpdated: timestamp,
      updatedBy: request.systemId
    }

    await this.saveUserRoleRecord(record)
    
    await this.createAuditRecord({
      userId,
      businessUnitId,
      systemId: request.systemId,
      timestamp,
      action: 'remove',
      previousRoles,
      newRoles
    })

    return {
      userId,
      businessUnitId,
      roles: newRoles,
      lastUpdated: timestamp
    }
  }

  async syncRoles(businessUnitId: string, userId: string, request: SyncRolesRequest): Promise<RoleUpdateResponse> {
    await this.validateRequest(businessUnitId, userId, request.systemId)

    const currentRecord = await this.getUserRoleRecord(businessUnitId, userId)
    const previousRoles = currentRecord?.roles || []
    
    const timestamp = new Date().toISOString()
    
    const record: BusinessUnitUserRole = {
      userId,
      businessUnitId,
      roles: request.roles,
      lastUpdated: timestamp,
      updatedBy: request.systemId
    }

    await this.saveUserRoleRecord(record)
    
    await this.createAuditRecord({
      userId,
      businessUnitId,
      systemId: request.systemId,
      timestamp,
      action: 'sync',
      previousRoles,
      newRoles: request.roles
    })

    return {
      userId,
      businessUnitId,
      roles: request.roles,
      lastUpdated: timestamp
    }
  }

  async getUserRoles(businessUnitId: string, userId: string): Promise<GetUserRolesResponse> {
    const record = await this.getUserRoleRecord(businessUnitId, userId)
    if (!record) {
      return {
        roles: [],
        lastUpdated: new Date().toISOString()
      }
    }

    return {
      roles: record.roles,
      lastUpdated: record.lastUpdated
    }
  }

  // User Management Methods
  async getUsers(): Promise<User[]> {
    return this.users
  }

  async getUser(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null
  }

  async getUsersByBusinessUnit(businessUnitId: string): Promise<User[]> {
    const roleRecords = this.userRoles.filter(record => record.businessUnitId === businessUnitId)
    const userIds = roleRecords.map(record => record.userId)
    return this.users.filter(user => userIds.includes(user.id))
  }

  async getUserRolesByBusinessUnit(businessUnitId: string): Promise<BusinessUnitUserRole[]> {
    return this.userRoles.filter(record => record.businessUnitId === businessUnitId)
  }

  async getAuditLog(businessUnitId: string, userId?: string): Promise<RoleChangeAudit[]> {
    return this.auditLog.filter(record => {
      if (userId) {
        return record.businessUnitId === businessUnitId && record.userId === userId
      }
      return record.businessUnitId === businessUnitId
    })
  }

  async getUsersByRole(businessUnitId: string, role: string): Promise<User[]> {
    const roleRecords = this.userRoles.filter(
      record => record.businessUnitId === businessUnitId && record.roles.includes(role)
    )
    const userIds = roleRecords.map(record => record.userId)
    return this.users.filter(user => userIds.includes(user.id))
  }
}

export const userService = new UserManagementService()
