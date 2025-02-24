"use client"

import { DetailDialog } from "@/components/ui/detail-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Users, Building2, MapPin, Database } from "lucide-react"

import { BusinessUnit } from '@/types/tenant'
import { BusinessUnitUsers } from "./BusinessUnitUsers"

interface BusinessUnitDetailsProps {
  unit: BusinessUnit
  isOpen: boolean
  onClose: () => void
}

function formatLocation(location: BusinessUnit['location']): string {
  return `${location.city}, ${location.country}`
}

export function BusinessUnitDetails({ unit, isOpen, onClose }: BusinessUnitDetailsProps) {
  return (
    <DetailDialog
      title={unit.name}
      description="Business Unit Details"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Tabs defaultValue="overview" className="mt-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Unit ID:</span>
                  <span className="text-sm text-muted-foreground">{unit.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Head:</span>
                  <span className="text-sm text-muted-foreground">{unit.head}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Location:</span>
                  <span className="text-sm text-muted-foreground">{formatLocation(unit.location)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Status:</span>
                  <Badge variant="default">{unit.status}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Database:</span>
                  <span className="text-sm text-muted-foreground">
                    {unit.configuration.database.name} ({unit.configuration.database.type})
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Resource Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Teams:</span>
                  <span className="text-sm text-muted-foreground">{unit.details.teams}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Members:</span>
                  <span className="text-sm text-muted-foreground">{unit.details.members}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Rooms:</span>
                  <span className="text-sm text-muted-foreground">{unit.details.rooms}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="users" className="space-y-4">
          <BusinessUnitUsers businessUnitId={unit.id} />
        </TabsContent>
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Integration Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h4 className="mb-4 text-sm font-medium">Active Integrations</h4>
                  <div className="space-y-2">
                    {unit.settings.integrations.enabled.map((integration) => (
                      <div key={integration} className="flex items-center justify-between">
                        <span className="capitalize">{integration.replace('-', ' ')}</span>
                        <Badge variant="default">Active</Badge>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <h4 className="mb-4 text-sm font-medium">Database Configuration</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Database Type</span>
                      <Badge variant="outline">{unit.configuration.database.type}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Database Name</span>
                      <span className="text-sm text-muted-foreground">{unit.configuration.database.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Host</span>
                      <span className="text-sm text-muted-foreground">{unit.configuration.database.host}</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <h4 className="mb-4 text-sm font-medium">Notification Settings</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Email Notifications</span>
                      <Badge variant={unit.settings.notifications.email ? "default" : "secondary"}>
                        {unit.settings.notifications.email ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Slack Integration</span>
                      <Badge variant={unit.settings.notifications.slack ? "default" : "secondary"}>
                        {unit.settings.notifications.slack ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Webhook Notifications</span>
                      <Badge variant={unit.settings.notifications.webhook ? "default" : "secondary"}>
                        {unit.settings.notifications.webhook ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DetailDialog>
  )
}
