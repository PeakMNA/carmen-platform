import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-semibold">Welcome back, Admin</h1>
        <p className="text-sm text-muted-foreground">
          Here's what's happening with your platform today.
        </p>
      </div>
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Add New Tenant
      </Button>
    </div>
  )
} 