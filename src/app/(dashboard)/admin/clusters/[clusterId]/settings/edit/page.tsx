"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState, useTransition, use } from "react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { ToastAction } from "@/components/ui/toast"
import { BackButton } from "@/components/ui/back-button"

interface ClusterSettings {
  hotelGroup: {
    name: string
    brandCode: string
    website: string
    description: string
  }
  database: {
    type: string
    host: string
    port: string
    name: string
  }
  settings: {
    timeZone: string
    language: string
    currency: string
    dateFormat: string
  }
  security: {
    ipRestrictions: boolean
    twoFactorAuth: boolean
    sessionTimeout: string
  }
  notifications: {
    email: {
      enabled: boolean
      dailyDigest: boolean
      alerts: boolean
      reportGeneration: boolean
    }
    slack: {
      enabled: boolean
      webhookUrl: string
      channels: string[]
    }
    webhook: {
      enabled: boolean
      endpoints: {
        url: string
        events: string[]
      }[]
    }
  }
}

// Mock data - replace with API call
const initialSettings: ClusterSettings = {
  hotelGroup: {
    name: "Luxury Hotels International",
    brandCode: "LHI",
    website: "https://www.luxuryhotels.com",
    description: "Premium hotel chain in Asia Pacific",
  },
  database: {
    type: "postgresql",
    host: "db.apac.luxuryhotels.com",
    port: "5432",
    name: "lhi_production",
  },
  settings: {
    timeZone: "Asia/Singapore",
    language: "en",
    currency: "USD",
    dateFormat: "DD/MM/YYYY",
  },
  security: {
    ipRestrictions: true,
    twoFactorAuth: true,
    sessionTimeout: "30",
  },
  notifications: {
    email: {
      enabled: true,
      dailyDigest: true,
      alerts: true,
      reportGeneration: true,
    },
    slack: {
      enabled: false,
      webhookUrl: "",
      channels: [],
    },
    webhook: {
      enabled: false,
      endpoints: [],
    },
  },
}

export default function EditClusterSettingsPage({
  params,
}: {
  params: Promise<{ clusterId: string }>
}) {
  const { clusterId } = use(params)
  const [settings, setSettings] = useState<ClusterSettings>(initialSettings)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      try {
        toast({
          title: "Saving changes",
          description: "Please wait while we update your settings...",
        })
        // TODO: Add API call to update settings
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
        console.log("Saving settings:", settings)
        toast({
          title: "Success",
          description: "Your changes have been saved successfully.",
        })
        router.push(`/admin/clusters/${clusterId}`)
      } catch (error) {
        console.error("Failed to save settings:", error)
        toast({
          title: "Error",
          description: "Failed to save settings.",
          variant: "destructive",
          action: (
            <ToastAction altText="Try again" onClick={() => handleSubmit(e)}>
              Try again
            </ToastAction>
          ),
        })
      }
    })
  }

  const handleChange = (
    section: keyof ClusterSettings, 
    field: string, 
    value: string | boolean | object | Record<string, unknown>[]
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <BackButton fallbackPath={`/admin/clusters/${clusterId}`} />
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Edit Cluster Settings</h2>
          <p className="text-muted-foreground">
            Modify cluster configuration and preferences
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Hotel Group Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="hotelGroup.name">Group Name</Label>
                <Input
                  id="hotelGroup.name"
                  value={settings.hotelGroup.name}
                  onChange={(e) => handleChange("hotelGroup", "name", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hotelGroup.brandCode">Brand Code</Label>
                <Input
                  id="hotelGroup.brandCode"
                  value={settings.hotelGroup.brandCode}
                  onChange={(e) => handleChange("hotelGroup", "brandCode", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="hotelGroup.website">Website</Label>
                <Input
                  id="hotelGroup.website"
                  type="url"
                  value={settings.hotelGroup.website}
                  onChange={(e) => handleChange("hotelGroup", "website", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="hotelGroup.description">Description</Label>
                <Textarea
                  id="hotelGroup.description"
                  value={settings.hotelGroup.description}
                  onChange={(e) => handleChange("hotelGroup", "description", e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Database Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="database.type">Database Type</Label>
                <Select
                  value={settings.database.type}
                  onValueChange={(value) => handleChange("database", "type", value)}
                >
                  <SelectTrigger id="database.type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="postgresql">PostgreSQL</SelectItem>
                    <SelectItem value="mysql">MySQL</SelectItem>
                    <SelectItem value="sqlserver">SQL Server</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="database.host">Host</Label>
                <Input
                  id="database.host"
                  value={settings.database.host}
                  onChange={(e) => handleChange("database", "host", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="database.port">Port</Label>
                <Input
                  id="database.port"
                  value={settings.database.port}
                  onChange={(e) => handleChange("database", "port", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="database.name">Database Name</Label>
                <Input
                  id="database.name"
                  value={settings.database.name}
                  onChange={(e) => handleChange("database", "name", e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Email Notifications */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Email Notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure email notification preferences
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.email.enabled}
                  onCheckedChange={(checked) => 
                    handleChange("notifications", "email", { ...settings.notifications.email, enabled: checked })}
                />
              </div>
              
              {settings.notifications.email.enabled && (
                <div className="space-y-4 pl-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email.dailyDigest">Daily Digest</Label>
                    <Switch
                      id="email.dailyDigest"
                      checked={settings.notifications.email.dailyDigest}
                      onCheckedChange={(checked) =>
                        handleChange("notifications", "email", { ...settings.notifications.email, dailyDigest: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email.alerts">System Alerts</Label>
                    <Switch
                      id="email.alerts"
                      checked={settings.notifications.email.alerts}
                      onCheckedChange={(checked) =>
                        handleChange("notifications", "email", { ...settings.notifications.email, alerts: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email.reportGeneration">Report Generation</Label>
                    <Switch
                      id="email.reportGeneration"
                      checked={settings.notifications.email.reportGeneration}
                      onCheckedChange={(checked) =>
                        handleChange("notifications", "email", { ...settings.notifications.email, reportGeneration: checked })}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Slack Integration */}
            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Slack Integration</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure Slack workspace integration
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.slack.enabled}
                  onCheckedChange={(checked) =>
                    handleChange("notifications", "slack", { ...settings.notifications.slack, enabled: checked })}
                />
              </div>

              {settings.notifications.slack.enabled && (
                <div className="space-y-4 pl-6">
                  <div className="space-y-2">
                    <Label htmlFor="slack.webhookUrl">Webhook URL</Label>
                    <Input
                      id="slack.webhookUrl"
                      value={settings.notifications.slack.webhookUrl}
                      onChange={(e) =>
                        handleChange("notifications", "slack", { 
                          ...settings.notifications.slack, 
                          webhookUrl: e.target.value 
                        })}
                      placeholder="https://hooks.slack.com/services/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Channels</Label>
                    <div className="space-y-2">
                      {settings.notifications.slack.channels.map((channel, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={channel}
                            onChange={(e) => {
                              const newChannels = [...settings.notifications.slack.channels]
                              newChannels[index] = e.target.value
                              handleChange("notifications", "slack", {
                                ...settings.notifications.slack,
                                channels: newChannels
                              })
                            }}
                            placeholder="#channel-name"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              const newChannels = settings.notifications.slack.channels.filter((_, i) => i !== index)
                              handleChange("notifications", "slack", {
                                ...settings.notifications.slack,
                                channels: newChannels
                              })
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        className="gap-2"
                        onClick={() => {
                          handleChange("notifications", "slack", {
                            ...settings.notifications.slack,
                            channels: [...settings.notifications.slack.channels, ""]
                          })
                        }}
                      >
                        <Plus className="h-4 w-4" />
                        Add Channel
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Webhook Integration */}
            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Custom Webhooks</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure custom webhook endpoints
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.webhook.enabled}
                  onCheckedChange={(checked) =>
                    handleChange("notifications", "webhook", { ...settings.notifications.webhook, enabled: checked })}
                />
              </div>

              {settings.notifications.webhook.enabled && (
                <div className="space-y-4 pl-6">
                  {settings.notifications.webhook.endpoints.map((endpoint, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label>Endpoint URL</Label>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                const newEndpoints = settings.notifications.webhook.endpoints.filter((_, i) => i !== index)
                                handleChange("notifications", "webhook", {
                                  ...settings.notifications.webhook,
                                  endpoints: newEndpoints
                                })
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <Input
                            value={endpoint.url}
                            onChange={(e) => {
                              const newEndpoints = [...settings.notifications.webhook.endpoints]
                              newEndpoints[index] = { ...endpoint, url: e.target.value }
                              handleChange("notifications", "webhook", {
                                ...settings.notifications.webhook,
                                endpoints: newEndpoints
                              })
                            }}
                            placeholder="https://api.example.com/webhook"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    className="gap-2"
                    onClick={() => {
                      handleChange("notifications", "webhook", {
                        ...settings.notifications.webhook,
                        endpoints: [...settings.notifications.webhook.endpoints, { url: "", events: [] }]
                      })
                    }}
                  >
                    <Plus className="h-4 w-4" />
                    Add Webhook Endpoint
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Link href={`/admin/clusters/${clusterId}`}>
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  )
} 