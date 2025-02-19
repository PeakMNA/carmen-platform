"use client"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Separator } from "@/components/ui/separator"
import { createBusinessUnit } from "@/services/businessUnitService"

interface AddBusinessUnitSheetProps {
  clusterId: string
  onBusinessUnitAdded: () => void
}

export function AddBusinessUnitSheet({ clusterId, onBusinessUnitAdded }: AddBusinessUnitSheetProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
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
    setIsLoading(true)

    try {
      // Use clusterId in the API call
      await createBusinessUnit(clusterId, formData)
      
      toast({
        title: "Success",
        description: "Business unit has been created successfully.",
      })
      
      setOpen(false)
      onBusinessUnitAdded()
      // Reset form
      setFormData({
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
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Business Unit
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <SheetHeader>
            <SheetTitle>Add Business Unit</SheetTitle>
            <SheetDescription>
              Add a new hotel or property to this cluster.
            </SheetDescription>
          </SheetHeader>
          <Separator className="my-4" />
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="font-medium">Basic Information</h3>
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
            </div>

            {/* Location */}
            <div className="space-y-4">
              <h3 className="font-medium">Location</h3>
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
                <div className="grid gap-4 grid-cols-2">
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
                <div className="grid gap-4 grid-cols-2">
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
            </div>

            {/* Property Details */}
            <div className="space-y-4">
              <h3 className="font-medium">Property Details</h3>
              <div className="grid gap-4 grid-cols-2">
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
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="font-medium">Contact Information</h3>
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
                <div className="grid gap-4 grid-cols-2">
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
            </div>

            {/* Notification Settings */}
            <div className="space-y-4">
              <h3 className="font-medium">Notification Settings</h3>
              
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
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <SheetClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </SheetClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Business Unit"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
} 