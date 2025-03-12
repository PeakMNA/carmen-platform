"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useState, useTransition, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { ToastAction } from "@/components/ui/toast"
import { businessUnitService } from "@/services/businessUnitService"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { BusinessUnit, BusinessUnitCluster } from "@/types/tenant"
import { mockBusinessUnits } from "@/data/business-units"
import { mockClusters } from "@/data/clusters"
import { BusinessUnitEditUsers } from "@/components/business-units/BusinessUnitEditUsers"
import { BackButton } from "@/components/ui/back-button"

// Define the form data type to match BusinessUnit
type FormData = {
  id: string;
  name: string;
  brand: string;
  head: string;
  location: {
    city: string;
    country: string;
  };
  details: {
    rooms: number;
    teams: number;
    members: number;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  configuration: {
    database: {
      host: string;
      name: string;
      type: 'mysql' | 'postgres';
    };
    cluster: {
      id: string;
      name: string;
    };
  };
  settings: {
    notifications: {
      email: boolean;
      slack: boolean;
      webhook: boolean;
    };
    integrations: {
      enabled: string[];
      configurations: Record<string, unknown>;
    };
  };
  status: 'active' | 'inactive' | 'maintenance';
};

// Convert the array of business units to a record for easier lookup
const businessUnitsRecord: Record<string, BusinessUnit> = {};
mockBusinessUnits.forEach(bu => {
  businessUnitsRecord[bu.id] = bu;
});

// Available integrations
const availableIntegrations = [
  { id: "pms", label: "Property Management System" },
  { id: "crm", label: "Customer Relationship Management" },
  { id: "pos", label: "Point of Sale" },
  { id: "accounting", label: "Accounting System" },
  { id: "housekeeping", label: "Housekeeping Management" },
];

export function EditBusinessUnitClient({ businessUnitId }: { businessUnitId: string }) {
  console.log("EditBusinessUnitClient rendering with businessUnitId:", businessUnitId);
  
  const { toast } = useToast()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isLoading, setIsLoading] = useState(true)
  const [clusters, setClusters] = useState<BusinessUnitCluster[]>([])
  
  // Initialize form data with empty values
  const [formData, setFormData] = useState<FormData>({
    id: '',
    name: '',
    brand: '',
    head: '',
    location: {
      city: '',
      country: '',
    },
    details: {
      rooms: 0,
      teams: 0,
      members: 0,
    },
    contact: {
      email: '',
      phone: '',
      address: '',
    },
    configuration: {
      database: {
        host: '',
        name: '',
        type: 'postgres',
      },
      cluster: {
        id: '',
        name: '',
      },
    },
    settings: {
      notifications: {
        email: false,
        slack: false,
        webhook: false,
      },
      integrations: {
        enabled: [],
        configurations: {},
      },
    },
    status: 'active',
  })

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data for business unit:", businessUnitId);
      try {
        // Try to fetch from API first
        const businessUnitData = await businessUnitService.getBusinessUnit(businessUnitId)
        
        // Try to fetch clusters
        const clustersData = await businessUnitService.getCluster('all')
        
        if (businessUnitData) {
          console.log("API data received for business unit:", businessUnitId);
          // Update state with API data
          setFormData({
            id: businessUnitData.id || '',
            name: businessUnitData.name || '',
            brand: businessUnitData.brand || '',
            head: businessUnitData.head || '',
            location: {
              city: businessUnitData.location?.city || '',
              country: businessUnitData.location?.country || '',
            },
            details: {
              rooms: businessUnitData.details?.rooms || 0,
              teams: businessUnitData.details?.teams || 0,
              members: businessUnitData.details?.members || 0,
            },
            contact: {
              email: businessUnitData.contact?.email || '',
              phone: businessUnitData.contact?.phone || '',
              address: businessUnitData.contact?.address || '',
            },
            configuration: {
              database: {
                host: businessUnitData.configuration?.database?.host || '',
                name: businessUnitData.configuration?.database?.name || '',
                type: businessUnitData.configuration?.database?.type || 'mysql',
              },
              cluster: {
                id: businessUnitData.clusterId || '',
                name: Array.isArray(clustersData) ? 
                  clustersData.find((c: BusinessUnitCluster) => c.id === businessUnitData.clusterId)?.name || '' : 
                  '',
              },
            },
            settings: {
              notifications: {
                email: businessUnitData.settings?.notifications?.email || false,
                slack: businessUnitData.settings?.notifications?.slack || false,
                webhook: businessUnitData.settings?.notifications?.webhook || false,
              },
              integrations: {
                enabled: businessUnitData.settings?.integrations?.enabled || [],
                configurations: businessUnitData.settings?.integrations?.configurations || {},
              },
            },
            status: businessUnitData.status || 'active',
          })
        } else {
          console.log("Business unit not found in API, checking mock data...");
          
          // Check if the business unit exists in mock data
          const mockUnit = mockBusinessUnits.find(bu => bu.id === businessUnitId);
          
          if (mockUnit) {
            console.log("Using mock data for business unit:", mockUnit);
            // Update state with mock data
            setFormData({
              id: mockUnit.id || '',
              name: mockUnit.name || '',
              brand: mockUnit.brand || '',
              head: mockUnit.head || '',
              location: {
                city: mockUnit.location?.city || '',
                country: mockUnit.location?.country || '',
              },
              details: {
                rooms: mockUnit.details?.rooms || 0,
                teams: mockUnit.details?.teams || 0,
                members: mockUnit.details?.members || 0,
              },
              contact: {
                email: mockUnit.contact?.email || '',
                phone: mockUnit.contact?.phone || '',
                address: mockUnit.contact?.address || '',
              },
              configuration: {
                database: {
                  host: mockUnit.configuration?.database?.host || '',
                  name: mockUnit.configuration?.database?.name || '',
                  type: mockUnit.configuration?.database?.type || 'mysql',
                },
                cluster: {
                  id: mockUnit.clusterId || '',
                  name: Array.isArray(clustersData) ? 
                    clustersData.find((c: BusinessUnitCluster) => c.id === mockUnit.clusterId)?.name || '' : 
                    '',
                },
              },
              settings: {
                notifications: {
                  email: mockUnit.settings?.notifications?.email || false,
                  slack: mockUnit.settings?.notifications?.slack || false,
                  webhook: mockUnit.settings?.notifications?.webhook || false,
                },
                integrations: {
                  enabled: mockUnit.settings?.integrations?.enabled || [],
                  configurations: mockUnit.settings?.integrations?.configurations || {},
                },
              },
              status: mockUnit.status || 'active',
            })
          } else {
            console.error(`Business unit with ID ${businessUnitId} not found in API or mock data`);
            toast({
              variant: "destructive",
              title: "Error",
              description: `Business unit with ID ${businessUnitId} not found.`,
              action: <ToastAction altText="Go back">Go back</ToastAction>,
            })
          }
        }
        
        // Ensure clustersData is an array
        if (Array.isArray(clustersData)) {
          setClusters(clustersData)
        } else if (clustersData) {
          setClusters([clustersData])
        } else {
          setClusters([])
        }
      } catch (error) {
        console.error("Failed to fetch data from API:", error)
        
        // Use mock clusters
        setClusters(mockClusters as BusinessUnitCluster[])
        
        toast({
          variant: "destructive",
          title: "Using mock data",
          description: "Connected to mock data source instead of API",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [businessUnitId, toast])

  const handleLocationChange = (field: keyof FormData['location'], value: string) => {
    setFormData({
      ...formData,
      location: {
        ...formData.location,
        [field]: value,
      },
    })
  }

  const handleDetailsChange = (field: keyof FormData['details'], value: number) => {
    setFormData({
      ...formData,
      details: {
        ...formData.details,
        [field]: value,
      },
    })
  }

  const handleContactChange = (field: keyof FormData['contact'], value: string) => {
    setFormData({
      ...formData,
      contact: {
        ...formData.contact,
        [field]: value,
      },
    })
  }

  const handleDatabaseChange = (field: keyof FormData['configuration']['database'], value: string) => {
    setFormData({
      ...formData,
      configuration: {
        ...formData.configuration,
        database: {
          ...formData.configuration.database,
          [field]: field === 'type' ? (value as 'mysql' | 'postgres') : value,
        },
      },
    })
  }

  const handleClusterChange = (value: string) => {
    const selectedCluster = clusters.find(c => c.id === value)
    setFormData({
      ...formData,
      configuration: {
        ...formData.configuration,
        cluster: {
          id: value,
          name: selectedCluster?.name || '',
        },
      },
    })
  }

  const handleNotificationChange = (field: keyof FormData['settings']['notifications'], value: boolean) => {
    setFormData({
      ...formData,
      settings: {
        ...formData.settings,
        notifications: {
          ...formData.settings.notifications,
          [field]: value,
        },
      },
    })
  }

  const handleStatusChange = (value: string) => {
    setFormData({
      ...formData,
      status: value as 'active' | 'inactive' | 'maintenance',
    })
  }

  const handleIntegrationChange = (integrationId: string, checked: boolean) => {
    let updatedIntegrations = [...formData.settings.integrations.enabled]
    
    if (checked) {
      // Add integration if not already in the list
      if (!updatedIntegrations.includes(integrationId)) {
        updatedIntegrations.push(integrationId)
      }
    } else {
      // Remove integration if in the list
      updatedIntegrations = updatedIntegrations.filter(id => id !== integrationId)
    }
    
    setFormData({
      ...formData,
      settings: {
        ...formData.settings,
        integrations: {
          ...formData.settings.integrations,
          enabled: updatedIntegrations,
        },
      },
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    startTransition(async () => {
      try {
        // Call API to update business unit
        await businessUnitService.updateBusinessUnit(businessUnitId, {
          name: formData.name,
          brand: formData.brand,
          head: formData.head,
          location: formData.location,
          details: formData.details,
          contact: formData.contact,
          settings: formData.settings,
          // Convert 'maintenance' to 'inactive' for API compatibility
          status: formData.status === 'maintenance' ? 'inactive' : formData.status,
        })
        
        // Call API to update configuration separately
        await businessUnitService.updateBusinessUnitConfiguration(businessUnitId, {
          database: formData.configuration.database,
          cluster: formData.configuration.cluster,
        })
        
        toast({
          title: "Business unit updated",
          description: "The business unit has been updated successfully.",
        })
        
        // Navigate back to business unit details page
        router.push(`/admin/business-units/${businessUnitId}`)
      } catch (error) {
        console.error("Failed to update business unit:", error)
        
        toast({
          variant: "destructive",
          title: "Failed to update",
          description: "There was an error updating the business unit.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }
    })
  }

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BackButton fallbackPath={`/admin/business-units/${businessUnitId}`} />
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Edit Business Unit</h2>
            <p className="text-muted-foreground">
              Update business unit information and settings
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic" className="space-y-4">
          <TabsList>
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="id">ID</Label>
                    <Input
                      id="id"
                      value={formData.id}
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter business unit name"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Input
                      id="brand"
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      placeholder="Enter brand name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="head">Head</Label>
                    <Input
                      id="head"
                      value={formData.head}
                      onChange={(e) => setFormData({ ...formData, head: e.target.value })}
                      placeholder="Enter head name"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.location.city}
                      onChange={(e) => handleLocationChange('city', e.target.value)}
                      placeholder="Enter city"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={formData.location.country}
                      onChange={(e) => handleLocationChange('country', e.target.value)}
                      placeholder="Enter country"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Business Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rooms">Rooms</Label>
                    <Input
                      id="rooms"
                      type="number"
                      value={formData.details.rooms}
                      onChange={(e) => handleDetailsChange('rooms', parseInt(e.target.value))}
                      placeholder="Enter number of rooms"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teams">Teams</Label>
                    <Input
                      id="teams"
                      type="number"
                      value={formData.details.teams}
                      onChange={(e) => handleDetailsChange('teams', parseInt(e.target.value))}
                      placeholder="Enter number of teams"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="members">Members</Label>
                    <Input
                      id="members"
                      type="number"
                      value={formData.details.members}
                      onChange={(e) => handleDetailsChange('members', parseInt(e.target.value))}
                      placeholder="Enter number of members"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="contact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.contact.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.contact.phone}
                    onChange={(e) => handleContactChange('phone', e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.contact.address}
                    onChange={(e) => handleContactChange('address', e.target.value)}
                    placeholder="Enter address"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="configuration" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Database Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="db-type">Database Type</Label>
                    <Select
                      value={formData.configuration.database.type}
                      onValueChange={(value) => handleDatabaseChange('type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select database type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="postgres">PostgreSQL</SelectItem>
                        <SelectItem value="mysql">MySQL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="db-host">Database Host</Label>
                    <Input
                      id="db-host"
                      value={formData.configuration.database.host}
                      onChange={(e) => handleDatabaseChange('host', e.target.value)}
                      placeholder="Enter database host"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="db-name">Database Name</Label>
                  <Input
                    id="db-name"
                    value={formData.configuration.database.name}
                    onChange={(e) => handleDatabaseChange('name', e.target.value)}
                    placeholder="Enter database name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cluster">Cluster</Label>
                  <Select
                    value={formData.configuration.cluster.id}
                    onValueChange={handleClusterChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select cluster" />
                    </SelectTrigger>
                    <SelectContent>
                      {clusters.map((cluster) => (
                        <SelectItem key={cluster.id} value={cluster.id}>
                          {cluster.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={formData.settings.notifications.email}
                    onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="slack-notifications">Slack Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via Slack
                    </p>
                  </div>
                  <Switch
                    id="slack-notifications"
                    checked={formData.settings.notifications.slack}
                    onCheckedChange={(checked) => handleNotificationChange('slack', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="webhook-notifications">Webhook Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send notifications to webhook endpoints
                    </p>
                  </div>
                  <Switch
                    id="webhook-notifications"
                    checked={formData.settings.notifications.webhook}
                    onCheckedChange={(checked) => handleNotificationChange('webhook', checked)}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {availableIntegrations.map((integration) => (
                  <div key={integration.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`integration-${integration.id}`}
                      checked={formData.settings.integrations.enabled.includes(integration.id)}
                      onCheckedChange={(checked) => 
                        handleIntegrationChange(integration.id, checked === true)
                      }
                    />
                    <Label
                      htmlFor={`integration-${integration.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {integration.label}
                    </Label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-4">
            <BusinessUnitEditUsers businessUnitId={businessUnitId} />
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 flex justify-end gap-4">
          <Link href={`/admin/business-units/${businessUnitId}`}>
            <Button variant="outline" type="button">Cancel</Button>
          </Link>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  )
} 