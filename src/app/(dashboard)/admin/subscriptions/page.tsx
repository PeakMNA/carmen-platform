"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, ChevronDown, ChevronUp, Plus, ArrowRight } from "lucide-react"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface Subscription {
  id: string
  businessUnitId: string
  businessUnit: string
  plan: string
  users: number
  maxUsers: number
  status: "active" | "inactive"
  nextBilling: string
  amount: number
  activeModules: string[]
  buStaffCount: number
  buStaffMax: number
  clusterUserCount: number
  clusterUserMax: number
  clusters: { id: string; name: string; users: number }[]
}

// Mock user data for license management
interface User {
  id: string
  name: string
  email: string
  role: string
  type: "bu_staff" | "cluster_user"
  businessUnit: string
  modules: string[]
}

const mockUsers: User[] = [
  {
    id: "user_1",
    name: "John Smith",
    email: "john.smith@example.com",
    role: "Manager",
    type: "bu_staff",
    businessUnit: "Grand Hotel Singapore",
    modules: ["accounting", "inventory"]
  },
  {
    id: "user_2",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    role: "Accountant",
    type: "bu_staff",
    businessUnit: "Grand Hotel Singapore",
    modules: ["accounting"]
  },
  {
    id: "user_3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    role: "Inventory Manager",
    type: "bu_staff",
    businessUnit: "Grand Hotel Singapore",
    modules: ["inventory"]
  },
  {
    id: "user_4",
    name: "Alice Brown",
    email: "alice.brown@example.com",
    role: "Regional Manager",
    type: "cluster_user",
    businessUnit: "Grand Hotel Singapore",
    modules: ["accounting", "inventory", "analytics"]
  },
  {
    id: "user_5",
    name: "Tom Wilson",
    email: "tom.wilson@example.com",
    role: "Finance Director",
    type: "cluster_user",
    businessUnit: "Grand Hotel Singapore",
    modules: ["accounting", "analytics"]
  }
]

const mockSubscriptions: Subscription[] = [
  {
    id: "sub_1",
    businessUnitId: "BU-1234",
    businessUnit: "Grand Hotel Singapore",
    plan: "Professional Supply Chain",
    users: 180,
    maxUsers: 200,
    status: "active",
    nextBilling: "2025-03-21",
    amount: 499,
    activeModules: ["accounting", "inventory", "analytics"],
    buStaffCount: 100,
    buStaffMax: 150,
    clusterUserCount: 80,
    clusterUserMax: 100,
    clusters: [
      { id: "cluster-1", name: "City Properties", users: 50 },
      { id: "cluster-2", name: "All Properties", users: 30 }
    ]
  },
  {
    id: "sub_2",
    businessUnitId: "BU-1235",
    businessUnit: "Luxury Resort Bali",
    plan: "Enterprise Supply Chain",
    users: 450,
    maxUsers: 1000,
    status: "active",
    nextBilling: "2025-03-15",
    amount: 999,
    activeModules: ["accounting", "inventory", "sales", "analytics", "pms", "hr"],
    buStaffCount: 200,
    buStaffMax: 300,
    clusterUserCount: 250,
    clusterUserMax: 500,
    clusters: [
      { id: "cluster-3", name: "Resort Properties", users: 150 },
      { id: "cluster-2", name: "All Properties", users: 100 }
    ]
  },
  {
    id: "sub_3",
    businessUnitId: "BU-1236",
    businessUnit: "Boutique Hotel Bangkok",
    plan: "Basic Supply Chain",
    users: 45,
    maxUsers: 50,
    status: "inactive",
    nextBilling: "2025-03-10",
    amount: 199,
    activeModules: ["accounting", "sales", "pms"],
    buStaffCount: 20,
    buStaffMax: 30,
    clusterUserCount: 25,
    clusterUserMax: 30,
    clusters: [
      { id: "cluster-4", name: "Boutique Properties", users: 25 }
    ]
  }
]

// New user form interface
interface NewUserForm {
  name: string
  email: string
  role: string
  type: "bu_staff" | "cluster_user"
  modules: string[]
}

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(mockSubscriptions)
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null)
  const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<string | null>(null)
  const [users, setUsers] = useState<User[]>(mockUsers)
  
  // New user dialog state
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false)
  const [newUserType, setNewUserType] = useState<"bu_staff" | "cluster_user">("bu_staff")
  const [newUserForm, setNewUserForm] = useState<NewUserForm>({
    name: "",
    email: "",
    role: "",
    type: "bu_staff",
    modules: []
  })
  
  // License limits editing state
  const [isEditingLimits, setIsEditingLimits] = useState(false)
  const [editedSubscription, setEditedSubscription] = useState<Subscription | null>(null)
  const [expiryDate, setExpiryDate] = useState<string>("")
  
  // Module management state
  const [isEditingModules, setIsEditingModules] = useState(false)
  const [availableModules] = useState([
    "accounting", "inventory", "sales", "analytics", "pms", "hr"
  ])

  const handleToggleStatus = (subscriptionId: string) => {
    setSubscriptions(subscriptions.map(sub => {
      if (sub.id === subscriptionId) {
        return {
          ...sub,
          status: sub.status === "active" ? "inactive" : "active"
        }
      }
      return sub
    }))
  }

  const handleSelectSubscription = (subscription: Subscription) => {
    if (expandedSubscriptionId === subscription.id) {
      // If already expanded, collapse it
      setExpandedSubscriptionId(null)
      setSelectedSubscription(null)
    } else {
      // Otherwise, expand it
      setExpandedSubscriptionId(subscription.id)
      setSelectedSubscription(subscription)
    }
  }

  const handleHideDetails = () => {
    setExpandedSubscriptionId(null)
    setSelectedSubscription(null)
  }

  const handleAddUser = (type: "bu_staff" | "cluster_user") => {
    setNewUserType(type)
    setNewUserForm({
      name: "",
      email: "",
      role: "",
      type: type,
      modules: []
    })
    setIsAddUserDialogOpen(true)
  }

  const handleSaveNewUser = () => {
    if (!selectedSubscription) return

    // Validate form
    if (!newUserForm.name || !newUserForm.email || !newUserForm.role) {
      alert("Please fill in all required fields")
      return
    }

    // Create new user
    const newUser: User = {
      id: `user_${Date.now()}`,
      name: newUserForm.name,
      email: newUserForm.email,
      role: newUserForm.role,
      type: newUserForm.type,
      businessUnit: selectedSubscription.businessUnit,
      modules: newUserForm.modules
    }

    // Add user to the list
    setUsers([...users, newUser])

    // Update subscription counts
    setSubscriptions(subscriptions.map(sub => {
      if (sub.id === selectedSubscription.id) {
        return {
          ...sub,
          users: sub.users + 1,
          buStaffCount: newUserForm.type === "bu_staff" ? sub.buStaffCount + 1 : sub.buStaffCount,
          clusterUserCount: newUserForm.type === "cluster_user" ? sub.clusterUserCount + 1 : sub.clusterUserCount
        }
      }
      return sub
    }))

    // Close dialog
    setIsAddUserDialogOpen(false)
  }

  const handleModuleToggle = (module: string) => {
    if (newUserForm.modules.includes(module)) {
      setNewUserForm({
        ...newUserForm,
        modules: newUserForm.modules.filter(m => m !== module)
      })
    } else {
      setNewUserForm({
        ...newUserForm,
        modules: [...newUserForm.modules, module]
      })
    }
  }

  const filteredUsers = users.filter(user => 
    selectedSubscription && user.businessUnit === selectedSubscription.businessUnit
  )

  const buStaffUsers = filteredUsers.filter(user => user.type === "bu_staff")
  const clusterUsers = filteredUsers.filter(user => user.type === "cluster_user")

  const handleEditLimits = (subscription: Subscription) => {
    setEditedSubscription({...subscription})
    setExpiryDate(subscription.nextBilling)
    setIsEditingLimits(true)
  }

  const handleSaveLimits = () => {
    if (!editedSubscription) return
    
    setSubscriptions(subscriptions.map(sub => 
      sub.id === editedSubscription.id ? editedSubscription : sub
    ))
    
    setIsEditingLimits(false)
    setEditedSubscription(null)
    
    // If we're editing the currently selected subscription, update it
    if (selectedSubscription && selectedSubscription.id === editedSubscription.id) {
      setSelectedSubscription(editedSubscription)
    }
  }

  const handleEditModules = (subscription: Subscription) => {
    setEditedSubscription({...subscription})
    setIsEditingModules(true)
  }

  const handleModuleActivationToggle = (module: string) => {
    if (!editedSubscription) return
    
    const updatedModules = editedSubscription.activeModules.includes(module)
      ? editedSubscription.activeModules.filter(m => m !== module)
      : [...editedSubscription.activeModules, module]
    
    setEditedSubscription({
      ...editedSubscription,
      activeModules: updatedModules
    })
  }

  const handleSaveModules = () => {
    if (!editedSubscription) return
    
    setSubscriptions(subscriptions.map(sub => 
      sub.id === editedSubscription.id ? editedSubscription : sub
    ))
    
    setIsEditingModules(false)
    
    // If we're editing the currently selected subscription, update it
    if (selectedSubscription && selectedSubscription.id === editedSubscription.id) {
      setSelectedSubscription(editedSubscription)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Subscriptions</h2>
          <p className="text-muted-foreground">
            Manage subscriptions across business units
          </p>
        </div>
        <div className="flex gap-2">
          <Button>Add Subscription</Button>
        </div>
      </div>

      <Tabs value="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4">
            {subscriptions.map((subscription) => (
              <div key={subscription.id} className="space-y-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-bold">
                      {subscription.businessUnit}
                    </CardTitle>
                    <Badge variant={subscription.status === "active" ? "default" : "secondary"}>
                      {subscription.status}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Plan Details</span>
                        </div>
                        <div className="grid gap-2">
                          <div className="text-sm text-muted-foreground">{subscription.plan}</div>
                          <div className="text-sm font-medium">${subscription.amount}/month</div>
                          <div className="text-sm text-muted-foreground">
                            Next billing: {new Date(subscription.nextBilling).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <span className="text-sm font-medium">Active Modules</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {subscription.activeModules.map(module => (
                              <Badge key={module} variant="outline" className="capitalize">
                                {module}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <span className="text-sm font-medium">Clusters</span>
                          <div className="space-y-2 mt-1">
                            {subscription.clusters.map(cluster => (
                              <div key={cluster.id} className="flex items-center justify-between text-sm">
                                <span>{cluster.name}</span>
                                <Badge variant="secondary" className="text-xs">
                                  {cluster.users} users
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>License Management</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleSelectSubscription(subscription)}
                            >
                              {expandedSubscriptionId === subscription.id ? (
                                <span className="flex items-center">
                                  Hide Details <ChevronUp className="ml-1 h-4 w-4" />
                                </span>
                              ) : (
                                <span className="flex items-center">
                                  Manage Licenses <ChevronDown className="ml-1 h-4 w-4" />
                                </span>
                              )}
                            </Button>
                            {subscription.status === 'active' ? (
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => {
                                  if (confirm('Are you sure you want to deactivate this business unit?')) {
                                    handleToggleStatus(subscription.id)
                                  }
                                }}
                              >
                                Deactivate
                              </Button>
                            ) : (
                              <Button 
                                variant="default" 
                                size="sm"
                                onClick={() => handleToggleStatus(subscription.id)}
                              >
                                Activate
                              </Button>
                            )}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Total Users</span>
                              <span>
                                {subscription.users} of {subscription.maxUsers} users
                              </span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div 
                                className="h-2 rounded-full bg-primary" 
                                style={{ width: `${(subscription.users / subscription.maxUsers) * 100}%` }}
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">BU Staff</span>
                              <span>
                                {subscription.buStaffCount} of {subscription.buStaffMax}
                              </span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div 
                                className="h-2 rounded-full bg-primary" 
                                style={{ width: `${(subscription.buStaffCount / subscription.buStaffMax) * 100}%` }}
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Cluster Users</span>
                              <span>
                                {subscription.clusterUserCount} of {subscription.clusterUserMax}
                              </span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div 
                                className="h-2 rounded-full bg-primary" 
                                style={{ width: `${(subscription.clusterUserCount / subscription.clusterUserMax) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {expandedSubscriptionId === subscription.id && (
                  <Card>
                    <CardHeader>
                      <CardTitle>License Management for {subscription.businessUnit}</CardTitle>
                      <CardDescription>
                        Manage user licenses and module access for this business unit
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* License Limits Section */}
                        <Card className="border border-dashed">
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg font-medium">License Limits & Expiry</CardTitle>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleEditLimits(subscription)}
                              >
                                Edit Limits
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="text-sm font-medium mb-2">User Limits</h4>
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">BU Staff Limit:</span>
                                    <span className="font-medium">{subscription.buStaffMax} users</span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Cluster User Limit:</span>
                                    <span className="font-medium">{subscription.clusterUserMax} users</span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Total User Limit:</span>
                                    <span className="font-medium">{subscription.maxUsers} users</span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-2">License Expiry</h4>
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Next Billing Date:</span>
                                    <span className="font-medium">{new Date(subscription.nextBilling).toLocaleDateString()}</span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">License Status:</span>
                                    <Badge variant={subscription.status === "active" ? "default" : "secondary"}>
                                      {subscription.status}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Days Remaining:</span>
                                    <span className="font-medium">
                                      {Math.ceil((new Date(subscription.nextBilling).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Module Licenses Section */}
                        <Card className="border border-dashed">
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg font-medium">Module Licenses</CardTitle>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleEditModules(subscription)}
                              >
                                Edit Modules
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div>
                                <h4 className="text-sm font-medium mb-2">Active Modules</h4>
                                <div className="flex flex-wrap gap-2">
                                  {subscription.activeModules.map(module => (
                                    <Badge key={module} className="capitalize">
                                      {module}
                                    </Badge>
                                  ))}
                                  {subscription.activeModules.length === 0 && (
                                    <span className="text-sm text-muted-foreground">No active modules</span>
                                  )}
                                </div>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-2">Module Distribution</h4>
                                <div className="grid grid-cols-3 gap-2">
                                  {subscription.activeModules.map(module => {
                                    const moduleUsers = filteredUsers.filter(user => 
                                      user.modules.includes(module)
                                    )
                                    const buStaffCount = moduleUsers.filter(u => u.type === "bu_staff").length
                                    const clusterUserCount = moduleUsers.filter(u => u.type === "cluster_user").length
                                    
                                    return (
                                      <div key={module} className="border rounded-md p-2">
                                        <div className="font-medium capitalize">{module}</div>
                                        <div className="text-xs text-muted-foreground">
                                          {buStaffCount} BU Staff, {clusterUserCount} Cluster Users
                                        </div>
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-medium">Business Unit Staff ({buStaffUsers.length}/{subscription.buStaffMax})</h3>
                            <Button 
                              size="sm" 
                              onClick={() => handleAddUser("bu_staff")}
                              className="flex items-center gap-1"
                            >
                              <Plus className="h-4 w-4" /> Add Business Unit Staff
                            </Button>
                          </div>
                          <div className="rounded-md border">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-muted/50">
                                <tr>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Role</th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Modules</th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {buStaffUsers.length === 0 ? (
                                  <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center text-sm text-muted-foreground">
                                      No BU Staff users found. Click &quot;Add BU Staff&quot; to add a new user.
                                    </td>
                                  </tr>
                                ) : (
                                  buStaffUsers.map((user) => (
                                    <tr key={user.id}>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium">{user.name}</div>
                                        <div className="text-sm text-muted-foreground">{user.email}</div>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm">{user.role}</td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-wrap gap-1">
                                          {user.modules.map(module => (
                                            <Badge key={module} variant="outline" className="capitalize">
                                              {module}
                                            </Badge>
                                          ))}
                                        </div>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <Button variant="outline" size="sm">Edit</Button>
                                      </td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-medium">Cluster Users ({clusterUsers.length}/{subscription.clusterUserMax})</h3>
                            <Button 
                              size="sm" 
                              onClick={() => handleAddUser("cluster_user")}
                              className="flex items-center gap-1"
                            >
                              <Plus className="h-4 w-4" /> Add Cluster User
                            </Button>
                          </div>
                          <div className="rounded-md border">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-muted/50">
                                <tr>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Role</th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Modules</th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {clusterUsers.length === 0 ? (
                                  <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center text-sm text-muted-foreground">
                                      No Cluster users found. Click &quot;Add Cluster User&quot; to add a new user.
                                    </td>
                                  </tr>
                                ) : (
                                  clusterUsers.map((user) => (
                                    <tr key={user.id}>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium">{user.name}</div>
                                        <div className="text-sm text-muted-foreground">{user.email}</div>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm">{user.role}</td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-wrap gap-1">
                                          {user.modules.map(module => (
                                            <Badge key={module} variant="outline" className="capitalize">
                                              {module}
                                            </Badge>
                                          ))}
                                        </div>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <Button variant="outline" size="sm">Edit</Button>
                                      </td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-lg font-medium mb-2">Advanced Configuration</h3>
                            <div className="space-y-2">
                              <Link href={`/admin/business-units/${subscription.businessUnitId}`}>
                                <Button variant="outline" className="w-full justify-between">
                                  Configure Business Unit
                                  <ArrowRight className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Link href={`/admin/business-units/${subscription.businessUnitId}/edit`}>
                                <Button variant="outline" className="w-full justify-between">
                                  Edit Business Unit
                                  <ArrowRight className="h-4 w-4" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-lg font-medium mb-2">Related Clusters</h3>
                            <div className="space-y-2">
                              {subscription.clusters.map(cluster => (
                                <Link key={cluster.id} href={`/admin/clusters/${cluster.id}`}>
                                  <Button variant="outline" className="w-full justify-between">
                                    {cluster.name}
                                    <ArrowRight className="h-4 w-4" />
                                  </Button>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <Button 
                            variant="outline" 
                            onClick={handleHideDetails}
                          >
                            Close
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add {newUserType === "bu_staff" ? "BU Staff" : "Cluster User"}</DialogTitle>
            <DialogDescription>
              Add a new {newUserType === "bu_staff" ? "BU Staff" : "Cluster User"} to {selectedSubscription?.businessUnit}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newUserForm.name}
                onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={newUserForm.email}
                onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Input
                id="role"
                value={newUserForm.role}
                onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Modules
              </Label>
              <div className="col-span-3 flex flex-wrap gap-2">
                {selectedSubscription?.activeModules.map(module => (
                  <Badge 
                    key={module} 
                    variant={newUserForm.modules.includes(module) ? "default" : "outline"} 
                    className="capitalize cursor-pointer"
                    onClick={() => handleModuleToggle(module)}
                  >
                    {module}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNewUser}>
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add new dialog for editing license limits */}
      <Dialog open={isEditingLimits} onOpenChange={setIsEditingLimits}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit License Limits & Expiry</DialogTitle>
            <DialogDescription>
              Update user limits and license expiration for {editedSubscription?.businessUnit}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="buStaffMax">BU Staff Limit</Label>
                <Input
                  id="buStaffMax"
                  type="number"
                  value={editedSubscription?.buStaffMax || 0}
                  onChange={(e) => setEditedSubscription(prev => prev ? {
                    ...prev,
                    buStaffMax: parseInt(e.target.value),
                    maxUsers: parseInt(e.target.value) + (prev.clusterUserMax || 0)
                  } : null)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clusterUserMax">Cluster User Limit</Label>
                <Input
                  id="clusterUserMax"
                  type="number"
                  value={editedSubscription?.clusterUserMax || 0}
                  onChange={(e) => setEditedSubscription(prev => prev ? {
                    ...prev,
                    clusterUserMax: parseInt(e.target.value),
                    maxUsers: (prev.buStaffMax || 0) + parseInt(e.target.value)
                  } : null)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiryDate">License Expiry Date</Label>
              <Input
                id="expiryDate"
                type="date"
                value={expiryDate.split('T')[0]}
                onChange={(e) => {
                  setExpiryDate(e.target.value)
                  setEditedSubscription(prev => prev ? {
                    ...prev,
                    nextBilling: e.target.value
                  } : null)
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">License Status</Label>
              <Select 
                value={editedSubscription?.status || "active"}
                onValueChange={(value) => setEditedSubscription(prev => prev ? {
                  ...prev,
                  status: value as "active" | "inactive"
                } : null)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditingLimits(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveLimits}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add new dialog for editing modules */}
      <Dialog open={isEditingModules} onOpenChange={setIsEditingModules}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Module Licenses</DialogTitle>
            <DialogDescription>
              Activate or deactivate modules for {editedSubscription?.businessUnit}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <Label className="mb-2 block">Available Modules</Label>
                <div className="grid grid-cols-2 gap-3">
                  {availableModules.map(module => (
                    <div 
                      key={module} 
                      className={cn(
                        "flex items-center justify-between border rounded-md p-3 cursor-pointer transition-colors",
                        editedSubscription?.activeModules.includes(module) 
                          ? "bg-primary/10 border-primary" 
                          : "bg-background hover:bg-muted/50"
                      )}
                      onClick={() => handleModuleActivationToggle(module)}
                    >
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-4 h-4 rounded-full",
                          editedSubscription?.activeModules.includes(module) 
                            ? "bg-primary" 
                            : "bg-muted"
                        )} />
                        <span className="capitalize">{module}</span>
                      </div>
                      {editedSubscription?.activeModules.includes(module) && (
                        <Badge variant="outline" className="ml-auto">Active</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label className="mb-2 block">Selected Modules</Label>
                <div className="flex flex-wrap gap-2 p-3 border rounded-md min-h-[60px]">
                  {editedSubscription?.activeModules.map(module => (
                    <Badge 
                      key={module} 
                      className="capitalize"
                      variant="secondary"
                    >
                      {module}
                    </Badge>
                  ))}
                  {!editedSubscription?.activeModules.length && (
                    <span className="text-sm text-muted-foreground">No modules selected</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditingModules(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveModules}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
