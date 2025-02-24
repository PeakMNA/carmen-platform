"use client"

import { useParams } from "next/navigation"
import { BusinessUnitTemplates } from "@/components/reports/BusinessUnitTemplates"

export default function BusinessUnitTemplatesPage() {
  const { businessUnitId } = useParams()

  return <BusinessUnitTemplates businessUnitId={businessUnitId as string} />
}
