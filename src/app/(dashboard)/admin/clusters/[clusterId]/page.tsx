"use client"

import { use } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building2,
  FileText,
  Settings,
  Users,
  ArrowLeft,
  Globe,
  Database,
  Mail,
  MessageSquare,
  Webhook,
  Plus,
} from "lucide-react"
import Link from "next/link"
import { BusinessUnitsTab } from "@/components/clusters/BusinessUnitsTab"
import { ReportsTab } from "@/components/clusters/ReportsTab"
import { UsersTab } from "@/components/clusters/UsersTab"
import { SettingsTab } from "@/components/clusters/SettingsTab"

// Mock data - replace with API call
const clusterData = {
  id: "c-1",
  name: "APAC Cluster",
  region: "Asia Pacific",
  hotelGroup: {
    name: "Luxury Hotels International",
    brandCode: "LHI",
    website: "https://www.luxuryhotels.com",
  },
  database: {
    type: "PostgreSQL",
    host: "db.apac.luxuryhotels.com",
    status: "connected",
  },
  domains: [
    "apac.luxuryhotels.com",
    "booking.luxuryhotels.asia",
  ],
  contacts: {
    primary: "admin@luxuryhotels.com",
    technical: "tech@luxuryhotels.com",
    billing: "finance@luxuryhotels.com",
  },
  stats: {
    businessUnits: 12,
    activeReports: 156,
    users: 89,
    status: "active",
  },
  notifications: {
    email: {
      enabled: true,
      dailyDigest: true,
      alerts: true,
      reportGeneration: true,
    },
    slack: {
      enabled: true,
      webhookUrl: "https://hooks.slack.com/services/xxx",
      channels: ["#alerts", "#reports"],
    },
    webhook: {
      enabled: true,
      endpoints: [
        { url: "https://api.example.com/webhook", events: ["alerts", "reports"] },
      ],
    },
  },
}

export default function ClusterDetailsPage({
  params,
}: {
  params: Promise<{ clusterId: string }>
}) {
  const { clusterId } = use(params)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/clusters">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight">{clusterData.hotelGroup.name}</h2>
            <Badge variant="outline">{clusterData.region}</Badge>
          </div>
          <p className="text-muted-foreground">
            {clusterData.hotelGroup.brandCode} • Manage cluster settings and business units
          </p>
        </div>
        <Link href={`/admin/clusters/${clusterId}/settings/edit`}>
          <Button variant="outline" className="gap-2">
            <Settings className="h-4 w-4" />
            Edit Settings
          </Button>
        </Link>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Business Units</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clusterData.stats.businessUnits}</div>
            <p className="text-xs text-muted-foreground">4 added this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clusterData.stats.activeReports}</div>
            <p className="text-xs text-muted-foreground">23 generated today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clusterData.stats.users}</div>
            <p className="text-xs text-muted-foreground">12 active now</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <Badge variant="outline" className="text-base capitalize">
                {clusterData.stats.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">Last updated 2h ago</p>
          </CardContent>
        </Card>
      </div>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Hotel Group Info */}
            <div className="space-y-4">
              <h3 className="font-semibold">Hotel Group Details</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Group Name:</span>
                  <span>{clusterData.hotelGroup.name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Website:</span>
                  <a href={clusterData.hotelGroup.website} className="text-primary hover:underline">
                    {clusterData.hotelGroup.website}
                  </a>
                </div>
              </div>
            </div>

            {/* Database Info */}
            <div className="space-y-4">
              <h3 className="font-semibold">Database Information</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Database className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Type:</span>
                  <span>{clusterData.database.type}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Host:</span>
                  <span>{clusterData.database.host}</span>
                  <Badge variant="outline" className="ml-2">
                    {clusterData.database.status}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Domains */}
            <div className="space-y-4">
              <h3 className="font-semibold">Domains</h3>
              <div className="space-y-2">
                {clusterData.domains.map((domain, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span>{domain}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="font-semibold">Contact Information</h3>
              <div className="space-y-2">
                {Object.entries(clusterData.contacts).map(([type, email]) => (
                  <div key={type} className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium capitalize">{type}:</span>
                    <a href={`mailto:${email}`} className="text-primary hover:underline">
                      {email}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Notification Settings */}
            <div className="space-y-4">
              <h3 className="font-semibold">Notification Settings</h3>
              <div className="grid gap-4 md:grid-cols-3">
                {/* Email Notifications */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Email Notifications</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {clusterData.notifications.email.enabled ? (
                      <ul className="space-y-1">
                        {clusterData.notifications.email.dailyDigest && <li>• Daily Digest</li>}
                        {clusterData.notifications.email.alerts && <li>• System Alerts</li>}
                        {clusterData.notifications.email.reportGeneration && <li>• Report Generation</li>}
                      </ul>
                    ) : (
                      "Disabled"
                    )}
                  </div>
                </div>

                {/* Slack Integration */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Slack Integration</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {clusterData.notifications.slack.enabled ? (
                      <ul className="space-y-1">
                        <li>• {clusterData.notifications.slack.channels.length} channels configured</li>
                      </ul>
                    ) : (
                      "Not configured"
                    )}
                  </div>
                </div>

                {/* Webhooks */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Webhook className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Custom Webhooks</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {clusterData.notifications.webhook.enabled ? (
                      <ul className="space-y-1">
                        <li>• {clusterData.notifications.webhook.endpoints.length} endpoints configured</li>
                      </ul>
                    ) : (
                      "Not configured"
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="business-units" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="business-units">Business Units</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <Link href={`/admin/clusters/${clusterId}/business-units/add`}>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Business Unit
            </Button>
          </Link>
        </div>
        <TabsContent value="business-units" className="space-y-4">
          <BusinessUnitsTab clusterId={clusterId} />
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <ReportsTab />
        </TabsContent>
        <TabsContent value="users" className="space-y-4">
          <UsersTab />
        </TabsContent>
        <TabsContent value="settings" className="space-y-4">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
} 