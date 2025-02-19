import { Metadata } from "next"
import { UsersTable } from "@/components/users/UsersTable"
import { UsersHeader } from "@/components/users/UsersHeader"

export const metadata: Metadata = {
  title: "Users | Carmen Platform",
  description: "Manage platform users",
}

export default function UsersPage() {
  return (
    <div className="space-y-8">
      <UsersHeader />
      <UsersTable />
    </div>
  )
} 