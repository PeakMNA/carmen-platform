import { Metadata } from "next"
import { SupportHeader } from "@/components/support/SupportHeader"
import { SupportTickets } from "@/components/support/SupportTickets"
import { SupportStats } from "@/components/support/SupportStats"
import { SupportReportManagement } from "@/components/support/SupportReportManagement"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Support | Carmen Platform",
  description: "Support dashboard and ticket management",
}

export default function SupportPage() {
  return (
    <div className="space-y-8">
      <SupportHeader />
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="space-y-4">
            <SupportStats />
            <SupportTickets />
          </div>
        </TabsContent>
        <TabsContent value="tickets">
          <SupportTickets />
        </TabsContent>
        <TabsContent value="reports">
          <SupportReportManagement />
        </TabsContent>
      </Tabs>
    </div>
  )
} 