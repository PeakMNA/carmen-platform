"use client"

import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { businessUnitService } from "@/services/businessUnitService"

export default function AddBusinessUnitPage() {
  const { clusterId } = useParams()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    try {
      await businessUnitService.createBusinessUnit(clusterId as string, {
        name: formData.get('name') as string,
        brand: formData.get('brand') as string,
        head: formData.get('head') as string,
        location: {
          city: formData.get('city') as string,
          country: formData.get('country') as string
        },
        details: {
          rooms: parseInt(formData.get('rooms') as string),
          teams: parseInt(formData.get('teams') as string),
          members: parseInt(formData.get('members') as string)
        },
        contact: {
          email: formData.get('email') as string,
          phone: formData.get('phone') as string,
          address: formData.get('address') as string
        },
        configuration: {
          database: {
            host: formData.get('dbHost') as string,
            name: formData.get('dbName') as string,
            type: formData.get('dbType') as 'mysql' | 'postgres'
          }
        },
        settings: {
          notifications: {
            email: formData.get('emailNotifications') === 'true',
            slack: formData.get('slackNotifications') === 'true',
            webhook: formData.get('webhookNotifications') === 'true'
          },
          integrations: []
        }
      })

      router.push(`/admin/clusters/${clusterId}/business-units`)
    } catch (error) {
      console.error('Failed to create business unit:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Add Business Unit</h2>
        <p className="text-muted-foreground">
          Create a new business unit in this cluster
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input id="brand" name="brand" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="head">Head</Label>
                <Input id="head" name="head" required />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Location & Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" name="country" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" type="tel" required />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" required />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="rooms">Rooms</Label>
                <Input id="rooms" name="rooms" type="number" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teams">Teams</Label>
                <Input id="teams" name="teams" type="number" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="members">Members</Label>
                <Input id="members" name="members" type="number" required />
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
                <Input id="dbName" name="dbName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dbType">Database Type</Label>
                <Select name="dbType" defaultValue="postgres">
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
                <Input id="dbHost" name="dbHost" required />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button 
            variant="outline" 
            onClick={() => router.push(`/admin/clusters/${clusterId}/business-units`)}
            type="button"
          >
            Cancel
          </Button>
          <Button type="submit">Create Business Unit</Button>
        </div>
      </form>
    </div>
  )
}
