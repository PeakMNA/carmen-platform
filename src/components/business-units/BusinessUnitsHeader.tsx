import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export function BusinessUnitsHeader() {
  const { clusterId } = useParams()

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-semibold">Business Units</h1>
        <p className="text-sm text-muted-foreground">
          Manage organizational structure and teams
        </p>
      </div>
      <Link href={`/admin/clusters/${clusterId}/business-units/add`}>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Business Unit
        </Button>
      </Link>
    </div>
  )
} 