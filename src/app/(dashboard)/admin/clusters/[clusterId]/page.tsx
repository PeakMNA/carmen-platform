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
  Plus,
} from "lucide-react"
import Link from "next/link"
import { BusinessUnitsTab } from "@/components/clusters/BusinessUnitsTab"
import { ClusterTemplates } from "@/components/clusters/ClusterTemplates"
import { ClusterUsers } from "@/components/clusters/ClusterUsers"
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
  stats: {
    businessUnits: 12,
    activeReports: 156,
    users: 89,
    status: "active",
  },
  templates: [
    {
      id: "template_1",
      name: "Monthly Financial Report",
      type: "Financial",
      assignedCount: 8
    },
    {
      id: "template_2",
      name: "Inventory Status Report",
      type: "Operations",
      assignedCount: 5
    },
    {
      id: "template_3",
      name: "Staff Performance Report",
      type: "HR",
      assignedCount: 3
    }
  ],
  members: [
    {
      id: "user_1",
      name: "John Smith",
      role: "Cluster Admin",
      status: "active"
    },
    {
      id: "user_2",
      name: "Sarah Chen",
      role: "Report Manager",
      status: "active"
    },
    {
      id: "user_3",
      name: "Mike Johnson",
      role: "Business Unit Manager",
      status: "inactive"
    }
  ]
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
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

      {/* Quick Access Lists */}
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                Available Templates
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  const templatesTab = document.querySelector('[value="templates"]') as HTMLElement
                  if (templatesTab) templatesTab.click()
                }}
              >
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clusterData.templates.map((template) => (
                <div key={template.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{template.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {template.assignedCount} business units
                    </div>
                  </div>
                  <Badge>{template.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                Cluster Members
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  const usersTab = document.querySelector('[value="users"]') as HTMLElement
                  if (usersTab) usersTab.click()
                }}
              >
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clusterData.members.map((member) => (
                <div key={member.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-muted-foreground">{member.role}</div>
                  </div>
                  <Badge 
                    variant={member.status === "active" ? "default" : "secondary"}
                  >
                    {member.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="business-units" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="business-units">Business Units</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
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
        <TabsContent value="templates" className="space-y-4">
          <ClusterTemplates />
        </TabsContent>
        <TabsContent value="users" className="space-y-4">
          <ClusterUsers />
        </TabsContent>
        <TabsContent value="settings" className="space-y-4">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
