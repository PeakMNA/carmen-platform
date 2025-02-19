import { Metadata } from "next"
import { BusinessUnitsPage } from "@/components/business-units/BusinessUnitsPage"

export const metadata: Metadata = {
  title: "Business Units | Carmen Platform",
  description: "Manage organization business units",
}

export default function Page() {
  return <BusinessUnitsPage />
} 