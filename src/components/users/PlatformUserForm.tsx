"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

import { PlatformRole } from "@/types/user-base"
import { PlatformUser, PlatformUserFormData, platformRoles, PLATFORM_ROLE_DESCRIPTIONS } from "@/types/platform-user"

interface PlatformUserFormProps {
  user?: PlatformUser
  open: boolean
  onClose: () => void
  onSubmit: (user: PlatformUserFormData) => void
}

export function PlatformUserForm({ user, open, onClose, onSubmit }: PlatformUserFormProps) {
  const [formData, setFormData] = useState<PlatformUserFormData>(
    user ? {
      id: user.id,
      name: user.name,
      email: user.email,
      platformRole: user.platformRole,
      status: user.status,
      businessUnitAssignments: user.businessUnitAssignments.map(assignment => ({
        businessUnitId: assignment.businessUnitId,
        role: assignment.role,
        department: assignment.department,
        modules: assignment.modules
      }))
    } : {
      name: "",
      email: "",
      platformRole: "support",
      status: "active",
      businessUnitAssignments: []
    }
  )

  const isEdit = !!user

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit User" : "Add New User"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter user name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Platform Role</Label>
            <Select
              value={formData.platformRole}
              onValueChange={(value: PlatformRole) => setFormData({ ...formData, platformRole: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {platformRoles.map(role => (
                  <SelectItem 
                    key={role.value} 
                    value={role.value}
                    title={PLATFORM_ROLE_DESCRIPTIONS[role.value]}
                  >
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formData.platformRole && (
              <p className="text-sm text-muted-foreground">
                {PLATFORM_ROLE_DESCRIPTIONS[formData.platformRole]}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="status">Active Status</Label>
            <Switch
              id="status"
              checked={formData.status === "active"}
              onCheckedChange={(checked) => 
                setFormData({ ...formData, status: checked ? "active" : "inactive" })
              }
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {isEdit ? "Update" : "Create"} User
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
