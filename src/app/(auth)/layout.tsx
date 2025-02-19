import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-primary-50 to-white px-4 py-8">
      <div className="absolute inset-0 bg-grid-primary-100/40 bg-[size:20px_20px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      <Link 
        href="/" 
        className="relative mb-8 text-2xl font-bold text-primary-600"
      >
        Carmen Platform
      </Link>
      {children}
    </div>
  )
} 