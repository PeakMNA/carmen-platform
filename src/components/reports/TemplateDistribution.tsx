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
import { ReportTemplate } from "@/types/reports"

interface TemplateDistributionProps {
  template: ReportTemplate
  tenants: { id: string; name: string }[]
}

export function TemplateDistribution({ template, tenants }: TemplateDistributionProps) {
  const [, setSelectedTenants] = useState<string[]>([])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Template Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Template Details</h3>
            <div className="flex items-center gap-2 mt-2">
              <span>{template.name}</span>
              <Badge>{template.version}</Badge>
              <Badge variant="outline">{template.category}</Badge>
              <Badge variant="secondary">{template.department}</Badge>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Select Tenants</h3>
            <Select
              onValueChange={(value) => setSelectedTenants(prev => [...prev, value])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select tenants..." />
              </SelectTrigger>
              <SelectContent>
                {tenants.map((tenant) => (
                  <SelectItem key={tenant.id} value={tenant.id}>
                    {tenant.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline">Validate</Button>
            <Button>Distribute Template</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 