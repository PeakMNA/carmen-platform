"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Info, AlertCircle, Calendar, Users, Plus } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

// Mock plan data
const plans = [
  {
    id: "basic",
    name: "Basic",
    description: "For small hotel operations",
    price: 199,
    features: [
      "1 Business Unit",
      "Up to 30 BU Staff",
      "Up to 20 Cluster Users",
      "3 Modules included",
      "30-day grace period",
      "Standard support"
    ],
    modules: ["Accounting", "Inventory", "Sales", "Analytics", "PMS", "HR"],
    maxModules: 3
  },
  {
    id: "professional",
    name: "Professional",
    description: "For medium-sized hotel chains",
    price: 499,
    features: [
      "Up to 3 Business Units",
      "Up to 150 BU Staff per business unit",
      "Up to 100 Cluster Users",
      "All modules included",
      "30-day grace period",
      "Priority support"
    ],
    modules: ["Accounting", "Inventory", "Sales", "Analytics", "PMS", "HR"],
    maxModules: 6
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large hotel groups",
    price: 999,
    features: [
      "Unlimited Business Units",
      "Up to 300 BU Staff per business unit",
      "Up to 500 Cluster Users",
      "All modules with premium features",
      "Extended 60-day grace period",
      "24/7 dedicated support"
    ],
    modules: ["Accounting", "Inventory", "Sales", "Analytics", "PMS", "HR"],
    maxModules: 6
  }
]

export default function SubscriptionPlansPage() {
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null)
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false)
  const [configureOpen, setConfigureOpen] = useState(false)
  const [editPlanOpen, setEditPlanOpen] = useState(false)

  const handleViewDetails = (plan: typeof plans[0]) => {
    setSelectedPlan(plan)
    setViewDetailsOpen(true)
  }

  const handleConfigure = (plan: typeof plans[0]) => {
    setSelectedPlan(plan)
    setConfigureOpen(true)
  }

  const handleEditPlan = (plan: typeof plans[0]) => {
    setSelectedPlan(plan)
    setEditPlanOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Subscription Plans</h2>
          <p className="text-muted-foreground">
            Manage and configure subscription plans for your organization
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/subscriptions/business-units">
              Manage Business Units
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/subscriptions/clusters">
              Manage Clusters
            </Link>
          </Button>
          <Button>Create New Plan</Button>
        </div>
      </div>

      <Tabs defaultValue="plans">
        <TabsList className="mb-4">
          <TabsTrigger value="plans">Plan Tiers</TabsTrigger>
          <TabsTrigger value="details">Configuration Details</TabsTrigger>
          <TabsTrigger value="validation">License Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="plans">
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <Card key={plan.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{plan.name}</CardTitle>
                    <Badge>Active</Badge>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="text-3xl font-bold">${plan.price}</div>
                    <div className="text-sm text-muted-foreground">per business unit / month</div>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>{feature}</span>
                        {index === 2 && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="ml-1 h-3 w-3 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="w-[200px] text-xs">Cluster Users can access multiple business units within a cluster</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                        {index === 3 && plan.id === "basic" && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="ml-1 h-3 w-3 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="w-[200px] text-xs">Choose from: Accounting, Inventory, Sales, Analytics, PMS, HR</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="mt-6 w-full" 
                    onClick={() => handleEditPlan(plan)}
                  >
                    Edit Plan
                  </Button>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewDetails(plan)}
                  >
                    View Details
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleConfigure(plan)}
                  >
                    Configure
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="details">
          <div className="grid gap-6 md:grid-cols-1">
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  <CardTitle>Expiration and Grace Periods</CardTitle>
                </div>
                <CardDescription>How expiration and grace periods work</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <h3 className="font-medium mb-2">Business Unit Expiration</h3>
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
                    </ul>
                  </div>
                  
                  <div className="rounded-md border p-4">
                    <h3 className="font-medium mb-2">Cluster Expiration</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span>When a Cluster expires, all Cluster users lose access to associated Business Units</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span>Cluster expiration does not affect BU staff users</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span>Cluster expiration date is independent of Business Unit expiration dates</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="rounded-md border p-4">
                    <h3 className="font-medium mb-2">Module Expiration</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span>Modules can have independent expiration dates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span>When a module expires, all users lose access to that module</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="validation">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  <CardTitle>License Validation Rules</CardTitle>
                </div>
                <CardDescription>How license validation works</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <h3 className="font-medium mb-2">BU Staff License Rules</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span>Each BU staff user consumes exactly one staff license</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span>BU staff licenses are specific to a single Business Unit</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span>BU staff users cannot access other Business Units</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span>When a BU staff user is deactivated, their license is returned to the available pool</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="rounded-md border p-4">
                    <h3 className="font-medium mb-2">Cluster User License Rules</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span>Each Cluster user consumes exactly one cluster license</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span>Cluster user licenses are specific to a single Cluster</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span>Cluster users can access multiple Business Units within their assigned Cluster</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span>When a Cluster user is deactivated, their license is returned to the available pool</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5" />
                  <CardTitle>Error Handling and Notifications</CardTitle>
                </div>
                <CardDescription>How errors and notifications are handled</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <h3 className="font-medium mb-2">License Limit Exceeded</h3>
                    <div className="p-3 bg-red-50 text-red-800 rounded-md text-sm">
                      <p className="font-medium">License allocation exceeds subscription limit.</p>
                      <p className="mt-1">Current limit: [X]. Please reduce allocation or upgrade subscription.</p>
                    </div>
                  </div>
                  
                  <div className="rounded-md border p-4">
                    <h3 className="font-medium mb-2">Expiration Notifications</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-yellow-50 text-yellow-800 rounded-md text-sm">
                        <p className="font-medium">30 Days Before Expiration</p>
                        <p className="mt-1">Business Unit/Cluster [Name] will expire in 30 days on [Date].</p>
                      </div>
                      <div className="p-3 bg-orange-50 text-orange-800 rounded-md text-sm">
                        <p className="font-medium">15 Days Before Expiration</p>
                        <p className="mt-1">Business Unit/Cluster [Name] will expire in 15 days on [Date].</p>
                      </div>
                      <div className="p-3 bg-red-50 text-red-800 rounded-md text-sm">
                        <p className="font-medium">3 Days Before Expiration</p>
                        <p className="mt-1">Your access to [Business Unit/Cluster] will expire in 3 days on [Date].</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-md border p-4">
                    <h3 className="font-medium mb-2">License Utilization Notifications</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 text-blue-800 rounded-md text-sm">
                        <p className="font-medium">License Pool 80% Utilized</p>
                        <p className="mt-1">[Business Unit/Cluster] has reached 80% of allocated licenses.</p>
                      </div>
                      <div className="p-3 bg-yellow-50 text-yellow-800 rounded-md text-sm">
                        <p className="font-medium">License Pool 95% Utilized</p>
                        <p className="mt-1">[Business Unit/Cluster] has reached 95% of allocated licenses. New users may not be able to be added.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Subscription Formula</CardTitle>
            <CardDescription>How subscription pricing is calculated</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Our subscription pricing model is based on the following components:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <span className="font-medium mr-2">1.</span>
                <span>Number of Business Units</span>
              </li>
              <li className="flex items-center">
                <span className="font-medium mr-2">2.</span>
                <span>Number of Cluster Users (with access to multiple business units)</span>
              </li>
              <li className="flex items-center">
                <span className="font-medium mr-2">3.</span>
                <span>Number of BU Staff per Business Unit (with access to a single business unit)</span>
              </li>
              <li className="flex items-center">
                <span className="font-medium mr-2">4.</span>
                <span>Modules activated per Business Unit</span>
              </li>
            </ul>
            <p className="text-sm text-muted-foreground mt-4">
              Contact our sales team for custom pricing options or to discuss specific requirements for your hotel group.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* View Details Dialog */}
      <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedPlan?.name} Plan Details</DialogTitle>
            <DialogDescription>
              Comprehensive details about the {selectedPlan?.name} subscription plan
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">{selectedPlan?.name} Plan</h3>
                <p className="text-sm text-muted-foreground">{selectedPlan?.description}</p>
              </div>
              <Badge>Active</Badge>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium mb-2">Plan Features</h4>
                <ul className="space-y-2 text-sm">
                  {selectedPlan?.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Available Modules</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPlan?.modules.map((module) => (
                    <Badge key={module} variant="outline">{module}</Badge>
                  ))}
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Pricing</h4>
                  <div className="text-2xl font-bold">${selectedPlan?.price}</div>
                  <div className="text-sm text-muted-foreground">per business unit / month</div>
                </div>
              </div>
            </div>
            
            <div className="rounded-md border p-4 mt-4">
              <h4 className="text-sm font-medium mb-2">Additional Information</h4>
              <p className="text-sm text-muted-foreground">
                The {selectedPlan?.name} plan is designed for {selectedPlan?.description.toLowerCase()}. 
                It includes {selectedPlan?.id === "basic" ? "basic" : selectedPlan?.id === "professional" ? "professional" : "enterprise"} level 
                features and is suitable for {selectedPlan?.id === "basic" ? "small" : selectedPlan?.id === "professional" ? "medium-sized" : "large"} hotel operations.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDetailsOpen(false)}>Close</Button>
            <Button onClick={() => {
              setViewDetailsOpen(false);
              handleEditPlan(selectedPlan!);
            }}>Edit Plan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Configure Dialog */}
      <Dialog open={configureOpen} onOpenChange={setConfigureOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Configure {selectedPlan?.name} Plan</DialogTitle>
            <DialogDescription>
              Adjust settings and options for the {selectedPlan?.name} subscription plan
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Module Selection</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {selectedPlan?.id === "basic" 
                    ? `Select up to ${selectedPlan.maxModules} modules to include in this plan` 
                    : "All modules are included in this plan"}
                </p>
                
                <div className="grid gap-2">
                  {selectedPlan?.modules.map((module) => (
                    <div key={module} className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id={`module-${module}`} 
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked={selectedPlan.id !== "basic" || ["Accounting", "Inventory", "Sales"].includes(module)}
                        disabled={selectedPlan.id !== "basic"}
                      />
                      <label htmlFor={`module-${module}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {module}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">License Limits</h3>
                
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <label htmlFor="buStaffLimit" className="text-sm font-medium">
                      Business Unit Staff Limit
                    </label>
                    <input 
                      type="number" 
                      id="buStaffLimit" 
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      defaultValue={selectedPlan?.id === "basic" ? 30 : selectedPlan?.id === "professional" ? 150 : 300}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="clusterUserLimit" className="text-sm font-medium">
                      Cluster User Limit
                    </label>
                    <input 
                      type="number" 
                      id="clusterUserLimit" 
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      defaultValue={selectedPlan?.id === "basic" ? 20 : selectedPlan?.id === "professional" ? 100 : 500}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="gracePeriod" className="text-sm font-medium">
                      Grace Period (days)
                    </label>
                    <input 
                      type="number" 
                      id="gracePeriod" 
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      defaultValue={selectedPlan?.id === "enterprise" ? 60 : 30}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfigureOpen(false)}>Cancel</Button>
            <Button onClick={() => setConfigureOpen(false)}>Save Configuration</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Plan Dialog */}
      <Dialog open={editPlanOpen} onOpenChange={setEditPlanOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit {selectedPlan?.name} Plan</DialogTitle>
            <DialogDescription>
              Modify the details and settings of the {selectedPlan?.name} subscription plan
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="planName" className="text-sm font-medium">
                  Plan Name
                </label>
                <input 
                  type="text" 
                  id="planName" 
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue={selectedPlan?.name}
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="planDescription" className="text-sm font-medium">
                  Description
                </label>
                <input 
                  type="text" 
                  id="planDescription" 
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue={selectedPlan?.description}
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="planPrice" className="text-sm font-medium">
                  Price ($ per business unit / month)
                </label>
                <input 
                  type="number" 
                  id="planPrice" 
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue={selectedPlan?.price}
                />
              </div>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Plan Features</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Edit the features included in this plan
                </p>
                
                {selectedPlan?.features.map((feature, index) => (
                  <div key={index} className="grid gap-2 mt-2">
                    <input 
                      type="text" 
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      defaultValue={feature}
                    />
                  </div>
                ))}
                
                <Button variant="outline" size="sm" className="mt-2">
                  <Plus className="h-4 w-4 mr-1" /> Add Feature
                </Button>
              </div>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Status</h3>
                <select 
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="active"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditPlanOpen(false)}>Cancel</Button>
            <Button onClick={() => setEditPlanOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 