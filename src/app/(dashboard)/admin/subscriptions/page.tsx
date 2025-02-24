"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"

interface Subscription {
  id: string
  businessUnit: string
  plan: string
  users: number
  maxUsers: number
  status: "active" | "inactive"
  nextBilling: string
  amount: number
}

const mockSubscriptions: Subscription[] = [
  {
    id: "sub_1",
    businessUnit: "Grand Hotel Singapore",
    plan: "Professional Supply Chain",
    users: 180,
    maxUsers: 200,
    status: "active",
    nextBilling: "2025-03-21",
    amount: 499
  },
  {
    id: "sub_2",
    businessUnit: "Luxury Resort Bali",
    plan: "Enterprise Supply Chain",
    users: 450,
    maxUsers: 1000,
    status: "active",
    nextBilling: "2025-03-15",
    amount: 999
  },
  {
    id: "sub_3",
    businessUnit: "Boutique Hotel Bangkok",
    plan: "Basic Supply Chain",
    users: 45,
    maxUsers: 50,
    status: "inactive",
    nextBilling: "2025-03-10",
    amount: 199
  }
]

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(mockSubscriptions)

  const handleUpdateMaxUsers = (subscriptionId: string, newMaxUsers: number) => {
    setSubscriptions(prev => prev.map(sub => 
      sub.id === subscriptionId ? { ...sub, maxUsers: newMaxUsers } : sub
    ))
  }

  const handleToggleStatus = (subscriptionId: string) => {
    setSubscriptions(prev => prev.map(sub => 
      sub.id === subscriptionId ? {
        ...sub,
        status: sub.status === "active" ? "inactive" : "active"
      } : sub
    ))
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
        <Button>Add Subscription</Button>
      </div>

      <div className="grid gap-4">
        {subscriptions.map((subscription) => (
          <Card key={subscription.id}>
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
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>User Allocation</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min={subscription.users}
                          value={subscription.maxUsers}
                          className="w-32"
                          onChange={(e) => handleUpdateMaxUsers(subscription.id, Number(e.target.value))}
                        />
                        <span className="text-sm text-muted-foreground">max users</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/settings/subscription?id=${subscription.id}`}>
                        <Button variant="outline" size="sm">Manage</Button>
                      </Link>
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

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Current Usage</span>
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
                    {subscription.users / subscription.maxUsers > 0.8 && (
                      <p className="text-sm text-yellow-600">
                        Approaching user limit. Consider increasing allocation.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
