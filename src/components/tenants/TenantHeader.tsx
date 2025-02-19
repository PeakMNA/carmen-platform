import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export function TenantHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold">Tenants</h1>
        <p className="text-sm text-muted-foreground">
          Manage your platform tenants and their settings
        </p>
      </div>
      <Link href="/admin/tenants/new">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Tenant
        </Button>
      </Link>
    </div>
  )
} 