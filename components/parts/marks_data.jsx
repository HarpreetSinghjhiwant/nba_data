"use client";

import React, { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableDemo } from "./coPerMarks";

const initialData = []

export function DataTableDemo() {
  const [data, setData] = useState(initialData);

  // Use memoization to prevent unnecessary re-renders of the table when only specific data changes
  const memoizedData = useMemo(() => data, [data]);

  const handleInputChange = useCallback((rowIndex, columnId) => (e) => {
    const value = e.target.value;
    setData((prevData) =>
      prevData.map((row, idx) =>
        idx === rowIndex ? { ...row, [columnId]: value } : row
      )
    );
  }, []);

  const handleAddRow = useCallback(() => {
    const newRow = {
      rollNumber: `CO${Date.now()}`,
      studentName: "New Student",
      CO1: "1",
      CO2: "1",
      CO3: "1",
      CO4: "1",
      CO5: "1",
      CO6: "1",
    };
    setData((prevData) => [...prevData, newRow]);
  }, []);

  const handleDeleteRow = useCallback((rowIndex) => {
    if (data.length >= 1) {
      setData((prevData) => prevData.filter((_, index) => index !== rowIndex));
    }
  }, [data]);

  const columns = useMemo(() => [
    {
      accessorKey: "rollNumber",
      header: "Roll Number",
      cell: ({ row, column }) => (
        <CustomInput
          value={row.getValue(column.id)}
          onChange={handleInputChange(row.index, column.id)}
          placeholder="Roll No."
        />
      ),
    },
    {
      accessorKey: "studentName",
      header: "Student Name",
      cell: ({ row, column }) => (
        <CustomInput
          value={row.getValue(column.id)}
          onChange={handleInputChange(row.index, column.id)}
          placeholder="Student Name"
        />
      ),
    },
    ...Array.from({ length: 6 }, (_, idx) => ({
      accessorKey: `CO${idx + 1}`,
      header: `CO${idx + 1}`,
      cell: ({ row, column }) => (
        <CustomInput
          value={row.getValue(column.id)}
          onChange={handleInputChange(row.index, column.id)}
          placeholder={`CO${idx + 1}`}
        />
      ),
    })),
    {
      header: "Actions",
      cell: ({ row }) =>
        (
          <button
            onClick={() => handleDeleteRow(row.index)}
            className="text-red-600 hover:underline"
            aria-label={`Delete row ${row.index + 1}`}
          >
            Delete
          </button>
        ),
    },
  ], [handleInputChange, data.length]);

  const table = useReactTable({
    data: memoizedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full">
      <div className="mb-4">
        <button
          onClick={handleAddRow}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Row
        </button>
      </div>
      <div className="rounded-md border p-4 bg-white shadow-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-14 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-row justify-between text-center">
      <div className=" w-[40%] pt-8">
        <TableDemo isEditable={true}/>
      </div>
      <div className=" w-[40%] pt-8">
        <TableDemo isEditable={false}/>
      </div>
      </div>
    </div>
  );
}

// Custom Input Component
const CustomInput = React.memo(({ value, onChange, placeholder }) => {
  const [localValue, setLocalValue] = useState(value || "");
  const isFirstRender = useRef(true);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);

    // Only trigger onChange after first render to prevent initial syncing issues
    if (!isFirstRender.current) {
      onChange(e);
    }
  };

  useEffect(() => {
    // Prevent initial onChange on first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Update local value if external prop changes
    setLocalValue(value || "");
  }, [value]);

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={localValue}
      onChange={handleChange}
      className="w-full px-2 py-1 border-none bg-transparent outline-none focus:ring-0"
    />
  );
});
