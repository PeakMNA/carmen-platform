export interface HotelUser {
  id: string
  name: string
  email: string
  clusterId: string
  clusterName: string
  hotelId: string
  hotelName: string
  department: string
  role: string
  modules: string[]
  status: "active" | "inactive"
  lastActive: string
}

export interface HotelUserFormData {
  id?: string
  name: string
  email: string
  clusterId: string
  hotelId: string
  department: string
  role: string
  modules: string[]
  status: "active" | "inactive"
}

export const departments = [
  { value: "front_office", label: "Front Office" },
  { value: "housekeeping", label: "Housekeeping" },
  { value: "food_beverage", label: "Food & Beverage" },
  { value: "maintenance", label: "Maintenance" },
  { value: "finance", label: "Finance" },
  { value: "hr", label: "Human Resources" }
] as const

export const departmentRoles = [
  { value: "department_head", label: "Department Head" },
  { value: "supervisor", label: "Supervisor" },
  { value: "staff", label: "Staff" }
] as const

export const moduleOptions = [
  { value: "inventory", label: "Inventory" },
  { value: "scheduling", label: "Scheduling" },
  { value: "maintenance", label: "Maintenance" },
  { value: "reports", label: "Reports" }
] as const
