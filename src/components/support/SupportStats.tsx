import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Clock, CheckCircle2, AlertCircle, MessageCircle } from "lucide-react"

const stats = [
  {
    title: "Open Tickets",
    value: "12",
    description: "Active support requests",
    icon: MessageCircle,
    trend: "+2 today",
  },
  {
    title: "Average Response",
    value: "2.4h",
    description: "Response time",
    icon: Clock,
    trend: "-0.3h this week",
  },
  {
    title: "Resolution Rate",
    value: "94%",
    description: "Tickets resolved",
    icon: CheckCircle2,
    trend: "+2% this month",
  },
  {
    title: "Critical Issues",
    value: "2",
    description: "High priority",
    icon: AlertCircle,
    trend: "-1 from yesterday",
  },
]

export function SupportStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span>{stat.description}</span>
              <span className="ml-2 font-medium text-primary-600">
                {stat.trend}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 