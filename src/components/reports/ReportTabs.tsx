"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, FileStack, Building2 } from "lucide-react"
import { ReportAssignments } from "./ReportAssignments"
import { ReportTemplates } from "./ReportTemplates"
import { BusinessUnitReports } from "./BusinessUnitReports"

const tabs = [
  {
    value: "assignments",
    label: "Report Assignments",
    icon: FileText,
    component: ReportAssignments,
  },
  {
    value: "bu-reports",
    label: "Business Unit Reports",
    icon: Building2,
    component: BusinessUnitReports,
  },
  {
    value: "templates",
    label: "Report Templates",
    icon: FileStack,
    component: ReportTemplates,
  },
]

export function ReportTabs() {
  return (
    <Tabs defaultValue="assignments" className="space-y-4">
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className="gap-2">
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <tab.component />
        </TabsContent>
      ))}
    </Tabs>
  )
} 