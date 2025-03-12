import { BusinessUnitClient } from "@/components/business-units/BusinessUnitClient"
import { notFound } from 'next/navigation'

interface BusinessUnitPageProps {
  params: Promise<{
    businessUnitId: string
  }>
}

export default async function BusinessUnitPage({ params }: BusinessUnitPageProps) {
  const { businessUnitId } = await params;
  
  // Redirect to 404 if the ID is 'templates'
  if (businessUnitId === 'templates') {
    notFound()
  }
  
  return <BusinessUnitClient businessUnitId={businessUnitId} />
} 
