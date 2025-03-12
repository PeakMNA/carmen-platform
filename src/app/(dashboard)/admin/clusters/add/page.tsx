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
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState, useTransition } from "react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { ToastAction } from "@/components/ui/toast"
import { Switch } from "@/components/ui/switch"

interface ClusterFormData {
  name: string
  region: string
  description: string
  hotelGroup: {
    name: string
    brandCode: string
    website: string
  }
  database: {
    type: string
    host: string
    port: string
    name: string
  }
  domains: string[]
  contactInfo: {
    primaryEmail: string
    technicalContact: string
    billingContact: string
  }
  settings: {
    timeZone: string
    language: string
    currency: string
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

const initialFormData: ClusterFormData = {
  name: "",
  region: "",
  description: "",
  hotelGroup: {
    name: "",
    brandCode: "",
    website: "",
  },
  database: {
    type: "",
    host: "",
    port: "",
    name: "",
  },
  domains: [""],
  contactInfo: {
    primaryEmail: "",
    technicalContact: "",
    billingContact: "",
  },
  settings: {
    timeZone: "",
    language: "",
    currency: "",
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

export default function AddClusterPage() {
  const [formData, setFormData] = useState<ClusterFormData>(initialFormData)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      try {
        toast({
          title: "Creating cluster",
          description: "Please wait while we set up your cluster...",
        })
        // TODO: Add API call to create cluster
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
        console.log("Creating cluster:", formData)
        toast({
          title: "Success",
          description: "Your new cluster has been set up successfully.",
        })
        router.push("/admin/clusters")
      } catch (error) {
        console.error("Failed to create cluster:", error)
        toast({
          title: "Error",
          description: "Failed to create cluster.",
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

  const handleChange = (section: keyof ClusterFormData, field: string, value: string | Record<string, unknown>) => {
    setFormData((prev) => ({
      ...prev,
      [section]: typeof prev[section] === 'object'
        ? { ...prev[section], [field]: value }
        : value
    }))
  }

  const addDomain = () => {
    setFormData((prev) => ({
      ...prev,
      domains: [...prev.domains, ""]
    }))
  }

  const removeDomain = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      domains: prev.domains.filter((_, i) => i !== index)
    }))
  }

  const updateDomain = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      domains: prev.domains.map((domain, i) => i === index ? value : domain)
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/clusters">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Add New Cluster</h2>
          <p className="text-muted-foreground">
            Configure a new hotel group cluster and its settings
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hotel Group Information */}
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
                  placeholder="e.g., Luxury Hotels International"
                  value={formData.hotelGroup.name}
                  onChange={(e) => handleChange("hotelGroup", "name", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hotelGroup.brandCode">Brand Code</Label>
                <Input
                  id="hotelGroup.brandCode"
                  placeholder="e.g., LHI"
                  value={formData.hotelGroup.brandCode}
                  onChange={(e) => handleChange("hotelGroup", "brandCode", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="hotelGroup.website">Website</Label>
                <Input
                  id="hotelGroup.website"
                  type="url"
                  placeholder="https://www.example.com"
                  value={formData.hotelGroup.website}
                  onChange={(e) => handleChange("hotelGroup", "website", e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Database Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Database Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="database.type">Database Type</Label>
                <Select
                  value={formData.database.type}
                  onValueChange={(value) => handleChange("database", "type", value)}
                  required
                >
                  <SelectTrigger id="database.type">
                    <SelectValue placeholder="Select database type" />
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
                  placeholder="e.g., db.example.com"
                  value={formData.database.host}
                  onChange={(e) => handleChange("database", "host", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="database.port">Port</Label>
                <Input
                  id="database.port"
                  placeholder="e.g., 5432"
                  value={formData.database.port}
                  onChange={(e) => handleChange("database", "port", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="database.name">Database Name</Label>
                <Input
                  id="database.name"
                  placeholder="e.g., hotel_group_db"
                  value={formData.database.name}
                  onChange={(e) => handleChange("database", "name", e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Domains */}
        <Card>
          <CardHeader>
            <CardTitle>Domains</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.domains.map((domain, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  placeholder="e.g., hotels.example.com"
                  value={domain}
                  onChange={(e) => updateDomain(index, e.target.value)}
                  required
                />
                {formData.domains.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeDomain(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="gap-2"
              onClick={addDomain}
            >
              <Plus className="h-4 w-4" />
              Add Domain
            </Button>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contactInfo.primaryEmail">Primary Email</Label>
                <Input
                  id="contactInfo.primaryEmail"
                  type="email"
                  placeholder="primary@example.com"
                  value={formData.contactInfo.primaryEmail}
                  onChange={(e) => handleChange("contactInfo", "primaryEmail", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactInfo.technicalContact">Technical Contact</Label>
                <Input
                  id="contactInfo.technicalContact"
                  type="email"
                  placeholder="tech@example.com"
                  value={formData.contactInfo.technicalContact}
                  onChange={(e) => handleChange("contactInfo", "technicalContact", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactInfo.billingContact">Billing Contact</Label>
                <Input
                  id="contactInfo.billingContact"
                  type="email"
                  placeholder="billing@example.com"
                  value={formData.contactInfo.billingContact}
                  onChange={(e) => handleChange("contactInfo", "billingContact", e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
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
                  checked={formData.notifications.email.enabled}
                  onCheckedChange={(checked) => 
                    handleChange("notifications", "email", { ...formData.notifications.email, enabled: checked })}
                />
              </div>
              
              {formData.notifications.email.enabled && (
                <div className="space-y-4 pl-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email.dailyDigest">Daily Digest</Label>
                    <Switch
                      id="email.dailyDigest"
                      checked={formData.notifications.email.dailyDigest}
                      onCheckedChange={(checked) =>
                        handleChange("notifications", "email", { ...formData.notifications.email, dailyDigest: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email.alerts">System Alerts</Label>
                    <Switch
                      id="email.alerts"
                      checked={formData.notifications.email.alerts}
                      onCheckedChange={(checked) =>
                        handleChange("notifications", "email", { ...formData.notifications.email, alerts: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email.reportGeneration">Report Generation</Label>
                    <Switch
                      id="email.reportGeneration"
                      checked={formData.notifications.email.reportGeneration}
                      onCheckedChange={(checked) =>
                        handleChange("notifications", "email", { ...formData.notifications.email, reportGeneration: checked })}
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
                  checked={formData.notifications.slack.enabled}
                  onCheckedChange={(checked) =>
                    handleChange("notifications", "slack", { ...formData.notifications.slack, enabled: checked })}
                />
              </div>

              {formData.notifications.slack.enabled && (
                <div className="space-y-4 pl-6">
                  <div className="space-y-2">
                    <Label htmlFor="slack.webhookUrl">Webhook URL</Label>
                    <Input
                      id="slack.webhookUrl"
                      value={formData.notifications.slack.webhookUrl}
                      onChange={(e) =>
                        handleChange("notifications", "slack", { 
                          ...formData.notifications.slack, 
                          webhookUrl: e.target.value 
                        })}
                      placeholder="https://hooks.slack.com/services/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Channels</Label>
                    <div className="space-y-2">
                      {formData.notifications.slack.channels.map((channel, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={channel}
                            onChange={(e) => {
                              const newChannels = [...formData.notifications.slack.channels]
                              newChannels[index] = e.target.value
                              handleChange("notifications", "slack", {
                                ...formData.notifications.slack,
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
                              const newChannels = formData.notifications.slack.channels.filter((_, i) => i !== index)
                              handleChange("notifications", "slack", {
                                ...formData.notifications.slack,
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
                            ...formData.notifications.slack,
                            channels: [...formData.notifications.slack.channels, ""]
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
                  checked={formData.notifications.webhook.enabled}
                  onCheckedChange={(checked) =>
                    handleChange("notifications", "webhook", { ...formData.notifications.webhook, enabled: checked })}
                />
              </div>

              {formData.notifications.webhook.enabled && (
                <div className="space-y-4 pl-6">
                  {formData.notifications.webhook.endpoints.map((endpoint, index) => (
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
                                const newEndpoints = formData.notifications.webhook.endpoints.filter((_, i) => i !== index)
                                handleChange("notifications", "webhook", {
                                  ...formData.notifications.webhook,
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
                              const newEndpoints = [...formData.notifications.webhook.endpoints]
                              newEndpoints[index] = { ...endpoint, url: e.target.value }
                              handleChange("notifications", "webhook", {
                                ...formData.notifications.webhook,
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
                        ...formData.notifications.webhook,
                        endpoints: [...formData.notifications.webhook.endpoints, { url: "", events: [] }]
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
          <Link href="/admin/clusters">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Create Cluster"}
          </Button>
        </div>
      </form>
    </div>
  )
} 