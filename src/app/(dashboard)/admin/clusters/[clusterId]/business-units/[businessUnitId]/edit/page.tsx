"use client"

import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"
import { BusinessUnit } from "@/types/tenant"
import { businessUnitService } from "@/services/businessUnitService"

export default function EditBusinessUnitPage() {
  const { clusterId, businessUnitId } = useParams()
  const router = useRouter()
  const [businessUnit, setBusinessUnit] = useState<BusinessUnit | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBusinessUnit = async () => {
      try {
        const unit = await businessUnitService.getBusinessUnit(businessUnitId as string)
        setBusinessUnit(unit)
      } catch (error) {
        console.error('Failed to load business unit:', error)
      } finally {
        setLoading(false)
      }
    }

    loadBusinessUnit()
  }, [businessUnitId])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!businessUnit) {
    return <div>Business unit not found</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Edit Business Unit</h2>
        <p className="text-muted-foreground">
          Update business unit information and configuration
        </p>
      </div>

      <form className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={businessUnit.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input id="brand" defaultValue={businessUnit.brand} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="head">Head</Label>
                <Input id="head" defaultValue={businessUnit.head} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={businessUnit.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
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
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" defaultValue={businessUnit.location.city} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" defaultValue={businessUnit.location.country} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Database Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="dbName">Database Name</Label>
                <Input id="dbName" defaultValue={businessUnit.configuration.database.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dbType">Database Type</Label>
                <Select defaultValue={businessUnit.configuration.database.type}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mysql">MySQL</SelectItem>
                    <SelectItem value="postgres">PostgreSQL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dbHost">Host</Label>
                <Input id="dbHost" defaultValue={businessUnit.configuration.database.host} />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button 
            variant="outline" 
            onClick={() => router.push(`/admin/clusters/${clusterId}/business-units`)}
          >
            Cancel
          </Button>
          <Button onClick={async () => {
            // TODO: Implement save functionality
            router.push(`/admin/clusters/${clusterId}/business-units`)
          }}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}
