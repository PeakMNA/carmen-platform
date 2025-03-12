"use client"

import React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Define a simplified column type that works with our DataTable
export interface SimpleColumn<T> {
  accessorKey?: string;
  header: React.ReactNode;
  cell?: (props: { row: { original: T } }) => React.ReactNode;
}

// Simple DataTable component
export function DataTable<T extends Record<string, unknown>>({ 
  columns, 
  data 
}: { 
  columns: SimpleColumn<T>[];
  data: T[]; 
}) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex}>
                  {column.cell 
                    ? column.cell({ row: { original: row } }) 
                    : column.accessorKey 
                      ? String(row[column.accessorKey as keyof T] || '')
                      : null}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

// Helper function to convert ColumnDef from @tanstack/react-table to SimpleColumn
export function convertColumns<T>(columns: unknown[]): SimpleColumn<T>[] {
  return columns.map(col => {
    const column = col as { 
      accessorKey?: string; 
      header: React.ReactNode; 
      cell?: unknown 
    };
    
    return {
      accessorKey: column.accessorKey,
      header: column.header,
      cell: column.cell as ((props: { row: { original: T } }) => React.ReactNode)
    };
  });
} 