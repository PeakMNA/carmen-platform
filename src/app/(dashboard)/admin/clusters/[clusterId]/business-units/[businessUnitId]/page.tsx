"use client"

import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, Globe, ArrowLeft } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from "react"
import { BusinessUnit } from "@/types/tenant"
import { businessUnitService } from "@/services/businessUnitService"
import { BusinessUnitUsers } from "@/components/business-units/BusinessUnitUsers"
import { BusinessUnitSubscription } from "@/components/business-units/BusinessUnitSubscription"

export default function BusinessUnitDetailsPage() {
  const { clusterId, businessUnitId } = useParams()
  const router = useRouter()
  const [businessUnit, setBusinessUnit] = useState<BusinessUnit | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBusinessUnit = async () => {
      try {
        const unit = await businessUnitService.getBusinessUnit(businessUnitId as string)
        setBusinessUnit(unit)
      } catch (error) {
        console.error('Failed to load business unit:', error)
      } finally {
        setLoading(false)
      }
    }

    loadBusinessUnit()
  }, [businessUnitId])

  const handleUpdateLimits = async (maxUsers: number) => {
    try {
      // TODO: Implement API call to update subscription limits
      console.log('Updating user limits:', maxUsers)
      setBusinessUnit(prev => prev ? {
        ...prev,
        details: {
          ...prev.details,
          maxUsers
        }
      } : null)
    } catch (error) {
      console.error('Failed to update limits:', error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!businessUnit) {
    return <div>Business unit not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => router.push(`/admin/clusters/${clusterId}/business-units`)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-2xl font-bold tracking-tight">{businessUnit.name}</h2>
          </div>
          <p className="text-muted-foreground">
            Business unit details and configuration
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            onClick={() => router.push(`/admin/clusters/${clusterId}/business-units/${businessUnitId}/edit`)}
          >
            Edit Unit
          </Button>
          <Button 
            variant="destructive"
            onClick={() => {
              if (confirm('Are you sure you want to deactivate this business unit?')) {
                // TODO: Implement deactivation
                console.log('Deactivating unit:', businessUnitId)
              }
            }}
          >
            Deactivate Unit
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <div className="text-sm font-medium">Brand</div>
                    <div className="text-sm text-muted-foreground">{businessUnit.brand}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Head</div>
                    <div className="text-sm text-muted-foreground">{businessUnit.head}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Status</div>
                    <Badge variant="outline">{businessUnit.status}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  Location & Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <div className="text-sm font-medium">Location</div>
                    <div className="text-sm text-muted-foreground">
                      {businessUnit.location.city}, {businessUnit.location.country}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Email</div>
                    <div className="text-sm text-muted-foreground">{businessUnit.contact.email}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Phone</div>
                    <div className="text-sm text-muted-foreground">{businessUnit.contact.phone}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Address</div>
                    <div className="text-sm text-muted-foreground">{businessUnit.contact.address}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <BusinessUnitUsers businessUnitId={businessUnitId as string} />
        </TabsContent>

        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Resource Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="text-lg font-semibold">{businessUnit.details.rooms}</div>
                  <div className="text-sm text-muted-foreground">Total Rooms</div>
                </div>
                <div className="space-y-2">
                  <div className="text-lg font-semibold">{businessUnit.details.teams}</div>
                  <div className="text-sm text-muted-foreground">Active Teams</div>
                </div>
                <div className="space-y-2">
                  <div className="text-lg font-semibold">{businessUnit.details.members}</div>
                  <div className="text-sm text-muted-foreground">Total Members</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscription">
          <BusinessUnitSubscription
            currentUsers={businessUnit.details.members}
            maxUsers={businessUnit.details.maxUsers || 200}
            onUpdateLimits={handleUpdateLimits}
          />
        </TabsContent>

        <TabsContent value="settings">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Integration Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h4 className="mb-4 text-sm font-medium">Active Integrations</h4>
                    <div className="space-y-2">
                      {businessUnit.settings.integrations.enabled.map((integration) => (
                        <div key={integration} className="flex items-center justify-between">
                          <span className="capitalize">{integration.replace('-', ' ')}</span>
                          <Badge variant="default">Active</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h4 className="mb-4 text-sm font-medium">Notification Settings</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Email Notifications</span>
                        <Badge variant={businessUnit.settings.notifications.email ? "default" : "secondary"}>
                          {businessUnit.settings.notifications.email ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Slack Integration</span>
                        <Badge variant={businessUnit.settings.notifications.slack ? "default" : "secondary"}>
                          {businessUnit.settings.notifications.slack ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Webhook Notifications</span>
                        <Badge variant={businessUnit.settings.notifications.webhook ? "default" : "secondary"}>
                          {businessUnit.settings.notifications.webhook ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
