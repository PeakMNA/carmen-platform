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
import { LoginForm } from "@/components/auth/LoginForm"

export const metadata: Metadata = {
  title: "Login | Carmen Platform",
  description: "Login to your Carmen Platform account",
}

export default function LoginPage() {
  return (
    <Card className="relative w-full max-w-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
        <CardDescription>
          Sign in to your account using your email invitation link
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="flex w-full items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Don't have an invitation?{" "}
            <Link 
              href="/contact" 
              className="text-primary-600 hover:text-primary-700"
            >
              Contact your administrator
            </Link>
          </div>
          <Link 
            href="/forgot-password" 
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            Forgot password?
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