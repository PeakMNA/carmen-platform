"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, Edit, Plus, Trash, Users } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useParams } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  ModuleConfigurations, 
  AccountingConfig, 
  InventoryConfig, 
  SalesConfig,
  AnalyticsConfig,
  PMSConfig
} from "@/types/module-config"
import { CheckedState } from "@radix-ui/react-checkbox"

// Type guards for module configurations
function isAccountingConfig(config: unknown): config is AccountingConfig {
  return config !== undefined && 
         config !== null && 
         typeof config === 'object' && 
         'fiscalYearStart' in config && 
         'currencyCode' in config &&
         'secondaryCurrencies' in config &&
         'expirationDate' in config;
}

function isInventoryConfig(config: unknown): config is InventoryConfig {
  return config !== undefined && 
         config !== null && 
         typeof config === 'object' && 
         'trackingMethod' in config && 
         'lowStockThreshold' in config &&
         'autoReorderEnabled' in config &&
         'expirationDate' in config;
}

function isSalesConfig(config: unknown): config is SalesConfig {
  return config !== undefined && 
         config !== null && 
         typeof config === 'object' && 
         'commissionStructure' in config && 
         'discountApprovalThreshold' in config &&
         'quotaTrackingEnabled' in config &&
         'expirationDate' in config;
}

function isAnalyticsConfig(config: unknown): config is AnalyticsConfig {
  return config !== undefined && 
         config !== null && 
         typeof config === 'object' && 
         'dataSources' in config && 
         'dataRetentionPeriod' in config &&
         'expirationDate' in config;
}

function isPMSConfig(config: unknown): config is PMSConfig {
  return config !== undefined && 
         config !== null && 
         typeof config === 'object' && 
         'integrationPoints' in config &&
         'expirationDate' in config;
}

// Mock data for business units
const businessUnits = [
  {
    id: "bu-1",
    name: "Grand Hotel Berlin",
    status: "active",
    cluster: "European Hotels",
    modules: ["Accounting", "Inventory", "Sales"],
    buStaffLicenses: { total: 30, used: 22 },
    clusterUserLicenses: { total: 20, used: 15 },
    expirationDate: "2024-12-31",
    gracePeriod: 30,
    createdAt: "2023-01-15",
    location: "Berlin, Germany",
    contactEmail: "manager@grandhotelberlin.com",
    contactPhone: "+49 30 1234567",
    taxId: "DE123456789",
    moduleConfigurations: {
      Accounting: {
        fiscalYearStart: "2024-01-01",
        currencyCode: "EUR",
        secondaryCurrencies: ["USD", "GBP"],
        expirationDate: "2024-12-31"
      },
      Inventory: {
        trackingMethod: "FIFO",
        lowStockThreshold: 10,
        autoReorderEnabled: false,
        expirationDate: "2024-12-31"
      },
      Sales: {
        commissionStructure: "STANDARD",
        discountApprovalThreshold: 15,
        quotaTrackingEnabled: true,
        expirationDate: "2024-12-31"
      }
    } as ModuleConfigurations
  },
  {
    id: "bu-2",
    name: "Luxury Resort Paris",
    status: "active",
    cluster: "European Hotels",
    modules: ["Accounting", "Inventory", "Sales", "Analytics", "PMS"],
    buStaffLicenses: { total: 150, used: 98 },
    clusterUserLicenses: { total: 100, used: 67 },
    expirationDate: "2024-12-31",
    gracePeriod: 30,
    createdAt: "2023-02-20",
    location: "Paris, France",
    contactEmail: "manager@luxuryresortparis.com",
    contactPhone: "+33 1 2345678",
    taxId: "FR98765432",
    moduleConfigurations: {
      Accounting: {
        fiscalYearStart: "2024-01-01",
        currencyCode: "EUR",
        secondaryCurrencies: ["USD", "GBP"],
        expirationDate: "2024-12-31"
      },
      Inventory: {
        trackingMethod: "FIFO",
        lowStockThreshold: 15,
        autoReorderEnabled: true,
        expirationDate: "2024-12-31"
      },
      Sales: {
        commissionStructure: "TIERED",
        discountApprovalThreshold: 20,
        quotaTrackingEnabled: true,
        expirationDate: "2024-12-31"
      },
      Analytics: {
        dataSources: ["Accounting", "Inventory", "Sales"],
        dataRetentionPeriod: 24,
        expirationDate: "2024-12-31"
      },
      PMS: {
        integrationPoints: ["Booking.com", "Expedia"],
        expirationDate: "2024-12-31"
      }
    } as ModuleConfigurations
  }
]

// Mock data for available modules
const availableModules = [
  { id: "mod-1", name: "Accounting", description: "Financial management and reporting" },
  { id: "mod-2", name: "Inventory", description: "Stock and inventory management" },
  { id: "mod-3", name: "Sales", description: "Sales tracking and management" },
  { id: "mod-4", name: "Analytics", description: "Business intelligence and reporting" },
  { id: "mod-5", name: "PMS", description: "Property Management System" },
  { id: "mod-6", name: "HR", description: "Human Resources management" },
]

// Mock data for users
const users = [
  { id: "user-1", name: "John Smith", email: "john.smith@example.com", role: "Manager", status: "active", lastActive: "2023-10-15" },
  { id: "user-2", name: "Emma Johnson", email: "emma.johnson@example.com", role: "Accountant", status: "active", lastActive: "2023-10-14" },
  { id: "user-3", name: "Michael Brown", email: "michael.brown@example.com", role: "Inventory Manager", status: "active", lastActive: "2023-10-13" },
  { id: "user-4", name: "Sophia Davis", email: "sophia.davis@example.com", role: "Sales Representative", status: "active", lastActive: "2023-10-12" },
  { id: "user-5", name: "Robert Wilson", email: "robert.wilson@example.com", role: "Front Desk", status: "inactive", lastActive: "2023-09-30" },
]

export default function BusinessUnitDetailPage() {
  const params = useParams()
  const businessUnitId = params.id as string
  
  // Find the business unit data
  const businessUnit = businessUnits.find(bu => bu.id === businessUnitId) || businessUnits[0]
  
  const [selectedModules, setSelectedModules] = useState<string[]>(businessUnit.modules)
  
  // Function to toggle module selection
  const toggleModule = (moduleName: string) => {
    if (selectedModules.includes(moduleName)) {
      setSelectedModules(selectedModules.filter(m => m !== moduleName))
    } else {
      setSelectedModules([...selectedModules, moduleName])
    }
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/subscriptions/business-units">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{businessUnit.name}</h2>
            <p className="text-muted-foreground">
              Configure modules, licenses, and users for this business unit
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit Details
          </Button>
          <Button>Save Changes</Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-4">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Details</CardTitle>
                <Badge>{businessUnit.status === "active" ? "Active" : "Inactive"}</Badge>
              </div>
              <CardDescription>
                Business unit information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Location</div>
                <div className="font-medium">{businessUnit.location}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Contact</div>
                <div className="font-medium">{businessUnit.contactEmail}</div>
                <div className="text-sm">{businessUnit.contactPhone}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Tax ID</div>
                <div className="font-medium">{businessUnit.taxId}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Cluster</div>
                <div className="font-medium">{businessUnit.cluster}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Created</div>
                <div className="font-medium">{new Date(businessUnit.createdAt).toLocaleDateString()}</div>
              </div>
              <Separator />
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Expiration</div>
                <div className="font-medium">{new Date(businessUnit.expirationDate).toLocaleDateString()}</div>
                <div className="text-sm">{businessUnit.gracePeriod} days grace period</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                <CardTitle>License Allocation</CardTitle>
              </div>
              <CardDescription>
                Current license utilization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">BU Staff Licenses</span>
                  <span>{businessUnit.buStaffLicenses.used}/{businessUnit.buStaffLicenses.total}</span>
                </div>
                <Progress 
                  value={(businessUnit.buStaffLicenses.used / businessUnit.buStaffLicenses.total) * 100} 
                  className="h-2"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Cluster User Licenses</span>
                  <span>{businessUnit.clusterUserLicenses.used}/{businessUnit.clusterUserLicenses.total}</span>
                </div>
                <Progress 
                  value={(businessUnit.clusterUserLicenses.used / businessUnit.clusterUserLicenses.total) * 100} 
                  className="h-2"
                />
              </div>
              <div className="pt-2">
                <Button variant="outline" className="w-full">
                  Adjust License Allocation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-3">
          <Tabs defaultValue="modules">
            <TabsList className="mb-4">
              <TabsTrigger value="modules">Module Activation</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="expiration">Expiration</TabsTrigger>
            </TabsList>
            
            <TabsContent value="modules">
              <Card>
                <CardHeader>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                      <CardTitle>Module Activation</CardTitle>
                      <CardDescription>
                        Activate and configure modules for this business unit
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {availableModules.map((module) => {
                      const isActive = selectedModules.includes(module.name)
                      const moduleConfig = businessUnit.moduleConfigurations[module.name as keyof ModuleConfigurations]
                      
                      return (
                        <div key={module.id} className="rounded-lg border">
                          <div className="flex items-center justify-between p-4">
                            <div className="space-y-1">
                              <h3 className="font-medium">{module.name}</h3>
                              <div className="text-sm text-muted-foreground">
                                {module.description}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {isActive && moduleConfig && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div className="flex items-center">
                                        <Badge variant="outline" className="mr-2">
                                          Expires: {new Date(moduleConfig.expirationDate).toLocaleDateString()}
                                        </Badge>
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="text-xs">Module expiration date</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                              <Switch 
                                id={`module-${module.id}`} 
                                checked={isActive}
                                onCheckedChange={() => toggleModule(module.name)}
                              />
                            </div>
                          </div>
                          
                          {isActive && moduleConfig && (
                            <>
                              <Separator />
                              <div className="p-4 space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                  {module.name === "Accounting" && isAccountingConfig(moduleConfig) && (
                                    <>
                                      <div>
                                        <Label htmlFor="fiscal-year-start">Fiscal Year Start</Label>
                                        <Input 
                                          id="fiscal-year-start" 
                                          type="date" 
                                          defaultValue={moduleConfig.fiscalYearStart} 
                                        />
                                      </div>
                                      <div>
                                        <Label htmlFor="currency-code">Currency Code</Label>
                                        <Select defaultValue={moduleConfig.currencyCode}>
                                          <SelectTrigger id="currency-code">
                                            <SelectValue placeholder="Select currency" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="USD">USD - US Dollar</SelectItem>
                                            <SelectItem value="EUR">EUR - Euro</SelectItem>
                                            <SelectItem value="GBP">GBP - British Pound</SelectItem>
                                            <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </>
                                  )}
                                  
                                  {module.name === "Inventory" && isInventoryConfig(moduleConfig) && (
                                    <>
                                      <div>
                                        <Label htmlFor="tracking-method">Tracking Method</Label>
                                        <Select defaultValue={moduleConfig.trackingMethod}>
                                          <SelectTrigger id="tracking-method">
                                            <SelectValue placeholder="Select method" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="FIFO">FIFO</SelectItem>
                                            <SelectItem value="LIFO">LIFO</SelectItem>
                                            <SelectItem value="WEIGHTED_AVG">Weighted Average</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div>
                                        <Label htmlFor="low-stock-threshold">Low Stock Threshold (%)</Label>
                                        <Input 
                                          id="low-stock-threshold" 
                                          type="number" 
                                          defaultValue={moduleConfig.lowStockThreshold} 
                                        />
                                      </div>
                                      <div className="md:col-span-2 flex items-center space-x-2">
                                        <Checkbox 
                                          id="auto-reorder" 
                                          defaultChecked={moduleConfig.autoReorderEnabled as CheckedState} 
                                        />
                                        <Label htmlFor="auto-reorder">Enable automatic reordering</Label>
                                      </div>
                                    </>
                                  )}
                                  
                                  {module.name === "Sales" && isSalesConfig(moduleConfig) && (
                                    <>
                                      <div>
                                        <Label htmlFor="commission-structure">Commission Structure</Label>
                                        <Select defaultValue={moduleConfig.commissionStructure}>
                                          <SelectTrigger id="commission-structure">
                                            <SelectValue placeholder="Select structure" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="STANDARD">Standard</SelectItem>
                                            <SelectItem value="TIERED">Tiered</SelectItem>
                                            <SelectItem value="PROGRESSIVE">Progressive</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div>
                                        <Label htmlFor="discount-threshold">Discount Approval Threshold (%)</Label>
                                        <Input 
                                          id="discount-threshold" 
                                          type="number" 
                                          defaultValue={moduleConfig.discountApprovalThreshold} 
                                        />
                                      </div>
                                      <div className="md:col-span-2 flex items-center space-x-2">
                                        <Checkbox 
                                          id="quota-tracking" 
                                          defaultChecked={moduleConfig.quotaTrackingEnabled as CheckedState} 
                                        />
                                        <Label htmlFor="quota-tracking">Enable quota tracking</Label>
                                      </div>
                                    </>
                                  )}
                                  
                                  {module.name === "Analytics" && isAnalyticsConfig(moduleConfig) && (
                                    <>
                                      <div>
                                        <Label htmlFor="data-sources">Data Sources</Label>
                                        <Select defaultValue={moduleConfig.dataSources[0]}>
                                          <SelectTrigger id="data-sources">
                                            <SelectValue placeholder="Select data source" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="Accounting">Accounting</SelectItem>
                                            <SelectItem value="Inventory">Inventory</SelectItem>
                                            <SelectItem value="Sales">Sales</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div>
                                        <Label htmlFor="data-retention">Data Retention Period (months)</Label>
                                        <Input 
                                          id="data-retention" 
                                          type="number" 
                                          defaultValue={moduleConfig.dataRetentionPeriod} 
                                        />
                                      </div>
                                    </>
                                  )}
                                  
                                  {module.name === "PMS" && isPMSConfig(moduleConfig) && (
                                    <>
                                      <div className="md:col-span-2">
                                        <Label htmlFor="integration-points">Integration Points</Label>
                                        <Select defaultValue={moduleConfig.integrationPoints[0]}>
                                          <SelectTrigger id="integration-points">
                                            <SelectValue placeholder="Select integration point" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="Booking.com">Booking.com</SelectItem>
                                            <SelectItem value="Expedia">Expedia</SelectItem>
                                            <SelectItem value="Airbnb">Airbnb</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </>
                                  )}
                                  
                                  {/* Generic fields for all modules */}
                                  <div className="md:col-span-2">
                                    <Label htmlFor={`expiration-${module.id}`}>Module Expiration Date</Label>
                                    <Input 
                                      id={`expiration-${module.id}`} 
                                      type="date" 
                                      defaultValue={moduleConfig.expirationDate} 
                                    />
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                      <CardTitle>Business Unit Staff</CardTitle>
                      <CardDescription>
                        Manage users assigned to this business unit
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center">
                              <Badge variant="outline" className="mr-2">
                                {businessUnit.buStaffLicenses.used}/{businessUnit.buStaffLicenses.total} licenses used
                              </Badge>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">Number of BU staff licenses used out of total allocated</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add User
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Last Active</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-xs text-muted-foreground">{user.email}</div>
                            </TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>
                              <Badge variant={user.status === "active" ? "secondary" : "outline"}>
                                {user.status === "active" ? "Active" : "Inactive"}
                              </Badge>
                            </TableCell>
                            <TableCell>{new Date(user.lastActive).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                  <span className="sr-only">Edit</span>
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash className="h-4 w-4" />
                                  <span className="sr-only">Delete</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="expiration">
              <Card>
                <CardHeader>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                      <CardTitle>Expiration Settings</CardTitle>
                      <CardDescription>
                        Manage business unit and module expiration dates
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="bu-expiration">Business Unit Expiration Date</Label>
                      <div className="flex items-center gap-4 mt-2">
                        <Input 
                          id="bu-expiration" 
                          type="date" 
                          className="max-w-xs"
                          defaultValue={businessUnit.expirationDate} 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="grace-period">Grace Period (days)</Label>
                      <div className="flex items-center gap-4 mt-2">
                        <Input 
                          id="grace-period" 
                          type="number" 
                          className="max-w-xs"
                          defaultValue={businessUnit.gracePeriod} 
                        />
                      </div>
                    </div>
                    
                    <div className="rounded-md border p-4 bg-muted/50">
                      <h4 className="text-sm font-medium mb-2">Expiration Rules</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>When a Business Unit expires, all BU staff users lose access after the grace period</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>Expired Business Units remain visible but are marked as expired</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>Data is retained for 90 days after expiration</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>Module expiration dates can be set independently of the Business Unit expiration</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="pt-2">
                      <Button>Save Expiration Settings</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
} 