import { Metadata } from "next"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { RegisterForm } from "@/components/auth/RegisterForm"

export const metadata: Metadata = {
  title: "Register | Carmen Platform",
  description: "Create your Carmen Platform account",
}

export default function RegisterPage() {
  return (
    <Card className="relative w-full max-w-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription>
          Complete your registration using your invitation link
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link 
            href="/login" 
            className="text-primary-600 hover:text-primary-700"
          >
            Sign in
          </Link>
        </div>
        <div className="text-sm text-muted-foreground">
          Need help?{" "}
          <Link 
            href="/support" 
            className="text-primary-600 hover:text-primary-700"
          >
            Contact support
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
} 