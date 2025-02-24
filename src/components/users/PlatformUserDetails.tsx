"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Mail, Calendar, Shield, Activity, MoreVertical, Building2, Layers } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PlatformUserForm } from "./PlatformUserForm"

import { PlatformUser, PlatformUserFormData, platformRoles, PLATFORM_ROLE_DESCRIPTIONS, PLATFORM_ROLE_CAPABILITIES } from "@/types/platform-user"

interface PlatformUserDetailsProps {
  user: PlatformUser
  open: boolean
  onClose: () => void
  onEdit: (user: PlatformUserFormData) => void
  onDelete: (userId: string) => void
  onStatusChange: (userId: string, status: "active" | "inactive") => void
}

export function PlatformUserDetails({
  user,
  open,
  onClose,
  onEdit,
  onDelete,
  onStatusChange
}: PlatformUserDetailsProps) {
  const [showEditForm, setShowEditForm] = useState(false)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)

  const handleEdit = (formData: PlatformUserFormData) => {
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

  const roleCapabilities = user.platformRole ? PLATFORM_ROLE_CAPABILITIES[user.platformRole] : []

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>User Details</DialogTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setShowEditForm(true)}>
                    Edit User
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleStatusChange}>
                    {user.status === "active" ? "Deactivate" : "Activate"} User
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => setShowDeleteAlert(true)}
                  >
                    Delete User
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
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Platform Role</p>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>{platformRoles.find(r => r.value === user.platformRole)?.label}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {user.platformRole && PLATFORM_ROLE_DESCRIPTIONS[user.platformRole]}
                  </p>
                </div>
                <Badge variant={user.status === "active" ? "default" : "secondary"}>
                  {user.status}
                </Badge>
              </div>

              {roleCapabilities.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Capabilities</p>
                  <div className="flex flex-wrap gap-2">
                    {roleCapabilities.map((capability, index) => (
                      <Badge key={index} variant="outline">
                        {capability}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {user.businessUnitAssignments.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Business Unit Access</p>
                  {user.businessUnitAssignments.map((assignment, index) => (
                    <div key={index} className="rounded-lg border p-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span>{assignment.businessUnitName}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">
                          {assignment.role}
                        </Badge>
                        {assignment.department && (
                          <Badge variant="outline">
                            {assignment.department}
                          </Badge>
                        )}
                      </div>
                      {assignment.modules.length > 0 && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Layers className="h-4 w-4" />
                          <span>{assignment.modules.length} modules</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

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
        <PlatformUserForm
          user={user}
          open={showEditForm}
          onClose={() => setShowEditForm(false)}
          onSubmit={handleEdit}
        />
      )}

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
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
