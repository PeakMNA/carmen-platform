"use client"

import { use } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
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
import { useRouter, useParams } from "next/navigation"
import { ToastAction } from "@/components/ui/toast"
import { Separator } from "@/components/ui/separator"

export default function AddBusinessUnitPage() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const { clusterId } = useParams()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    location: {
      street: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
    },
    details: {
      rooms: "",
      floors: "",
      yearBuilt: "",
      lastRenovated: "",
    },
    contact: {
      phone: "",
      email: "",
      manager: "",
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
        channels: [""],
      },
      webhook: {
        enabled: false,
        endpoints: [{
          url: "",
          events: [],
        }],
      },
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      try {
        await createBusinessUnit(clusterId as string, formData)
        
        toast({
          title: "Success",
          description: "Business unit has been created successfully.",
        })
        
        router.push(`/admin/clusters/${clusterId}/business-units`)
      } catch (error) {
        console.error("Failed to create business unit:", error)
        toast({
          title: "Error",
          description: "Failed to create business unit.",
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

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/admin/clusters/${clusterId}/business-units`}>
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Add Business Unit</h2>
              <p className="text-muted-foreground">
                Add a new hotel or property to this cluster
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href={`/admin/clusters/${clusterId}/business-units`}>
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" form="business-unit-form" disabled={isPending}>
              {isPending ? "Creating..." : "Create Business Unit"}
            </Button>
          </div>
        </div>
        <div className="mt-4 flex gap-x-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span className="font-medium">Cluster:</span>
            <span>Main Cluster</span>
          </div>
          <div>•</div>
          <div className="flex items-center gap-1">
            <span className="font-medium">Region:</span>
            <span>Asia Pacific</span>
          </div>
          <div>•</div>
          <div className="flex items-center gap-1">
            <span className="font-medium">Business Units:</span>
            <span>12 Active</span>
          </div>
        </div>
      </div>

      <form id="business-unit-form" onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <p className="text-sm text-muted-foreground">
              Enter the basic details of the property
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Property Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Grand Hotel Downtown"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Property Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                  required
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hotel">Hotel</SelectItem>
                    <SelectItem value="resort">Resort</SelectItem>
                    <SelectItem value="apartment">Serviced Apartment</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader>
            <CardTitle>Location</CardTitle>
            <p className="text-sm text-muted-foreground">
              Specify the property's location details
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="location.street">Street Address</Label>
                <Input
                  id="location.street"
                  value={formData.location.street}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    location: { ...prev.location, street: e.target.value }
                  }))}
                  required
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="location.city">City</Label>
                  <Input
                    id="location.city"
                    value={formData.location.city}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      location: { ...prev.location, city: e.target.value }
                    }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location.state">State/Province</Label>
                  <Input
                    id="location.state"
                    value={formData.location.state}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      location: { ...prev.location, state: e.target.value }
                    }))}
                    required
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="location.country">Country</Label>
                  <Input
                    id="location.country"
                    value={formData.location.country}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      location: { ...prev.location, country: e.target.value }
                    }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location.postalCode">Postal Code</Label>
                  <Input
                    id="location.postalCode"
                    value={formData.location.postalCode}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      location: { ...prev.location, postalCode: e.target.value }
                    }))}
                    required
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Property Details */}
        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
            <p className="text-sm text-muted-foreground">
              Enter specific details about the property
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="details.rooms">Number of Rooms</Label>
                <Input
                  id="details.rooms"
                  type="number"
                  value={formData.details.rooms}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    details: { ...prev.details, rooms: e.target.value }
                  }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="details.floors">Number of Floors</Label>
                <Input
                  id="details.floors"
                  type="number"
                  value={formData.details.floors}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    details: { ...prev.details, floors: e.target.value }
                  }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="details.yearBuilt">Year Built</Label>
                <Input
                  id="details.yearBuilt"
                  type="number"
                  value={formData.details.yearBuilt}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    details: { ...prev.details, yearBuilt: e.target.value }
                  }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="details.lastRenovated">Last Renovated</Label>
                <Input
                  id="details.lastRenovated"
                  type="number"
                  value={formData.details.lastRenovated}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    details: { ...prev.details, lastRenovated: e.target.value }
                  }))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <p className="text-sm text-muted-foreground">
              Add contact details for the property
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact.manager">Property Manager</Label>
                <Input
                  id="contact.manager"
                  value={formData.contact.manager}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    contact: { ...prev.contact, manager: e.target.value }
                  }))}
                  required
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact.phone">Phone Number</Label>
                  <Input
                    id="contact.phone"
                    type="tel"
                    value={formData.contact.phone}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      contact: { ...prev.contact, phone: e.target.value }
                    }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact.email">Email</Label>
                  <Input
                    id="contact.email"
                    type="email"
                    value={formData.contact.email}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      contact: { ...prev.contact, email: e.target.value }
                    }))}
                    required
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <p className="text-sm text-muted-foreground">
              Configure how you want to receive notifications
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Email Notifications */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Configure email notification preferences
                  </p>
                </div>
                <Switch
                  checked={formData.notifications.email.enabled}
                  onCheckedChange={(checked) => setFormData(prev => ({
                    ...prev,
                    notifications: {
                      ...prev.notifications,
                      email: { ...prev.notifications.email, enabled: checked }
                    }
                  }))}
                />
              </div>
              
              {formData.notifications.email.enabled && (
                <div className="space-y-4 pl-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email.dailyDigest">Daily Digest</Label>
                    <Switch
                      id="email.dailyDigest"
                      checked={formData.notifications.email.dailyDigest}
                      onCheckedChange={(checked) => setFormData(prev => ({
                        ...prev,
                        notifications: {
                          ...prev.notifications,
                          email: { ...prev.notifications.email, dailyDigest: checked }
                        }
                      }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email.alerts">System Alerts</Label>
                    <Switch
                      id="email.alerts"
                      checked={formData.notifications.email.alerts}
                      onCheckedChange={(checked) => setFormData(prev => ({
                        ...prev,
                        notifications: {
                          ...prev.notifications,
                          email: { ...prev.notifications.email, alerts: checked }
                        }
                      }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email.reportGeneration">Report Generation</Label>
                    <Switch
                      id="email.reportGeneration"
                      checked={formData.notifications.email.reportGeneration}
                      onCheckedChange={(checked) => setFormData(prev => ({
                        ...prev,
                        notifications: {
                          ...prev.notifications,
                          email: { ...prev.notifications.email, reportGeneration: checked }
                        }
                      }))}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Slack Integration */}
            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Slack Integration</Label>
                  <p className="text-sm text-muted-foreground">
                    Configure Slack notifications
                  </p>
                </div>
                <Switch
                  checked={formData.notifications.slack.enabled}
                  onCheckedChange={(checked) => setFormData(prev => ({
                    ...prev,
                    notifications: {
                      ...prev.notifications,
                      slack: { ...prev.notifications.slack, enabled: checked }
                    }
                  }))}
                />
              </div>
              
              {formData.notifications.slack.enabled && (
                <div className="space-y-4 pl-6">
                  <div className="space-y-2">
                    <Label htmlFor="slack.webhookUrl">Webhook URL</Label>
                    <Input
                      id="slack.webhookUrl"
                      value={formData.notifications.slack.webhookUrl}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        notifications: {
                          ...prev.notifications,
                          slack: { ...prev.notifications.slack, webhookUrl: e.target.value }
                        }
                      }))}
                      placeholder="https://hooks.slack.com/services/..."
                      required={formData.notifications.slack.enabled}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Channels</Label>
                    {formData.notifications.slack.channels.map((channel, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={channel}
                          onChange={(e) => {
                            const newChannels = [...formData.notifications.slack.channels]
                            newChannels[index] = e.target.value
                            setFormData(prev => ({
                              ...prev,
                              notifications: {
                                ...prev.notifications,
                                slack: { ...prev.notifications.slack, channels: newChannels }
                              }
                            }))
                          }}
                          placeholder="#channel-name"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const newChannels = formData.notifications.slack.channels.filter((_, i) => i !== index)
                            setFormData(prev => ({
                              ...prev,
                              notifications: {
                                ...prev.notifications,
                                slack: { ...prev.notifications.slack, channels: newChannels }
                              }
                            }))
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
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        notifications: {
                          ...prev.notifications,
                          slack: {
                            ...prev.notifications.slack,
                            channels: [...prev.notifications.slack.channels, ""]
                          }
                        }
                      }))}
                    >
                      <Plus className="h-4 w-4" />
                      Add Channel
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Webhook Integration */}
            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Custom Webhooks</Label>
                  <p className="text-sm text-muted-foreground">
                    Configure custom webhook endpoints
                  </p>
                </div>
                <Switch
                  checked={formData.notifications.webhook.enabled}
                  onCheckedChange={(checked) => setFormData(prev => ({
                    ...prev,
                    notifications: {
                      ...prev.notifications,
                      webhook: { ...prev.notifications.webhook, enabled: checked }
                    }
                  }))}
                />
              </div>
              
              {formData.notifications.webhook.enabled && (
                <div className="space-y-4 pl-6">
                  {formData.notifications.webhook.endpoints.map((endpoint, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Endpoint URL</Label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const newEndpoints = formData.notifications.webhook.endpoints.filter((_, i) => i !== index)
                            setFormData(prev => ({
                              ...prev,
                              notifications: {
                                ...prev.notifications,
                                webhook: { ...prev.notifications.webhook, endpoints: newEndpoints }
                              }
                            }))
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
                          setFormData(prev => ({
                            ...prev,
                            notifications: {
                              ...prev.notifications,
                              webhook: { ...prev.notifications.webhook, endpoints: newEndpoints }
                            }
                          }))
                        }}
                        placeholder="https://api.example.com/webhook"
                        required={formData.notifications.webhook.enabled}
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    className="gap-2"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      notifications: {
                        ...prev.notifications,
                        webhook: {
                          ...prev.notifications.webhook,
                          endpoints: [...prev.notifications.webhook.endpoints, { url: "", events: [] }]
                        }
                      }
                    }))}
                  >
                    <Plus className="h-4 w-4" />
                    Add Webhook Endpoint
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
} 