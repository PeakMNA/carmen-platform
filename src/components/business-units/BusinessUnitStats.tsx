import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Users, Building2, Briefcase, LineChart } from "lucide-react"

const stats = [
  {
    title: "Total Units",
    value: "12",
    description: "Active business units",
    icon: Briefcase,
    trend: "+2 this quarter",
  },
  {
    title: "Total Teams",
    value: "48",
    description: "Across all units",
    icon: Users,
    trend: "+5 this month",
  },
  {
    title: "Tenants",
    value: "24",
    description: "Associated tenants",
    icon: Building2,
    trend: "+3 this month",
  },
  {
    title: "Resource Usage",
    value: "82%",
    description: "Average utilization",
    icon: LineChart,
    trend: "+5% from last month",
  },
]

export function BusinessUnitStats() {
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