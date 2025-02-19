export interface Report {
  id: string
  name: string
  type: string
  hotel: string
  brand: string
  generatedAt: string
  status: "pending" | "completed" | "failed"
  format: "PDF" | "Excel" | "CSV"
  department: string
  category: string
  metrics?: string[]
  clusterId?: string
  businessUnitId?: string
}

export interface ReportTemplate {
  id: string
  name: string
  description: string
  category: string
  lastModified: string
  modifiedBy: string
  status: "active" | "draft" | "archived"
  sections: string[]
  department: string
  metrics: string[]
  version?: string
  tenantCustomizations?: boolean
}

export interface ReportRequest {
  id: string
  title: string
  entityType: "brand" | "hotel"
  entityName: string
  requestedBy: string
  requestDate: string
  status: "pending" | "approved" | "rejected" | "in-review"
  priority: "low" | "medium" | "high"
  description: string
  type: "standard" | "custom"
  department: string
  category: string
} 