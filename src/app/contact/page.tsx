import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ContactForm } from "@/components/forms/ContactForm"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Administrator | Carmen Platform",
  description: "Request access to Carmen Platform",
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-primary-50 to-white px-4 py-8">
      <div className="absolute inset-0 bg-grid-primary-100/40 bg-[size:20px_20px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      <Link 
        href="/" 
        className="relative mb-8 text-2xl font-bold text-primary-600"
      >
        Carmen Platform
      </Link>
      <Card className="relative w-full max-w-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Request Access</CardTitle>
          <CardDescription>
            Contact your administrator to request platform access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ContactForm type="admin" />
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
          <Link href="/" className="w-full">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
} 