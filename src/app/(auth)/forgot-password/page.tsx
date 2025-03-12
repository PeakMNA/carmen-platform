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
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm"

export const metadata: Metadata = {
  title: "Forgot Password | Carmen Platform",
  description: "Reset your Carmen Platform password",
}

export default function ForgotPasswordPage() {
  return (
    <Card className="relative w-full max-w-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Reset password</CardTitle>
        <CardDescription>
          Enter your email address and we&apos;ll send you a password reset link
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ForgotPasswordForm />
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-muted-foreground">
          Remember your password?{" "}
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