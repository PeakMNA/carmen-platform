import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function UsersHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-semibold">Users</h1>
        <p className="text-sm text-muted-foreground">
          Manage user accounts and permissions across all tenants
        </p>
      </div>
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Add User
      </Button>
    </div>
  )
} 