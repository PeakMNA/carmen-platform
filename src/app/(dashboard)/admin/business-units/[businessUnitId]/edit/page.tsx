// Server component that handles the params
import { EditBusinessUnitClient } from "@/components/business-units/EditBusinessUnitClient"

interface EditBusinessUnitPageProps {
  params: Promise<{
    businessUnitId: string
  }>
}

export default async function EditBusinessUnitPage({ params }: EditBusinessUnitPageProps) {
  // In Next.js 15, params is a Promise that needs to be awaited
  const { businessUnitId } = await params;
  
  return <EditBusinessUnitClient businessUnitId={businessUnitId} />;
} 