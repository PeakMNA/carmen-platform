import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Server, Cpu, HardDrive, Activity } from "lucide-react"

const stats = [
  {
    title: "Total Clusters",
    value: "8",
    description: "Active clusters",
    icon: Server,
    trend: "+1 this month",
  },
  {
    title: "CPU Usage",
    value: "76%",
    description: "Average utilization",
    icon: Cpu,
    trend: "+5% from last week",
  },
  {
    title: "Storage",
    value: "4.2TB",
    description: "Total allocated",
    icon: HardDrive,
    trend: "85% utilized",
  },
  {
    title: "Health Status",
    value: "98.9%",
    description: "Cluster uptime",
    icon: Activity,
    trend: "Normal",
  },
]

export function ClusterStats() {
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