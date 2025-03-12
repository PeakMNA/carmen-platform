"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface BackButtonProps {
  fallbackPath?: string
  label?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export function BackButton({
  fallbackPath = "/",
  label,
  variant = "ghost",
  size = "icon"
}: BackButtonProps) {
  const router = useRouter()
  const [canGoBack, setCanGoBack] = useState(false)

  // Check if we can go back in history
  useEffect(() => {
    setCanGoBack(window.history.length > 1)
  }, [])

  const handleBack = () => {
    if (canGoBack) {
      // Use browser history if available
      window.history.back()
    } else {
      // Otherwise navigate to the fallback path
      router.push(fallbackPath)
    }
  }

  return (
    <Button 
      onClick={handleBack} 
      variant={variant} 
      size={size}
      className="flex items-center gap-2"
    >
      <ArrowLeft className="h-4 w-4" />
      {label && <span>{label}</span>}
    </Button>
  )
} 