"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState, useTransition } from "react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { ToastAction } from "@/components/ui/toast"
import { createBusinessUnit } from "@/services/businessUnitService"

export default function AddBusinessUnitPage() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    location: {
      street: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
    },
    details: {
      rooms: "",
      floors: "",
      yearBuilt: "",
      lastRenovated: "",
    },
    contact: {
      phone: "",
      email: "",
      manager: "",
    },
    notifications: {
      email: {
        enabled: true,
        dailyDigest: true,
        alerts: true,
        reportGeneration: true,
      },
      slack: {
        enabled: false,
        webhookUrl: "",
        channels: [""],
      },
      webhook: {
        enabled: false,
        endpoints: [{
          url: "",
          events: [],
        }],
      },
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      try {
        await createBusinessUnit("default", formData)
        
        toast({
          title: "Success",
          description: "Business unit has been created successfully.",
        })
        
        router.push("/admin/business-units")
      } catch (error) {
        console.error("Failed to create business unit:", error)
        toast({
          title: "Error",
          description: "Failed to create business unit.",
          variant: "destructive",
          action: (
            <ToastAction altText="Try again" onClick={() => handleSubmit(e)}>
              Try again
            </ToastAction>
          ),
        })
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/business-units">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Add Business Unit</h2>
              <p className="text-muted-foreground">
                Add a new hotel or property
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/business-units">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" form="business-unit-form" disabled={isPending}>
              {isPending ? "Creating..." : "Create Business Unit"}
            </Button>
          </div>
        </div>
      </div>

      <form id="business-unit-form" onSubmit={handleSubmit} className="space-y-6">
        {/* Form fields from the previous implementation */}
        {/* ... */}
      </form>
    </div>
  )
} 