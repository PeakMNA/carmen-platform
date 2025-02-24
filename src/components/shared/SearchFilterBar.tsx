"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export interface FilterOption {
  label: string
  value: string
}

export interface SortOption {
  label: string
  value: string
}

interface SearchFilterBarProps {
  searchPlaceholder?: string
  filterOptions?: {
    label: string
    options: FilterOption[]
  }[]
  sortOptions?: SortOption[]
  onSearch?: (term: string) => void
  onFilter?: (filter: { [key: string]: string }) => void
  onSort?: (sort: string) => void
  className?: string
}

export function SearchFilterBar({
  searchPlaceholder = "Search...",
  filterOptions = [],
  sortOptions = [],
  onSearch,
  onFilter,
  onSort,
  className
}: SearchFilterBarProps) {
  return (
    <div className={`flex flex-col md:flex-row gap-4 ${className}`}>
      {/* Search Bar */}
      <div className="relative flex-1">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={searchPlaceholder}
          onChange={(e) => onSearch?.(e.target.value)}
          className="pl-8"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        {filterOptions.map((filterGroup) => (
          <Select
            key={filterGroup.label}
            onValueChange={(value) => 
              onFilter?.({ [filterGroup.label.toLowerCase()]: value })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={`Filter by ${filterGroup.label}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All {filterGroup.label}s</SelectItem>
              {filterGroup.options.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}

        {/* Sort */}
        {sortOptions.length > 0 && (
          <Select onValueChange={onSort}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  )
}
