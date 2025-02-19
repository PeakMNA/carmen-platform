"use client"

import { useState } from "react"
import { DetailDialog } from "@/components/ui/detail-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Users, Building2, MapPin } from "lucide-react"

interface BusinessUnit {
  id: string
  name: string
  head: string
  teams: string
  members: string
  brand: string
  status: string
  location: string
  rooms: string
}

interface BusinessUnitDetailsProps {
  unit: BusinessUnit
  isOpen: boolean
  onClose: () => void
}

export function BusinessUnitDetails({ unit, isOpen, onClose }: BusinessUnitDetailsProps) {
  return (
    <DetailDialog
      title={unit.name}
      description="Business Unit Details"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Tabs defaultValue="overview" className="mt-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="tenants">Tenants</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Unit ID:</span>
                  <span className="text-sm text-muted-foreground">{unit.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Head:</span>
                  <span className="text-sm text-muted-foreground">{unit.head}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Location:</span>
                  <span className="text-sm text-muted-foreground">{unit.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Status:</span>
                  <Badge variant="default">{unit.status}</Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Resource Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Teams:</span>
                  <span className="text-sm text-muted-foreground">{unit.teams}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Members:</span>
                  <span className="text-sm text-muted-foreground">{unit.members}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Rooms:</span>
                  <span className="text-sm text-muted-foreground">{unit.rooms}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="teams">
          {/* Teams list and management will go here */}
        </TabsContent>
        <TabsContent value="tenants">
          {/* Tenant associations will go here */}
        </TabsContent>
        <TabsContent value="resources">
          {/* Resource allocation and usage will go here */}
        </TabsContent>
      </Tabs>
    </DetailDialog>
  )
} 