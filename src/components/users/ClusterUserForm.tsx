"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { ClusterUser, ClusterUserFormData, clusterRoles, moduleOptions } from "@/types/cluster-user"

interface ClusterUserFormProps {
  user?: ClusterUser
  clusters: { id: string; name: string }[]
  open: boolean
  onClose: () => void
  onSubmit: (user: ClusterUserFormData) => void
}

export function ClusterUserForm({ user, clusters, open, onClose, onSubmit }: ClusterUserFormProps) {
  const [formData, setFormData] = useState<ClusterUserFormData>(
    user || {
      name: "",
      email: "",
      clusterId: "",
      role: "cluster_admin",
      modules: [],
      status: "active"
    }
  )

  const isEdit = !!user

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  const handleModuleToggle = (moduleId: string) => {
    setFormData(prev => ({
      ...prev,
      modules: prev.modules.includes(moduleId)
        ? prev.modules.filter(id => id !== moduleId)
        : [...prev.modules, moduleId]
    }))
  }

  const selectedCluster = clusters.find(c => c.id === formData.clusterId)

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
            <Label>Hotel Group</Label>
            <Select
              value={formData.clusterId}
              onValueChange={(value) => setFormData({ ...formData, clusterId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select hotel group">
                  {selectedCluster?.name}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {clusters.map(cluster => (
                  <SelectItem key={cluster.id} value={cluster.id}>
                    {cluster.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Role</Label>
            <Select
              value={formData.role}
              onValueChange={(value) => setFormData({ ...formData, role: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {clusterRoles.map(role => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Module Access</Label>
            <div className="flex flex-wrap gap-2">
              {moduleOptions.map(module => {
                const isSelected = formData.modules.includes(module.value)
                return (
                  <Badge
                    key={module.value}
                    variant={isSelected ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleModuleToggle(module.value)}
                  >
                    {isSelected && (
                      <X className="mr-1 h-3 w-3" />
                    )}
                    {module.label}
                  </Badge>
                )
              })}
            </div>
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
