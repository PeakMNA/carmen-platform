"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePathname, useRouter } from "next/navigation"

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 