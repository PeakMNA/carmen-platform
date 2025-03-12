"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface UsageData {
  businessUnit: string
  users: number
  maxUsers: number
  modules: number
  maxModules: number
  storage: number
  maxStorage: number
}

const mockUsageData: UsageData[] = [
  {
    businessUnit: "Grand Hotel Singapore",
    users: 180,
    maxUsers: 200,
    modules: 5,
    maxModules: 6,
    storage: 75,
    maxStorage: 100
  },
  {
    businessUnit: "Luxury Resort Bali",
    users: 450,
    maxUsers: 1000,
    modules: 6,
    maxModules: 6,
    storage: 120,
    maxStorage: 200
  },
  {
    businessUnit: "Boutique Hotel Bangkok",
    users: 45,
    maxUsers: 50,
    modules: 3,
    maxModules: 3,
    storage: 25,
    maxStorage: 50
  }
]

const usageChartData = [
  { month: 'Jan', users: 520, storage: 150 },
  { month: 'Feb', users: 580, storage: 165 },
  { month: 'Mar', users: 620, storage: 180 },
  { month: 'Apr', users: 650, storage: 195 },
  { month: 'May', users: 675, storage: 210 },
  { month: 'Jun', users: 675, storage: 220 }
]

export default function SubscriptionUsagePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Subscription Usage</h2>
        <p className="text-muted-foreground">
          Monitor resource usage across business units
        </p>
      </div>

      <Tabs defaultValue="current" className="space-y-4">
        <TabsList>
          <TabsTrigger value="current">Current Usage</TabsTrigger>
          <TabsTrigger value="trends">Usage Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="current">
          <div className="grid gap-4">
            {mockUsageData.map((data, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{data.businessUnit}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">User Licenses</div>
                      <div className="text-sm text-muted-foreground">
                        {data.users} of {data.maxUsers} ({Math.round((data.users / data.maxUsers) * 100)}%)
                      </div>
                    </div>
                    <Progress value={(data.users / data.maxUsers) * 100} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Active Modules</div>
                      <div className="text-sm text-muted-foreground">
                        {data.modules} of {data.maxModules} ({Math.round((data.modules / data.maxModules) * 100)}%)
                      </div>
                    </div>
                    <Progress value={(data.modules / data.maxModules) * 100} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Storage Usage</div>
                      <div className="text-sm text-muted-foreground">
                        {data.storage} GB of {data.maxStorage} GB ({Math.round((data.storage / data.maxStorage) * 100)}%)
                      </div>
                    </div>
                    <Progress value={(data.storage / data.maxStorage) * 100} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Usage Trends (Last 6 Months)</CardTitle>
              <CardDescription>Aggregated usage across all business units</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={usageChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="users" name="Users" fill="#8884d8" />
                    <Bar yAxisId="right" dataKey="storage" name="Storage (GB)" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 