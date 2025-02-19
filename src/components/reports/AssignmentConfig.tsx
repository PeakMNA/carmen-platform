"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const businessUnits = [
  { id: "h-1", name: "Grand Hotel Downtown", brand: "Luxury Collection" },
  { id: "h-2", name: "Business Tower Hotel", brand: "Business Hotels" },
  { id: "h-3", name: "Beachfront Resort & Spa", brand: "Resort Collection" },
]

interface AssignmentConfigProps {
  selectedBU: string
  onBUSelect: (buId: string) => void
}

export function AssignmentConfig({ selectedBU, onBUSelect }: AssignmentConfigProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assignment Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Select Business Unit</h3>
            <Select value={selectedBU} onValueChange={onBUSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Select business unit..." />
              </SelectTrigger>
              <SelectContent>
                {businessUnits.map((bu) => (
                  <SelectItem key={bu.id} value={bu.id}>
                    {bu.name} ({bu.brand})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 