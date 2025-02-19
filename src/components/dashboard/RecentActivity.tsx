import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const activities = [
  {
    user: "John Doe",
    action: "created a new tenant",
    target: "Acme Corp",
    time: "2 hours ago",
  },
  {
    user: "Jane Smith",
    action: "updated user permissions",
    target: "Tech Team",
    time: "4 hours ago",
  },
  {
    user: "Mike Johnson",
    action: "resolved an issue",
    target: "#1234",
    time: "5 hours ago",
  },
  {
    user: "Sarah Wilson",
    action: "added new users",
    target: "Marketing Dept",
    time: "1 day ago",
  },
]

interface RecentActivityProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RecentActivity({ className, ...props }: RecentActivityProps) {
  return (
    <Card className={cn("col-span-4", className)} {...props}>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Latest actions across your platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="relative mt-1 flex h-2 w-2">
                <div className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-primary-400 opacity-75"></div>
                <div className="relative inline-flex h-2 w-2 rounded-full bg-primary-500"></div>
              </div>
              <div className="flex flex-col space-y-1">
                <p className="text-sm">
                  <span className="font-medium text-primary-700">{activity.user}</span>
                  {" "}{activity.action}{" "}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 