"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Clock, CheckCircle, AlertTriangle, Building2, User, Calendar, X, Check, FileText, Settings, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ReportRequest {
  id: string
  title: string
  entityType: "brand" | "hotel"
  entityName: string
  requestedBy: string
  requestDate: string
  status: "pending" | "approved" | "rejected"
  priority: "low" | "medium" | "high"
  description: string
  type: "standard" | "custom"
}

const requests: ReportRequest[] = [
  {
    id: "RR-1234",
    title: "Monthly Revenue Analysis",
    entityType: "hotel",
    entityName: "Grand Hotel Downtown",
    requestedBy: "Sarah Johnson",
    requestDate: "2024-03-15",
    status: "pending",
    priority: "high",
    description: "Detailed revenue analysis with market comparison",
    type: "standard",
  },
  {
    id: "RR-1235",
    title: "Custom Occupancy Report",
    entityType: "brand",
    entityName: "Luxury Collection Hotels",
    requestedBy: "James Wilson",
    requestDate: "2024-03-14",
    status: "approved",
    priority: "medium",
    description: "Custom occupancy analysis across properties",
    type: "custom",
  },
]

export function ReportRequestManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPriority, setFilterPriority] = useState<string>("all")
  const [filterType, setFilterType] = useState<string>("all")

  return (
    <Tabs defaultValue="pending" className="space-y-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <TabsList className="w-[400px]">
            <TabsTrigger value="pending" className="flex-1">
              <Clock className="mr-2 h-4 w-4" />
              Pending
              <Badge variant="secondary" className="ml-2">
                {requests.filter((r) => r.status === "pending").length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="approved" className="flex-1">
              <CheckCircle className="mr-2 h-4 w-4" />
              Approved
              <Badge variant="secondary" className="ml-2">
                {requests.filter((r) => r.status === "approved").length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="rejected" className="flex-1">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Rejected
              <Badge variant="secondary" className="ml-2">
                {requests.filter((r) => r.status === "rejected").length}
              </Badge>
            </TabsTrigger>
          </TabsList>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, entity, or requester..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select
            value={filterPriority}
            onValueChange={setFilterPriority}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="low">Low Priority</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={filterType}
            onValueChange={setFilterType}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Report Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <TabsContent value="pending">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Pending Requests</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Review and process incoming report requests
              </p>
            </div>
            <Select defaultValue="newest">
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="priority">By Priority</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {requests
                .filter((request) => request.status === "pending")
                .filter((request) => 
                  filterPriority === "all" || request.priority === filterPriority
                )
                .filter((request) =>
                  filterType === "all" || request.type === filterType
                )
                .filter((request) =>
                  searchTerm === "" ||
                  request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  request.entityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  request.requestedBy.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((request) => (
                  <RequestCard key={request.id} request={request} />
                ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="approved">
        <Card>
          <CardHeader>
            <CardTitle>Approved Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {requests
                .filter((request) => request.status === "approved")
                .map((request) => (
                  <RequestCard key={request.id} request={request} />
                ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="rejected">
        <Card>
          <CardHeader>
            <CardTitle>Rejected Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {requests
                .filter((request) => request.status === "rejected")
                .map((request) => (
                  <RequestCard key={request.id} request={request} />
                ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

function RequestCard({ request }: { request: ReportRequest }) {
  return (
    <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="space-y-3 flex-1">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">{request.title}</span>
              <Badge variant="outline">
                {request.entityType === "brand" ? "Hotel Brand" : "Hotel"}
              </Badge>
              <Badge variant={request.type === "standard" ? "default" : "secondary"}>
                {request.type}
              </Badge>
              <Badge
                variant={
                  request.priority === "high"
                    ? "destructive"
                    : request.priority === "medium"
                    ? "default"
                    : "secondary"
                }
              >
                {request.priority}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                {request.entityName}
              </span>
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {request.requestedBy}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {request.requestDate}
              </span>
            </div>
          </div>
          <div className="rounded-md bg-muted p-3">
            <p className="text-sm">{request.description}</p>
          </div>
          {request.status === "pending" && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Awaiting review</span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 ml-4">
          {request.status === "pending" && (
            <>
              <Button variant="outline" size="sm" className="w-[100px]">
                <X className="mr-2 h-4 w-4" />
                Reject
              </Button>
              <Button size="sm" className="w-[100px]">
                <Check className="mr-2 h-4 w-4" />
                Approve
              </Button>
            </>
          )}
          {request.status === "approved" && (
            <>
              <Button variant="outline" size="sm" className="w-[100px]">
                <FileText className="mr-2 h-4 w-4" />
                View
              </Button>
              <Button variant="outline" size="sm" className="w-[100px]">
                <Settings className="mr-2 h-4 w-4" />
                Configure
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
} 