"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, FileText, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

interface Invoice {
  id: string
  date: string
  amount: number
  status: "paid" | "pending" | "overdue"
  businessUnit: string
}

const mockInvoices: Invoice[] = [
  {
    id: "INV-001",
    date: "2024-03-01",
    amount: 499,
    status: "paid",
    businessUnit: "Grand Hotel Singapore"
  },
  {
    id: "INV-002",
    date: "2024-03-01",
    amount: 999,
    status: "paid",
    businessUnit: "Luxury Resort Bali"
  },
  {
    id: "INV-003",
    date: "2024-03-01",
    amount: 199,
    status: "pending",
    businessUnit: "Boutique Hotel Bangkok"
  },
  {
    id: "INV-004",
    date: "2024-02-01",
    amount: 499,
    status: "paid",
    businessUnit: "Grand Hotel Singapore"
  },
  {
    id: "INV-005",
    date: "2024-02-01",
    amount: 999,
    status: "paid",
    businessUnit: "Luxury Resort Bali"
  },
  {
    id: "INV-006",
    date: "2024-02-01",
    amount: 199,
    status: "paid",
    businessUnit: "Boutique Hotel Bangkok"
  }
]

export default function SubscriptionBillingPage() {
  const [businessUnitFilter, setBusinessUnitFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  
  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesBusinessUnit = businessUnitFilter === "all" || invoice.businessUnit === businessUnitFilter
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter
    return matchesBusinessUnit && matchesStatus
  })
  
  const uniqueBusinessUnits = Array.from(new Set(mockInvoices.map(invoice => invoice.businessUnit)))
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Subscription Invoices</h2>
        <p className="text-muted-foreground">
          Review and manage hotel subscription invoices
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Invoice History</CardTitle>
            <CardDescription>View and download hotel subscription invoices</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button>Export All</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4 pb-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Hotel:</span>
              <Select value={businessUnitFilter} onValueChange={setBusinessUnitFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Hotels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Hotels</SelectItem>
                  {uniqueBusinessUnits.map(bu => (
                    <SelectItem key={bu} value={bu}>{bu}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Status:</span>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Hotel</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                    No invoices match the selected filters
                  </TableCell>
                </TableRow>
              ) : (
                filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                    <TableCell>{invoice.businessUnit}</TableCell>
                    <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          invoice.status === "paid" 
                            ? "default" 
                            : invoice.status === "pending" 
                              ? "outline" 
                              : "destructive"
                        }
                      >
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" title="Download Invoice">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="View Invoice Details">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
          <CardDescription>Hotel organization billing details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <div className="text-sm font-medium">Company Name</div>
            <div className="text-sm">Carmen Hospitality Group</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-medium">Billing Address</div>
            <div className="text-sm">123 Hospitality Road</div>
            <div className="text-sm">Singapore, 123456</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-medium">Tax ID</div>
            <div className="text-sm">SG-12345678</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-medium">Billing Contact</div>
            <div className="text-sm">finance@carmenhospitality.com</div>
          </div>
          <Button variant="outline" className="mt-2">Edit Billing Information</Button>
        </CardContent>
      </Card>
    </div>
  )
} 