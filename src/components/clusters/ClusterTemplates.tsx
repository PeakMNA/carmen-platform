"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { ClusterSelector } from "./ClusterSelector"

interface Template {
  id: string
  name: string
  description: string
  type: "operations" | "finance" | "housekeeping" | "front_office"
  status: "active" | "inactive"
  assignedTo: string[]
}

interface Hotel {
  id: string
  name: string
  assignedTemplates: string[]
  type: "luxury" | "business" | "resort"
  hotelGroup: string
}

const mockTemplates: Template[] = [
  {
    id: "template_1",
    name: "Daily Revenue Report",
    description: "Track daily revenue, occupancy rates, and key financial metrics",
    type: "finance",
    status: "active",
    assignedTo: ["hotel_1", "hotel_2"]
  },
  {
    id: "template_2",
    name: "Housekeeping Checklist",
    description: "Standard room cleaning and maintenance procedures",
    type: "housekeeping",
    status: "active",
    assignedTo: ["hotel_1"]
  },
  {
    id: "template_3",
    name: "Guest Satisfaction Survey",
    description: "Collect and analyze guest feedback and satisfaction metrics",
    type: "front_office",
    status: "active",
    assignedTo: []
  }
]

const mockHotels: Hotel[] = [
  {
    id: "hotel_1",
    name: "Grand Hotel Singapore",
    type: "luxury",
    hotelGroup: "c-1",
    assignedTemplates: ["template_1", "template_2"]
  },
  {
    id: "hotel_2",
    name: "Luxury Resort Bali",
    type: "resort",
    hotelGroup: "c-1",
    assignedTemplates: ["template_1"]
  },
  {
    id: "hotel_3",
    name: "Business Hotel Bangkok",
    type: "business",
    hotelGroup: "c-2",
    assignedTemplates: []
  },
  {
    id: "hotel_4",
    name: "Premium Resort Phuket",
    type: "resort",
    hotelGroup: "c-2",
    assignedTemplates: []
  }
]

export function ClusterTemplates() {
  const [templates, setTemplates] = useState(mockTemplates)
  const [hotels, setHotels] = useState(mockHotels)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [selectedCluster, setSelectedCluster] = useState("c-1")

  const filteredHotels = hotels.filter(hotel => hotel.hotelGroup === selectedCluster)

  const handleTemplateAssignment = (templateId: string, hotelId: string, isAssigned: boolean) => {
    // Update template assignments
    setTemplates(prev => prev.map(template => {
      if (template.id === templateId) {
        return {
          ...template,
          assignedTo: isAssigned 
            ? [...template.assignedTo, hotelId]
            : template.assignedTo.filter(id => id !== hotelId)
        }
      }
      return template
    }))

    // Update hotel assignments
    setHotels(prev => prev.map(hotel => {
      if (hotel.id === hotelId) {
        return {
          ...hotel,
          assignedTemplates: isAssigned
            ? [...hotel.assignedTemplates, templateId]
            : hotel.assignedTemplates.filter(id => id !== templateId)
        }
      }
      return hotel
    }))
  }

  const getTypeLabel = (type: Template["type"]) => {
    switch (type) {
      case "operations": return "Operations"
      case "finance": return "Finance"
      case "housekeeping": return "Housekeeping"
      case "front_office": return "Front Office"
      default: return type
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold tracking-tight">Report Templates</h2>
          <ClusterSelector
            selectedCluster={selectedCluster}
            onClusterChange={setSelectedCluster}
          />
        </div>
        <Button>Add Template</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Available Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {templates.map(template => (
                <div
                  key={template.id}
                  className={`rounded-lg border p-4 cursor-pointer transition-colors ${
                    selectedTemplate === template.id ? 'bg-muted' : ''
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{template.name}</h3>
                    <Badge>{getTypeLabel(template.type)}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {template.description}
                  </p>
                  <div className="text-sm text-muted-foreground">
                    Assigned to {template.assignedTo.filter(id => 
                      hotels.find(h => h.id === id)?.hotelGroup === selectedCluster
                    ).length} hotels in this group
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hotel Assignment</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedTemplate ? (
              <div className="space-y-4">
                {filteredHotels.map(hotel => {
                  const isAssigned = templates
                    .find(t => t.id === selectedTemplate)
                    ?.assignedTo.includes(hotel.id) || false

                  return (
                    <div key={hotel.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${selectedTemplate}-${hotel.id}`}
                        checked={isAssigned}
                        onCheckedChange={(checked) => 
                          handleTemplateAssignment(selectedTemplate, hotel.id, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={`${selectedTemplate}-${hotel.id}`}
                        className="flex flex-col"
                      >
                        <span className="font-medium">{hotel.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {hotel.assignedTemplates.length} templates assigned • {hotel.type} hotel
                        </span>
                      </Label>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                Select a template to manage assignments
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
