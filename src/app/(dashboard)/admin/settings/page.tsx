import { Metadata } from "next"
import { SettingsHeader } from "@/components/settings/SettingsHeader"
import { SettingsForm } from "@/components/settings/SettingsForm"

export const metadata: Metadata = {
  title: "Settings | Carmen Platform",
  description: "Configure platform settings",
}

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <SettingsHeader />
      <SettingsForm />
    </div>
  )
} 