"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Users, Building2, MapPin, Database, Edit, Trash } from "lucide-react"
import Link from "next/link"
import { BusinessUnit } from "@/types/tenant"
import { businessUnitService } from "@/services/businessUnitService"
import { BusinessUnitUsers } from "@/components/business-units/BusinessUnitUsers"
import { mockBusinessUnits as dataBusinessUnits } from "@/data/business-units"
import { BackButton } from "@/components/ui/back-button"

function formatLocation(location: BusinessUnit['location']): string {
  return `${location.city}, ${location.country}`
}

// Convert the array of business units to a record for easier lookup
const mockBusinessUnits: Record<string, BusinessUnit> = {};
dataBusinessUnits.forEach(bu => {
  mockBusinessUnits[bu.id] = bu;
});

// Add this for debugging
console.log("Available mock business units:", Object.keys(mockBusinessUnits));

export function BusinessUnitClient({ businessUnitId }: { businessUnitId: string }) {
  console.log("BusinessUnitClient received businessUnitId:", businessUnitId);
  
  const router = useRouter()
  const [unit, setUnit] = useState<BusinessUnit | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBusinessUnit = async () => {
      console.log("Fetching business unit with ID:", businessUnitId);
      
      try {
        // Try to fetch from API first
        console.log("Attempting to fetch from API...");
        const data = await businessUnitService.getBusinessUnit(businessUnitId)
        console.log("API response:", data);
        
        if (data) {
          console.log("Business unit found in API:", data);
          setUnit(data)
        } else {
          console.log("Business unit not found in API, checking mock data...");
          
          // Fall back to mock data
          console.log("Available mock IDs:", Object.keys(mockBusinessUnits));
          const mockUnit = mockBusinessUnits[businessUnitId]
          
          if (mockUnit) {
            console.log("Using mock data for business unit:", mockUnit);
            setUnit(mockUnit)
          } else {
            console.error(`Business unit with ID ${businessUnitId} not found in API or mock data`);
            // You could redirect to a 404 page or show an error message
          }
        }
      } catch (error) {
        console.error("Failed to fetch business unit:", error)
        
        // Fall back to mock data if API fails
        console.log("Checking mock data for ID:", businessUnitId);
        console.log("Available mock IDs:", Object.keys(mockBusinessUnits));
        
        const mockUnit = mockBusinessUnits[businessUnitId]
        if (mockUnit) {
          console.log("Using mock data for business unit:", mockUnit);
          setUnit(mockUnit)
        } else {
          console.error(`Business unit with ID ${businessUnitId} not found in mock data`);
          // You could redirect to a 404 page or show an error message
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchBusinessUnit()
  }, [businessUnitId])

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (!unit) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold mb-4">Business Unit Not Found</h2>
        <p className="mb-6">The business unit you are looking for does not exist or you do not have access to it.</p>
        <Button onClick={() => router.push("/admin/business-units/manage")}>
          Return to Business Units
        </Button>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BackButton fallbackPath="/admin/business-units/manage" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold tracking-tight">{unit.name}</h2>
                <Badge variant={unit.status === "active" ? "default" : "secondary"}>
                  {unit.status}
                </Badge>
              </div>
              <p className="text-muted-foreground">
                {unit.brand} • {formatLocation(unit.location)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/admin/business-units/${unit.id}/edit`}>
              <Button variant="outline" size="sm" className="gap-1">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            </Link>
            <Button variant="destructive" size="sm" className="gap-1">
              <Trash className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rooms</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{unit.details.rooms}</div>
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
                <div className="text-2xl font-bold">{unit.details.teams}</div>
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
                <div className="text-2xl font-bold">{unit.details.members}</div>
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
                <div className="text-2xl font-bold">{unit.location.city}</div>
                <p className="text-xs text-muted-foreground">
                  {unit.location.country}
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <div className="font-medium">Email</div>
                  <div>{unit.contact.email}</div>
                </div>
                <div>
                  <div className="font-medium">Phone</div>
                  <div>{unit.contact.phone}</div>
                </div>
                <div>
                  <div className="font-medium">Address</div>
                  <div>{unit.contact.address}</div>
                </div>
                <div>
                  <div className="font-medium">Head Manager</div>
                  <div>{unit.head}</div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Email Notifications</div>
                  <Badge variant={unit.settings.notifications.email ? "default" : "outline"}>
                    {unit.settings.notifications.email ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-medium">Slack Notifications</div>
                  <Badge variant={unit.settings.notifications.slack ? "default" : "outline"}>
                    {unit.settings.notifications.slack ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-medium">Webhook Notifications</div>
                  <Badge variant={unit.settings.notifications.webhook ? "default" : "outline"}>
                    {unit.settings.notifications.webhook ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                <div>
                  <div className="font-medium mt-2">Active Integrations</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {unit.settings.integrations.enabled.length > 0 ? (
                      unit.settings.integrations.enabled.map((integration, index) => (
                        <Badge key={index} variant="secondary">{integration}</Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground text-sm">No active integrations</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
            </CardHeader>
            <CardContent>
              <BusinessUnitUsers businessUnitId={unit.id} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="configuration">
          <Card>
            <CardHeader>
              <CardTitle>Database Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="font-medium">Database Type</div>
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-muted-foreground" />
                    {unit.configuration.database.type}
                  </div>
                </div>
                <div>
                  <div className="font-medium">Database Name</div>
                  <div>{unit.configuration.database.name}</div>
                </div>
                <div>
                  <div className="font-medium">Database Host</div>
                  <div>{unit.configuration.database.host}</div>
                </div>
                <div>
                  <div className="font-medium">Cluster</div>
                  <div>{unit.configuration.cluster.name}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
            </CardHeader>
            <CardContent>
              {unit.reports && unit.reports.length > 0 ? (
                <div>Reports list will be displayed here</div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No reports available for this business unit</p>
                  <Button className="mt-4">Generate Report</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 
