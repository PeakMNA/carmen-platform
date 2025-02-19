import { Metadata } from "next"
import { TenantsTable } from "@/components/tenants/TenantsTable"
import { TenantHeader } from "@/components/tenants/TenantHeader"

export const metadata: Metadata = {
  title: "Tenants | Carmen Platform",
  description: "Manage your platform tenants",
}

export default function TenantsPage() {
  return (
    <div className="space-y-8">
      <TenantHeader />
      <TenantsTable />
    </div>
  )
} 