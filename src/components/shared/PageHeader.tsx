"use client"

import { ReactNode } from "react"

interface PageHeaderProps {
  title: string
  description?: string
  action?: ReactNode
  children?: ReactNode
}

export function PageHeader({
  title,
  description,
  action,
  children
}: PageHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Title Row */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        {action && (
          <div>
            {action}
          </div>
        )}
      </div>

      {/* Search/Filter Row */}
      {children && (
        <div>
          {children}
        </div>
      )}
    </div>
  )
}
