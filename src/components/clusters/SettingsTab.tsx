"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

export function SettingsTab() {
  const [settings, setSettings] = useState({
    name: "APAC Cluster",
    region: "apac",
    twoFactorAuth: false,
    ipRestrictions: false,
  })

  const handleChange = (field: string, value: string | boolean) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="space-y-6">
      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Cluster Name</Label>
              <Input
                id="name"
                value={settings.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <Select
                value={settings.region}
                onValueChange={(value) => handleChange("region", value)}
              >
                <SelectTrigger id="region">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apac">Asia Pacific</SelectItem>
                  <SelectItem value="emea">Europe, Middle East, Africa</SelectItem>
                  <SelectItem value="americas">Americas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Two-Factor Authentication</Label>
              <div className="text-sm text-muted-foreground">
                Require 2FA for all users in this cluster
              </div>
            </div>
            <Switch
              checked={settings.twoFactorAuth}
              onCheckedChange={(checked) => handleChange("twoFactorAuth", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>IP Restrictions</Label>
              <div className="text-sm text-muted-foreground">
                Limit access to specific IP ranges
              </div>
            </div>
            <Switch
              checked={settings.ipRestrictions}
              onCheckedChange={(checked) => handleChange("ipRestrictions", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={() => console.log("Saving settings:", settings)}>
          Save Changes
        </Button>
      </div>
    </div>
  )
} 