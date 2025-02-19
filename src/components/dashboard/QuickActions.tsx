import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  UserPlus, 
  Building2, 
  Settings, 
  FileText,
  ArrowRight
} from "lucide-react"

const actions = [
  {
    title: "Add New User",
    description: "Create a new user account",
    icon: UserPlus,
    href: "/admin/users/new",
  },
  {
    title: "Configure Tenant",
    description: "Manage tenant settings",
    icon: Building2,
    href: "/admin/tenants",
  },
  {
    title: "System Settings",
    description: "Configure platform settings",
    icon: Settings,
    href: "/admin/settings",
  },
  {
    title: "View Reports",
    description: "Access analytics and reports",
    icon: FileText,
    href: "/admin/reports",
  },
]

interface QuickActionsProps extends React.HTMLAttributes<HTMLDivElement> {}

export function QuickActions({ className, ...props }: QuickActionsProps) {
  return (
    <Card className={cn("col-span-3", className)} {...props}>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Common tasks and operations
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {actions.map((action) => (
          <Button
            key={action.title}
            variant="outline"
            className="h-auto flex-col items-start gap-1 p-4 text-left"
            asChild
          >
            <a href={action.href}>
              <div className="flex w-full items-center gap-4">
                <action.icon className="h-5 w-5 text-primary-600" />
                <div className="flex-1">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {action.description}
                  </div>
                </div>
                <ArrowRight className="h-4 w-4" />
              </div>
            </a>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
} 