"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FileText, Building2, FolderTree, Users } from "lucide-react"

const stats = [
  {
    title: "Total Reports",
    value: "2,345",
    description: "Generated this month",
    icon: FileText,
  },
  {
    title: "Business Units",
    value: "24",
    description: "Across all clusters",
    icon: Building2,
  },
  {
    title: "Active Clusters",
    value: "3",
    description: "APAC, EMEA, Americas",
    icon: FolderTree,
  },
  {
    title: "Total Users",
    value: "573",
    description: "Active this month",
    icon: Users,
  },
]

export function DashboardStats() {
  return (
    <>
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </>
  )
} 