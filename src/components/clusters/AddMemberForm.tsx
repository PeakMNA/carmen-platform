"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { BusinessUnitRole, Department, ModuleAccess, ModuleType, AccessLevel, PlatformRole } from "@/types/user-base"

interface AddMemberFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: AddMemberFormData) => void
}

export interface AddMemberFormData {
  id?: string
  name: string
  email: string
  platformRole: PlatformRole
  businessUnitAssignments: {
    businessUnitId: string
    role: BusinessUnitRole
    department?: Department
    modules: ModuleAccess[]
  }[]
}

const AVAILABLE_ROLES: { value: BusinessUnitRole; label: string }[] = [
  { value: "hotel_admin", label: "Hotel Admin" },
  { value: "department_head", label: "Department Head" },
  { value: "staff", label: "Staff" }
]

const DEPARTMENTS: { value: Department; label: string }[] = [
  { value: "front_office", label: "Front Office" },
  { value: "housekeeping", label: "Housekeeping" },
  { value: "food_beverage", label: "Food & Beverage" },
  { value: "maintenance", label: "Maintenance" },
  { value: "finance", label: "Finance" },
  { value: "hr", label: "HR" }
]

const DEFAULT_MODULES: { moduleId: ModuleType; accessLevel: AccessLevel }[] = [
  { moduleId: "reports", accessLevel: "read" },
  { moduleId: "inventory", accessLevel: "write" }
]

export function AddMemberForm({ open, onClose, onSubmit }: AddMemberFormProps) {
  const [formData, setFormData] = useState<AddMemberFormData>({
    name: "",
    email: "",
    platformRole: "cluster_admin",
    businessUnitAssignments: [{
      businessUnitId: "",
      role: "department_head",
      modules: DEFAULT_MODULES
    }]
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Cluster Member</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter member name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Platform Role</Label>
            <Select
              value={formData.platformRole}
              onValueChange={(value: PlatformRole) => 
                setFormData({ ...formData, platformRole: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select platform role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cluster_admin">Cluster Admin</SelectItem>
                <SelectItem value="support">Support</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.businessUnitAssignments.map((assignment, index) => (
            <div key={index} className="space-y-4 border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Business Unit Assignment {index + 1}</h4>
                {index > 0 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        businessUnitAssignments: prev.businessUnitAssignments.filter((_, i) => i !== index)
                      }))
                    }}
                  >
                    Remove
                  </Button>
                )}
              </div>

              <div className="space-y-2">
                <Label>Business Unit ID</Label>
                <Input
                  placeholder="Enter business unit ID"
                  value={assignment.businessUnitId}
                  onChange={(e) => {
                    const newAssignments = [...formData.businessUnitAssignments]
                    newAssignments[index] = {
                      ...newAssignments[index],
                      businessUnitId: e.target.value
                    }
                    setFormData(prev => ({
                      ...prev,
                      businessUnitAssignments: newAssignments
                    }))
                  }}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Role</Label>
                <Select
                  value={assignment.role}
                  onValueChange={(value: BusinessUnitRole) => {
                    const newAssignments = [...formData.businessUnitAssignments]
                    newAssignments[index] = {
                      ...newAssignments[index],
                      role: value
                    }
                    setFormData(prev => ({
                      ...prev,
                      businessUnitAssignments: newAssignments
                    }))
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select business unit role" />
                  </SelectTrigger>
                  <SelectContent>
                    {AVAILABLE_ROLES.map(role => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Department</Label>
                <Select
                  value={assignment.department}
                  onValueChange={(value: Department) => {
                    const newAssignments = [...formData.businessUnitAssignments]
                    newAssignments[index] = {
                      ...newAssignments[index],
                      department: value
                    }
                    setFormData(prev => ({
                      ...prev,
                      businessUnitAssignments: newAssignments
                    }))
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map(dept => (
                      <SelectItem key={dept.value} value={dept.value}>
                        {dept.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => {
              setFormData(prev => ({
                ...prev,
                businessUnitAssignments: [
                  ...prev.businessUnitAssignments,
                  {
                    businessUnitId: "",
                    role: "department_head",
                    modules: DEFAULT_MODULES
                  }
                ]
              }))
            }}
          >
            Add Another Business Unit
          </Button>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Member</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
