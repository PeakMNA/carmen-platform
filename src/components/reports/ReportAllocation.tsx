"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Plus, X } from "lucide-react"

interface Allocation {
  id: string
  templateId: string
  entityType: "brand" | "hotel"
  entityId: string
  entityName: string
  schedule: string
  status: string
}

const hotelBrands = [
  {
    id: "hb-1234",
    name: "Luxury Collection Hotels & Resorts",
    properties: 25,
    type: "Luxury",
    region: "Global",
    revenue: "$2.8B",
  },
  {
    id: "hb-1235",
    name: "Business Hotels Division",
    properties: 40,
    type: "Business",
    region: "Global",
    revenue: "$3.2B",
  },
  {
    id: "hb-1236",
    name: "Resort Collection",
    properties: 15,
    type: "Resort",
    region: "Global",
    revenue: "$1.8B",
  },
]

const hotels = [
  {
    id: "h-1234",
    name: "Grand Hotel Downtown",
    brand: "hb-1234",
    location: "New York",
    rooms: 280,
    type: "Luxury",
    revenue: "$120M",
  },
  {
    id: "h-1235",
    name: "Business Tower Hotel",
    brand: "hb-1235",
    location: "Chicago",
    rooms: 180,
    type: "Business",
    revenue: "$85M",
  },
  {
    id: "h-1236",
    name: "Beachfront Resort & Spa",
    brand: "hb-1236",
    location: "Bali",
    rooms: 320,
    type: "Resort",
    revenue: "$150M",
  },
]

const allocations: Allocation[] = [
  {
    id: "A-1234",
    templateId: "T-1234",
    entityType: "brand",
    entityId: "hb-1234",
    entityName: "Luxury Collection Hotels & Resorts",
    schedule: "Daily",
    status: "active",
  },
  {
    id: "A-1235",
    templateId: "T-1235",
    entityType: "hotel",
    entityId: "h-1234",
    entityName: "Grand Hotel Downtown",
    schedule: "Weekly",
    status: "active",
  },
]

const templates = [
  { id: "T-1234", name: "Activity Report Template" },
  { id: "T-1235", name: "Compliance Report Template" },
  { id: "T-1236", name: "Performance Report Template" },
]

export function ReportAllocation() {
  const [showAllocationForm, setShowAllocationForm] = useState(false)
  const [selectedEntityType, setSelectedEntityType] = useState<"brand" | "hotel">("brand")

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Report Allocations</CardTitle>
          <Button onClick={() => setShowAllocationForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Allocation
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search allocations..." className="pl-8" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="brand">Hotel Brands</SelectItem>
                <SelectItem value="hotel">Hotels</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {allocations.map((allocation) => (
              <div
                key={allocation.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{allocation.entityName}</span>
                    <Badge variant="outline">
                      {allocation.entityType === "brand" ? "Hotel Brand" : "Hotel"}
                    </Badge>
                    <Badge variant="default">{allocation.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Template: {templates.find(t => t.id === allocation.templateId)?.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Schedule: {allocation.schedule}
                  </p>
                </div>
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {showAllocationForm && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>New Allocation</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAllocationForm(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Entity Type</Label>
                <Select
                  value={selectedEntityType}
                  onValueChange={(value: "brand" | "hotel") =>
                    setSelectedEntityType(value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="brand">Hotel Brand</SelectItem>
                    <SelectItem value="hotel">Hotel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Select {selectedEntityType === "brand" ? "Hotel Brand" : "Hotel"}</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={`Select ${selectedEntityType === "brand" ? "hotel brand" : "hotel"}...`} />
                  </SelectTrigger>
                  <SelectContent>
                    {(selectedEntityType === "brand" ? hotelBrands : hotels).map((entity) => (
                      <SelectItem key={entity.id} value={entity.id}>
                        {entity.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Report Template</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select template..." />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Schedule</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select schedule..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAllocationForm(false)}>
                  Cancel
                </Button>
                <Button>Save Allocation</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 