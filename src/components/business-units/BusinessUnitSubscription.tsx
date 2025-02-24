"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Users } from "lucide-react"
import { useState } from "react"

interface BusinessUnitSubscriptionProps {
  currentUsers: number
  maxUsers: number
  onUpdateLimits: (maxUsers: number) => void
}

export function BusinessUnitSubscription({
  currentUsers,
  maxUsers,
  onUpdateLimits
}: BusinessUnitSubscriptionProps) {
  const [newMaxUsers, setNewMaxUsers] = useState(maxUsers)
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    onUpdateLimits(newMaxUsers)
    setIsEditing(false)
  }

  const usagePercentage = (currentUsers / maxUsers) * 100
  const isNearLimit = usagePercentage >= 80

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            Subscription Limits
          </div>
          {!isEditing && (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              Configure
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>User Allocation</Label>
              <span className="text-sm text-muted-foreground">
                {currentUsers} of {maxUsers} users
              </span>
            </div>
            <Progress value={usagePercentage} />
            {isNearLimit && (
              <p className="text-sm text-yellow-600">
                Approaching user limit. Consider increasing allocation.
              </p>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="maxUsers">Maximum Users</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="maxUsers"
                    type="number"
                    min={currentUsers}
                    value={newMaxUsers}
                    onChange={(e) => setNewMaxUsers(Number(e.target.value))}
                  />
                  <Button onClick={handleSave}>Save</Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border p-4 space-y-2">
                <h4 className="font-medium">Subscription Tiers</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Basic: Up to 50 users</p>
                  <p>• Professional: Up to 200 users</p>
                  <p>• Enterprise: Unlimited users</p>
                </div>
              </div>

              <div className="rounded-lg border p-4 space-y-2">
                <h4 className="font-medium">Current Usage</h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Active Users</span>
                    <span>{currentUsers}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Available Slots</span>
                    <span>{maxUsers - currentUsers}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Utilization</span>
                    <span>{Math.round(usagePercentage)}%</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Active Users</div>
                  <div className="text-2xl font-bold">{currentUsers}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Available Slots</div>
                  <div className="text-2xl font-bold">{maxUsers - currentUsers}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Utilization</div>
                  <div className="text-2xl font-bold">{Math.round(usagePercentage)}%</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
