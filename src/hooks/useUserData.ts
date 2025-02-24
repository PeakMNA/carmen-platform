import { useState, useEffect } from "react"
import { User, BusinessUnitUserRole } from "@/types/user"
import { PlatformUser } from "@/types/platform-user"
import { BusinessUnitRole, ModuleType, AccessLevel } from "@/types/user-base"
import { userService } from "@/services/userService"
import { mockClusters } from "@/data/clusters"

interface UseUserDataProps {
  businessUnitId?: string
  clusterId?: string
}

interface UseUserDataReturn {
  users: PlatformUser[]
  loading: boolean
  error: Error | null
  roleDistribution: {
    role: string
    count: number
  }[]
}

const getModuleType = (role: string): ModuleType | null => {
  switch (role) {
    case "manager": return "reports"
    case "inventory": return "inventory"
    case "finance": return "finance"
    case "procurement": return "procurement"
    default: return null
  }
}

const getAccessLevel = (role: string): AccessLevel => {
  return role === "manager" ? "admin" : "write"
}

const transformToSharedFormat = (users: User[], roles: BusinessUnitUserRole[]): PlatformUser[] => {
  return users.map(user => ({
    ...user,
    platformRole: user.platformRole === "admin" ? "platform_admin" as const : "support" as const,
    businessUnitAssignments: roles
      .filter(role => role.userId === user.id)
      .map(role => ({
        id: `BA-${user.id}-${role.businessUnitId}`,
        businessUnitId: role.businessUnitId,
        businessUnitName: "Loading...", // Would come from API
        role: "department_head" as BusinessUnitRole,
        modules: role.roles
          .map(r => {
            const moduleType = getModuleType(r)
            return moduleType ? {
              moduleId: moduleType,
              accessLevel: getAccessLevel(r)
            } : null
          })
          .filter((m): m is { moduleId: ModuleType; accessLevel: AccessLevel } => m !== null),
        assignedAt: role.lastUpdated,
        updatedAt: role.lastUpdated
      })),
    stats: {
      totalAssignments: roles.filter(role => role.userId === user.id).length,
      activeBusinessUnits: roles.filter(role => role.userId === user.id).length,
      lastLoginAt: user.lastActive,
      totalModulesAccessed: roles
        .filter(role => role.userId === user.id)
        .reduce((total, role) => total + role.roles.length, 0)
    },
    auditLog: [],
    createdAt: user.lastActive,
    updatedAt: user.lastActive
  }))
}

export function useUserData({ businessUnitId, clusterId }: UseUserDataProps): UseUserDataReturn {
  const [users, setUsers] = useState<PlatformUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true)
        setError(null)

        if (!businessUnitId && !clusterId) {
          throw new Error("Either businessUnitId or clusterId must be provided")
        }

        let targetBusinessUnitIds: string[] = []
        
        if (businessUnitId) {
          targetBusinessUnitIds = [businessUnitId]
        } else if (clusterId) {
          // Find the cluster and get its business units
          const cluster = mockClusters.find(c => c.id.toLowerCase() === clusterId.toLowerCase())
          if (cluster) {
            targetBusinessUnitIds = cluster.businessUnits
          }
        }

        if (targetBusinessUnitIds.length === 0) {
          setUsers([])
          return
        }

        // Fetch users and roles for all business units in the cluster
        const [usersData, rolesData] = await Promise.all([
          Promise.all(targetBusinessUnitIds.map(id => userService.getUsersByBusinessUnit(id))),
          Promise.all(targetBusinessUnitIds.map(id => userService.getUserRolesByBusinessUnit(id)))
        ])

        // Flatten and deduplicate users
        const allUsers = Array.from(
          new Set(usersData.flat().map(user => user.id))
        ).map(userId => 
          usersData.flat().find(user => user.id === userId)!
        )

        // Combine all roles
        const allRoles = rolesData.flat()

        const transformedUsers = transformToSharedFormat(allUsers, allRoles)
        setUsers(transformedUsers)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to load users"))
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [businessUnitId, clusterId])

  const roleDistribution = users.length > 0
    ? Array.from(
        new Set(
          users.flatMap(user => 
            user.businessUnitAssignments.map(assignment => assignment.role)
          )
        )
      ).map(role => ({
        role,
        count: users.filter(user =>
          user.businessUnitAssignments.some(assignment => assignment.role === role)
        ).length
      }))
    : []

  return {
    users,
    loading,
    error,
    roleDistribution
  }
}
