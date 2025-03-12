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
import { ArrowLeft, Building2, Briefcase, Users, MapPin, Database } from "lucide-react"
import Link from "next/link"
import { useState, useTransition, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { ToastAction } from "@/components/ui/toast"
import { createBusinessUnit, businessUnitService } from "@/services/businessUnitService"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { BusinessUnitCluster } from "@/types/tenant"

// Define the form data type to match BusinessUnitFormData
type FormData = {
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
  };
  settings: {
    notifications: {
      email: boolean;
      slack: boolean;
      webhook: boolean;
    };
    integrations: string[];
  };
};

// Available integrations
const availableIntegrations = [
  { id: "supply-chain", label: "Supply Chain" },
  { id: "inventory", label: "Inventory" },
  { id: "procurement", label: "Procurement" },
  { id: "maintenance", label: "Maintenance" },
  { id: "spa-booking", label: "Spa Booking" },
  { id: "restaurant", label: "Restaurant" }
];

export default function AddBusinessUnitPage() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const { toast } = useToast()
  const [clusters, setClusters] = useState<BusinessUnitCluster[]>([])
  const [selectedClusterId, setSelectedClusterId] = useState<string>("")
  const [activeTab, setActiveTab] = useState("basic")
  const [formData, setFormData] = useState<FormData>({
    name: "",
    brand: "",
    head: "",
    location: {
      city: "",
      country: "",
    },
    details: {
      rooms: 0,
      teams: 0,
      members: 0,
    },
    contact: {
      email: "",
      phone: "",
      address: "",
    },
    configuration: {
      database: {
        host: "",
        name: "",
        type: "mysql",
      }
    },
    settings: {
      notifications: {
        email: true,
        slack: false,
        webhook: false,
      },
      integrations: [],
    },
  })

  // Fetch clusters on component mount
  useEffect(() => {
    const fetchClusters = async () => {
      try {
        // Get all clusters by fetching them one by one
        const clusterIds = ["C-1", "C-2", "C-3"]; // Example cluster IDs
        const clusterPromises = clusterIds.map(id => businessUnitService.getCluster(id));
        const clusterResults = await Promise.all(clusterPromises);
        const validClusters = clusterResults.filter(cluster => cluster !== null) as BusinessUnitCluster[];
        
        setClusters(validClusters);
        if (validClusters.length > 0) {
          setSelectedClusterId(validClusters[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch clusters:", error);
        toast({
          title: "Error",
          description: "Failed to load clusters.",
          variant: "destructive",
        });
      }
    };

    fetchClusters();
  }, [toast]);

  // Update location field
  const handleLocationChange = (field: keyof FormData['location'], value: string) => {
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value
      }
    }));
  };

  // Update details field
  const handleDetailsChange = (field: keyof FormData['details'], value: number) => {
    setFormData(prev => ({
      ...prev,
      details: {
        ...prev.details,
        [field]: value
      }
    }));
  };

  // Update contact field
  const handleContactChange = (field: keyof FormData['contact'], value: string) => {
    setFormData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value
      }
    }));
  };

  // Update database configuration
  const handleDatabaseChange = (field: keyof FormData['configuration']['database'], value: string) => {
    setFormData(prev => ({
      ...prev,
      configuration: {
        ...prev.configuration,
        database: {
          ...prev.configuration.database,
          [field]: field === 'type' ? value as 'mysql' | 'postgres' : value
        }
      }
    }));
  };

  // Update notification settings
  const handleNotificationChange = (field: keyof FormData['settings']['notifications'], value: boolean) => {
    setFormData(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        notifications: {
          ...prev.settings.notifications,
          [field]: value
        }
      }
    }));
  };

  // Handle integration selection
  const handleIntegrationChange = (integrationId: string, checked: boolean) => {
    setFormData(prev => {
      const currentIntegrations = [...prev.settings.integrations];
      
      if (checked) {
        // Add integration if not already present
        if (!currentIntegrations.includes(integrationId)) {
          currentIntegrations.push(integrationId);
        }
      } else {
        // Remove integration if present
        const index = currentIntegrations.indexOf(integrationId);
        if (index !== -1) {
          currentIntegrations.splice(index, 1);
        }
      }
      
      return {
        ...prev,
        settings: {
          ...prev.settings,
          integrations: currentIntegrations
        }
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedClusterId) {
      toast({
        title: "Error",
        description: "Please select a cluster.",
        variant: "destructive",
      });
      return;
    }
    
    startTransition(async () => {
      try {
        await createBusinessUnit(selectedClusterId, formData)
        
        toast({
          title: "Success",
          description: "Business unit has been created successfully.",
        })
        
        router.push("/admin/business-units/manage")
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
            <Link href="/admin/business-units/manage">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Add Business Unit</h2>
              <p className="text-muted-foreground">
                Add a new hotel or property
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/business-units/manage">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" form="business-unit-form" disabled={isPending}>
              {isPending ? "Creating..." : "Create Business Unit"}
            </Button>
          </div>
        </div>
      </div>

      <form id="business-unit-form" onSubmit={handleSubmit}>
        <Tabs defaultValue="basic" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Business Unit Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Grand Hotel Downtown"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Input
                      id="brand"
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      placeholder="e.g., Luxury Collection"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="head">Head Manager</Label>
                    <Input
                      id="head"
                      value={formData.head}
                      onChange={(e) => setFormData({ ...formData, head: e.target.value })}
                      placeholder="e.g., John Smith"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cluster">Cluster</Label>
                    <Select
                      value={selectedClusterId}
                      onValueChange={setSelectedClusterId}
                    >
                      <SelectTrigger id="cluster">
                        <SelectValue placeholder="Select a cluster" />
                      </SelectTrigger>
                      <SelectContent>
                        {clusters.map((cluster) => (
                          <SelectItem key={cluster.id} value={cluster.id}>
                            {cluster.name} ({cluster.region})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="location.city">City</Label>
                    <Input
                      id="location.city"
                      value={formData.location.city}
                      onChange={(e) => handleLocationChange('city', e.target.value)}
                      placeholder="e.g., New York"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location.country">Country</Label>
                    <Input
                      id="location.country"
                      value={formData.location.country}
                      onChange={(e) => handleLocationChange('country', e.target.value)}
                      placeholder="e.g., USA"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="contact.email">Email</Label>
                    <Input
                      id="contact.email"
                      type="email"
                      value={formData.contact.email}
                      onChange={(e) => handleContactChange('email', e.target.value)}
                      placeholder="e.g., info@hotel.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact.phone">Phone</Label>
                    <Input
                      id="contact.phone"
                      value={formData.contact.phone}
                      onChange={(e) => handleContactChange('phone', e.target.value)}
                      placeholder="e.g., +1 123-456-7890"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact.address">Address</Label>
                    <Input
                      id="contact.address"
                      value={formData.contact.address}
                      onChange={(e) => handleContactChange('address', e.target.value)}
                      placeholder="e.g., 123 Main St"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="details.rooms">Number of Rooms</Label>
                    <Input
                      id="details.rooms"
                      type="number"
                      value={formData.details.rooms}
                      onChange={(e) => handleDetailsChange('rooms', parseInt(e.target.value) || 0)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="details.teams">Number of Teams</Label>
                    <Input
                      id="details.teams"
                      type="number"
                      value={formData.details.teams}
                      onChange={(e) => handleDetailsChange('teams', parseInt(e.target.value) || 0)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="details.members">Number of Members</Label>
                    <Input
                      id="details.members"
                      type="number"
                      value={formData.details.members}
                      onChange={(e) => handleDetailsChange('members', parseInt(e.target.value) || 0)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Rooms</CardTitle>
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{formData.details.rooms}</div>
                      <p className="text-xs text-muted-foreground">
                        Total rooms in the property
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Teams</CardTitle>
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{formData.details.teams}</div>
                      <p className="text-xs text-muted-foreground">
                        Operational teams
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Staff</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{formData.details.members}</div>
                      <p className="text-xs text-muted-foreground">
                        Total staff members
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Location</CardTitle>
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{formData.location.city || "—"}</div>
                      <p className="text-xs text-muted-foreground">
                        {formData.location.country || "—"}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="configuration" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Database Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="configuration.database.host">Database Host</Label>
                    <Input
                      id="configuration.database.host"
                      value={formData.configuration.database.host}
                      onChange={(e) => handleDatabaseChange('host', e.target.value)}
                      placeholder="e.g., db.example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="configuration.database.name">Database Name</Label>
                    <Input
                      id="configuration.database.name"
                      value={formData.configuration.database.name}
                      onChange={(e) => handleDatabaseChange('name', e.target.value)}
                      placeholder="e.g., hotel_db"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="configuration.database.type">Database Type</Label>
                    <Select
                      value={formData.configuration.database.type}
                      onValueChange={(value: 'mysql' | 'postgres') => 
                        handleDatabaseChange('type', value)
                      }
                    >
                      <SelectTrigger id="configuration.database.type">
                        <SelectValue placeholder="Select database type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mysql">MySQL</SelectItem>
                        <SelectItem value="postgres">PostgreSQL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="font-medium">Database Type</div>
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-muted-foreground" />
                      {formData.configuration.database.type}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Database Name</div>
                    <div>{formData.configuration.database.name || "—"}</div>
                  </div>
                  <div>
                    <div className="font-medium">Database Host</div>
                    <div>{formData.configuration.database.host || "—"}</div>
                  </div>
                  <div>
                    <div className="font-medium">Cluster</div>
                    <div>{clusters.find(c => c.id === selectedClusterId)?.name || "—"}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="settings.notifications.email">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Enable email notifications</p>
                    </div>
                    <Switch
                      id="settings.notifications.email"
                      checked={formData.settings.notifications.email}
                      onCheckedChange={(checked) => 
                        handleNotificationChange('email', checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="settings.notifications.slack">Slack Notifications</Label>
                      <p className="text-sm text-muted-foreground">Enable Slack notifications</p>
                    </div>
                    <Switch
                      id="settings.notifications.slack"
                      checked={formData.settings.notifications.slack}
                      onCheckedChange={(checked) => 
                        handleNotificationChange('slack', checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="settings.notifications.webhook">Webhook Notifications</Label>
                      <p className="text-sm text-muted-foreground">Enable webhook notifications</p>
                    </div>
                    <Switch
                      id="settings.notifications.webhook"
                      checked={formData.settings.notifications.webhook}
                      onCheckedChange={(checked) => 
                        handleNotificationChange('webhook', checked)
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {availableIntegrations.map((integration) => (
                    <div key={integration.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`integration-${integration.id}`}
                        checked={formData.settings.integrations.includes(integration.id)}
                        onCheckedChange={(checked) => 
                          handleIntegrationChange(integration.id, checked as boolean)
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
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 flex justify-end space-x-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => {
              const tabs = ["basic", "details", "configuration", "notifications"];
              const currentIndex = tabs.indexOf(activeTab);
              if (currentIndex > 0) {
                setActiveTab(tabs[currentIndex - 1]);
              }
            }}
            disabled={activeTab === "basic"}
          >
            Previous
          </Button>
          {activeTab !== "notifications" ? (
            <Button 
              type="button"
              onClick={() => {
                const tabs = ["basic", "details", "configuration", "notifications"];
                const currentIndex = tabs.indexOf(activeTab);
                if (currentIndex < tabs.length - 1) {
                  setActiveTab(tabs[currentIndex + 1]);
                }
              }}
            >
              Next
            </Button>
          ) : (
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Business Unit"}
            </Button>
          )}
        </div>
      </form>
    </div>
  )
} 