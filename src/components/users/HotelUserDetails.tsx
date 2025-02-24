"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Mail, Calendar, Shield, Activity, MoreVertical, Building2, Building, Users } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { HotelUser, HotelUserFormData, departments, departmentRoles, moduleOptions } from "@/types/hotel-user"
import { HotelUserForm } from "./HotelUserForm"

interface Hotel {
  id: string
  name: string
  clusterId: string
}

interface HotelUserDetailsProps {
  user: HotelUser
  clusters: { id: string; name: string }[]
  hotels: Hotel[]
  open: boolean
  onClose: () => void
  onEdit: (user: HotelUserFormData) => void
  onDelete: (userId: string) => void
  onStatusChange: (userId: string, status: "active" | "inactive") => void
}

export function HotelUserDetails({
  user,
  clusters,
  hotels,
  open,
  onClose,
  onEdit,
  onDelete,
  onStatusChange
}: HotelUserDetailsProps) {
  const [showEditForm, setShowEditForm] = useState(false)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)

  const handleEdit = (formData: HotelUserFormData) => {
    onEdit({
      ...formData,
      id: user.id
    })
    setShowEditForm(false)
  }

  const handleDelete = () => {
    onDelete(user.id)
    setShowDeleteAlert(false)
    onClose()
  }

  const handleStatusChange = () => {
    onStatusChange(user.id, user.status === "active" ? "inactive" : "active")
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Staff Details</DialogTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setShowEditForm(true)}>
                    Edit Staff Member
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleStatusChange}>
                    {user.status === "active" ? "Deactivate" : "Activate"} Staff Member
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => setShowDeleteAlert(true)}
                  >
                    Delete Staff Member
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-2xl font-semibold tracking-tight">{user.name}</h3>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Hotel Group</p>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <span>{user.clusterName}</span>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Hotel</p>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  <span>{user.hotelName}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Department</p>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{departments.find(d => d.value === user.department)?.label}</span>
                  </div>
                </div>
                <Badge variant={user.status === "active" ? "default" : "secondary"}>
                  {user.status}
                </Badge>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Role</p>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>{departmentRoles.find(r => r.value === user.role)?.label}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Module Access</p>
                <div className="flex flex-wrap gap-2">
                  {user.modules.map(moduleId => (
                    <Badge key={moduleId} variant="secondary">
                      {moduleOptions.find(m => m.value === moduleId)?.label}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Last Active</p>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(user.lastActive).toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Activity Status</p>
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  <span>Normal usage patterns</span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {showEditForm && (
        <HotelUserForm
          user={user}
          clusters={clusters}
          hotels={hotels}
          open={showEditForm}
          onClose={() => setShowEditForm(false)}
          onSubmit={handleEdit}
        />
      )}

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Staff Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this staff member? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
