import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function ClustersHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-semibold">Clusters</h1>
        <p className="text-sm text-muted-foreground">
          Manage infrastructure clusters and resources
        </p>
      </div>
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Add Cluster
      </Button>
    </div>
  )
} 