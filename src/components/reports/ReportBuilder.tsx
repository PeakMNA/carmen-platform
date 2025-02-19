"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd"
import { GripVertical, Plus, X } from "lucide-react"

interface Section {
  id: string
  title: string
  type: string
  content: string
}

export function ReportBuilder() {
  const [sections, setSections] = useState<Section[]>([
    {
      id: "section-1",
      title: "Executive Summary",
      type: "text",
      content: "",
    },
  ])

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(sections)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setSections(items)
  }

  const addSection = () => {
    const newSection: Section = {
      id: `section-${sections.length + 1}`,
      title: "New Section",
      type: "text",
      content: "",
    }
    setSections([...sections, newSection])
  }

  const removeSection = (index: number) => {
    const newSections = sections.filter((_, i) => i !== index)
    setSections(newSections)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Report Builder</CardTitle>
            <Button onClick={addSection}>
              <Plus className="mr-2 h-4 w-4" />
              Add Section
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Report Name</Label>
                <Input id="name" placeholder="Enter report name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Report Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="activity">Activity Report</SelectItem>
                    <SelectItem value="performance">Performance Report</SelectItem>
                    <SelectItem value="compliance">Compliance Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter report description"
                className="h-20"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {sections.map((section, index) => (
                <Draggable
                  key={section.id}
                  draggableId={section.id}
                  index={index}
                >
                  {(provided) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="mb-4"
                    >
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div
                          {...provided.dragHandleProps}
                          className="flex items-center gap-2"
                        >
                          <GripVertical className="h-5 w-5 text-muted-foreground" />
                          <Input
                            value={section.title}
                            onChange={(e) => {
                              const newSections = [...sections]
                              newSections[index].title = e.target.value
                              setSections(newSections)
                            }}
                            className="h-7 w-[200px]"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Select
                            value={section.type}
                            onValueChange={(value) => {
                              const newSections = [...sections]
                              newSections[index].type = value
                              setSections(newSections)
                            }}
                          >
                            <SelectTrigger className="w-[140px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="text">Text</SelectItem>
                              <SelectItem value="chart">Chart</SelectItem>
                              <SelectItem value="table">Table</SelectItem>
                              <SelectItem value="metrics">Metrics</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSection(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Textarea
                          value={section.content}
                          onChange={(e) => {
                            const newSections = [...sections]
                            newSections[index].content = e.target.value
                            setSections(newSections)
                          }}
                          placeholder="Enter section content"
                          className="min-h-[100px]"
                        />
                      </CardContent>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Save as Draft</Button>
        <Button>Save Template</Button>
      </div>
    </div>
  )
} 