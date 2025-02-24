"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Users, HardDrive, Bell, CreditCard, AlertTriangle } from "lucide-react"

interface SupplyChainMetrics {
  businessUnits: {
    used: number
    total: number
  }
  users: {
    used: number
    total: number
  }
  modules: {
    active: number
    available: number
    list: string[]
  }
  integrations: {
    connected: number
    total: number
    list: string[]
  }
}

const mockUsage: SupplyChainMetrics = {
  businessUnits: { used: 12, total: 20 },
  users: { used: 180, total: 200 },
  modules: { 
    active: 6, 
    available: 8,
    list: [
      "Inventory Management",
      "Procurement",
      "Order Tracking",
      "Demand Forecasting",
      "Supplier Management",
      "Advanced Analytics"
    ]
  },
  integrations: {
    connected: 3,
    total: 5,
    list: [
      "Carmen Hotel Financial",
      "Property Management System",
      "Revenue Management System"
    ]
  }
}

export function SubscriptionManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Subscription Management</h2>
          <p className="text-muted-foreground">
            Manage your subscription, monitor usage, and view billing information
          </p>
        </div>
        <Button>Upgrade Plan</Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
                <Badge>Professional Supply Chain</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$499/month</div>
                <p className="text-xs text-muted-foreground">Enterprise Supply Chain Management</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Next Billing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Mar 21, 2025</div>
                <p className="text-xs text-muted-foreground">Auto-renewal enabled</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">•••• 4242</div>
                <p className="text-xs text-muted-foreground">Visa - Expires 12/25</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Status</CardTitle>
                <Badge variant="outline" className="text-green-600">Active</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Good Standing</div>
                <p className="text-xs text-muted-foreground">No issues detected</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="usage">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Supply Chain Modules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Active Business Units</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {mockUsage.businessUnits.used} of {mockUsage.businessUnits.total}
                    </span>
                  </div>
                  <Progress value={(mockUsage.businessUnits.used / mockUsage.businessUnits.total) * 100} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Supply Chain Users</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {mockUsage.users.used} of {mockUsage.users.total}
                    </span>
                  </div>
                  <Progress value={(mockUsage.users.used / mockUsage.users.total) * 100} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <HardDrive className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Active Modules</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {mockUsage.modules.active} of {mockUsage.modules.available}
                    </span>
                  </div>
                  <Progress value={(mockUsage.modules.active / mockUsage.modules.available) * 100} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Integration Points</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {mockUsage.integrations.connected} of {mockUsage.integrations.total}
                    </span>
                  </div>
                  <Progress value={(mockUsage.integrations.connected / mockUsage.integrations.total) * 100} />
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">Module Activation Alert</h4>
                        <p className="text-sm text-muted-foreground">Demand Forecasting module requires activation</p>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">Financial Integration Alert</h4>
                        <p className="text-sm text-muted-foreground">Carmen Hotel Financial sync status check required</p>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <h4 className="text-sm font-medium">Module Recommendation</h4>
                      <p className="text-sm text-muted-foreground">
                        Enable Advanced Analytics module to improve supply chain efficiency.
                      </p>
                      <Button className="mt-4" size="sm">Compare Plans</Button>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h4 className="text-sm font-medium">Financial Integration</h4>
                      <p className="text-sm text-muted-foreground">
                        Enable real-time transaction sync with Carmen Hotel Financial.
                      </p>
                      <Button variant="outline" className="mt-4" size="sm">Learn More</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="billing">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 rounded-lg border p-4">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">Visa ending in 4242</h4>
                      <p className="text-sm text-muted-foreground">Expires 12/25</p>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <Button className="w-full">Add Payment Method</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subscription History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="text-sm font-medium">Feb 2025</div>
                      <div className="text-sm text-muted-foreground">Professional Supply Chain</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">$199.00</div>
                      <div className="text-sm text-muted-foreground">Paid</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="text-sm font-medium">Jan 2025</div>
                      <div className="text-sm text-muted-foreground">Professional Supply Chain</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">$199.00</div>
                      <div className="text-sm text-muted-foreground">Paid</div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">View All Invoices</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
