"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface Module {
  id: string
  name: string
  description: string
  status: "active" | "inactive"
  plans: string[]
}

const mockModules: Module[] = [
  {
    id: "mod_1",
    name: "Inventory Management",
    description: "Track and manage inventory across business units",
    status: "active",
    plans: ["Basic", "Professional", "Enterprise"]
  },
  {
    id: "mod_2",
    name: "Procurement",
    description: "Streamline purchasing and vendor management",
    status: "active",
    plans: ["Professional", "Enterprise"]
  },
  {
    id: "mod_3",
    name: "Order Tracking",
    description: "Monitor order status and fulfillment",
    status: "active",
    plans: ["Basic", "Professional", "Enterprise"]
  },
  {
    id: "mod_4",
    name: "Demand Forecasting",
    description: "Predict future inventory needs based on historical data",
    status: "inactive",
    plans: ["Enterprise"]
  },
  {
    id: "mod_5",
    name: "Supplier Management",
    description: "Manage supplier relationships and performance",
    status: "active",
    plans: ["Professional", "Enterprise"]
  },
  {
    id: "mod_6",
    name: "Advanced Analytics",
    description: "Gain insights with advanced reporting and analytics",
    status: "inactive",
    plans: ["Enterprise"]
  }
]

export default function SubscriptionModulesPage() {
  const [modules, setModules] = useState<Module[]>(mockModules)

  const handleToggleStatus = (moduleId: string) => {
    setModules(prev => prev.map(mod => 
      mod.id === moduleId ? {
        ...mod,
        status: mod.status === "active" ? "inactive" : "active"
      } : mod
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Subscription Modules</h2>
          <p className="text-muted-foreground">
            Manage modules available in subscription plans
          </p>
        </div>
        <Button>Add Module</Button>
      </div>

      <div className="grid gap-4">
        {modules.map((module) => (
          <Card key={module.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-lg font-bold">{module.name}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor={`module-${module.id}`} className="sr-only">
                  Toggle module status
                </Label>
                <Switch
                  id={`module-${module.id}`}
                  checked={module.status === "active"}
                  onCheckedChange={() => handleToggleStatus(module.id)}
                />
                <Badge variant={module.status === "active" ? "default" : "secondary"}>
                  {module.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <div className="text-sm text-muted-foreground">Available in plans:</div>
                {module.plans.map((plan) => (
                  <Badge key={plan} variant="outline">{plan}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 