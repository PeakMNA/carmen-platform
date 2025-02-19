import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"

export function SettingsHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your platform settings and preferences
        </p>
      </div>
      <Button>
        <Save className="mr-2 h-4 w-4" />
        Save Changes
      </Button>
    </div>
  )
} 