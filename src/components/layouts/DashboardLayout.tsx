import { ReactNode } from "react"
import { Sidebar } from "@/components/layouts/Sidebar"
import Header from "@/components/layouts/Header"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Header />
        <main className="p-8">{children}</main>
      </div>
    </div>
  )
} 