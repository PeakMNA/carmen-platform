"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts"
import { Download, FileText, Filter, Calendar, CreditCard, Building2, FolderTree } from "lucide-react"

// Mock data for subscription reports
const subscriptionTrendData = [
  { month: "Jan", active: 42, inactive: 5, total: 47 },
  { month: "Feb", active: 45, inactive: 4, total: 49 },
  { month: "Mar", active: 48, inactive: 3, total: 51 },
  { month: "Apr", active: 50, inactive: 3, total: 53 },
  { month: "May", active: 53, inactive: 2, total: 55 },
  { month: "Jun", active: 55, inactive: 2, total: 57 },
]

const moduleUsageData = [
  { 
    name: "Accounting", 
    adoptionRate: 85, 
    activeUsers: 320, 
    growthRate: 12,
    businessUnits: 38
  },
  { 
    name: "Inventory", 
    adoptionRate: 78, 
    activeUsers: 280, 
    growthRate: 8,
    businessUnits: 35
  },
  { 
    name: "Sales", 
    adoptionRate: 65, 
    activeUsers: 210, 
    growthRate: 15,
    businessUnits: 29
  },
  { 
    name: "Analytics", 
    adoptionRate: 60, 
    activeUsers: 180, 
    growthRate: 20,
    businessUnits: 27
  },
  { 
    name: "PMS", 
    adoptionRate: 45, 
    activeUsers: 150, 
    growthRate: 5,
    businessUnits: 20
  },
  { 
    name: "HR", 
    adoptionRate: 30, 
    activeUsers: 90, 
    growthRate: 10,
    businessUnits: 13
  },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d']

const licenseUtilizationData = [
  { name: "Grand Hotel Berlin", buStaff: 22, buStaffMax: 30, clusterUsers: 15, clusterUsersMax: 20 },
  { name: "Luxury Resort Paris", buStaff: 98, buStaffMax: 150, clusterUsers: 67, clusterUsersMax: 100 },
  { name: "Seaside Hotel Barcelona", buStaff: 42, buStaffMax: 50, clusterUsers: 22, clusterUsersMax: 30 },
  { name: "City Center Hotel New York", buStaff: 187, buStaffMax: 200, clusterUsers: 92, clusterUsersMax: 100 },
]

const revenueData = [
  { month: "Jan", revenue: 42000 },
  { month: "Feb", revenue: 45000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 51000 },
  { month: "May", revenue: 54000 },
  { month: "Jun", revenue: 57000 },
]

const clusterDistributionData = [
  { name: "European Hotels", value: 45 },
  { name: "American Hotels", value: 30 },
  { name: "Asian Hotels", value: 25 },
]

const subscriptionStats = [
  {
    title: "Total Subscriptions",
    value: "57",
    description: "Active subscriptions",
    icon: CreditCard,
    trend: "+4 this month",
  },
  {
    title: "Total Revenue",
    value: "$57,000",
    description: "Monthly recurring",
    icon: FileText,
    trend: "+$5,000 from last month",
  },
  {
    title: "Business Units",
    value: "42",
    description: "With active subscriptions",
    icon: Building2,
    trend: "+3 this month",
  },
  {
    title: "Active Clusters",
    value: "8",
    description: "With subscriptions",
    icon: FolderTree,
    trend: "+1 this quarter",
  },
]

export default function SubscriptionReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Subscription Reports</h2>
          <p className="text-muted-foreground">
            Analytics and insights for subscription management
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Select Date Range
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Reports
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {subscriptionStats.map((stat) => (
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
                <span className="ml-2 font-medium text-green-600">
                  {stat.trend}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="license-utilization">License Utilization</TabsTrigger>
          <TabsTrigger value="module-usage">Module Usage</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Trends</CardTitle>
                <CardDescription>Active vs. Inactive subscriptions over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={subscriptionTrendData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="active" stackId="a" fill="#8884d8" name="Active" />
                      <Bar dataKey="inactive" stackId="a" fill="#82ca9d" name="Inactive" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cluster Distribution</CardTitle>
                <CardDescription>Subscription distribution by cluster</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={clusterDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {clusterDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="license-utilization">
          <Card>
            <CardHeader>
              <CardTitle>License Utilization by Business Unit</CardTitle>
              <CardDescription>BU Staff and Cluster User license usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={licenseUtilizationData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="buStaff" name="BU Staff (Used)" stackId="a" fill="#8884d8" />
                    <Bar dataKey="buStaffMax" name="BU Staff (Available)" stackId="a" fill="#8884d8" fillOpacity={0.3} />
                    <Bar dataKey="clusterUsers" name="Cluster Users (Used)" stackId="b" fill="#82ca9d" />
                    <Bar dataKey="clusterUsersMax" name="Cluster Users (Available)" stackId="b" fill="#82ca9d" fillOpacity={0.3} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="module-usage">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Module Adoption Rate</CardTitle>
                <CardDescription>Percentage of business units using each module</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={moduleUsageData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Adoption Rate']} />
                      <Bar dataKey="adoptionRate" fill="#8884d8" name="Adoption %" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Module Active Users</CardTitle>
                <CardDescription>Number of active users per module</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={moduleUsageData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="activeUsers" fill="#82ca9d" name="Active Users" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Module Usage Summary</CardTitle>
                <CardDescription>Comprehensive view of module metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-muted/50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Module</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Business Units</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Active Users</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Adoption Rate</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Growth Rate</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {moduleUsageData.map((module) => (
                        <tr key={module.name}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{module.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{module.businessUnits}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{module.activeUsers}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex items-center">
                              <span className="mr-2">{module.adoptionRate}%</span>
                              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-primary" 
                                  style={{ width: `${module.adoptionRate}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={module.growthRate > 0 ? "text-green-600" : "text-red-600"}>
                              {module.growthRate > 0 ? "+" : ""}{module.growthRate}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Subscription Revenue</CardTitle>
              <CardDescription>Revenue trends over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={revenueData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} name="Revenue" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Subscription Insights</CardTitle>
          <CardDescription>Key metrics and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-medium">License Optimization</h3>
              <p className="text-sm text-muted-foreground mt-1">
                3 business units are using less than 50% of their allocated licenses. Consider reallocating licenses to optimize costs.
              </p>
              <Button variant="outline" size="sm" className="mt-2">View Details</Button>
            </div>
            
            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-medium">Module Adoption</h3>
              <p className="text-sm text-muted-foreground mt-1">
                HR module has the lowest adoption rate at 30% with only 13 business units using it. Analytics module shows the highest growth rate at 20%.
              </p>
              <Button variant="outline" size="sm" className="mt-2">View Details</Button>
            </div>
            
            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-medium">Revenue Growth</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Monthly recurring revenue has increased by 35% over the past 6 months, primarily driven by new business unit subscriptions.
              </p>
              <Button variant="outline" size="sm" className="mt-2">View Details</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 