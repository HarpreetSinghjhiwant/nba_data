"use client";

import React, { useState, useMemo, useCallback } from "react";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button"; // ShadCN button
import { Input } from "@/components/ui/input"; // ShadCN input
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { TableDemo } from "./coPerMarks";
import { motion } from "framer-motion";


export function DataTableDemo({ coData, setCoData, coMin,setCOMin, coFin, setCOFin }) {
  const [data, setData] = [coData, setCoData];
  const [selectedRows, setSelectedRows] = useState([]);
  const [filters, setFilters] = useState({
    column: "",
    value: "",
  });

  const handleUpdateCO = () => {
    const totalStudents = data.length;

    if (totalStudents === 0) {
      alert("No student data available.");
      return;
    }

    const updatedCoFin = { ...coFin[0] };

    Object.keys(coMin[0]).forEach((coKey) => {
      const coThreshold = parseFloat(coMin[0][coKey]);
      const studentsAboveThreshold = data.filter(
        (student) => parseFloat(student[coKey]) > coThreshold
      ).length;

      const percentage = (studentsAboveThreshold / totalStudents) * 100;

      if (percentage >= 70) {
        updatedCoFin[coKey] = "3";
      } else if (percentage >= 60) {
        updatedCoFin[coKey] = "2";
      } else if (percentage >= 50) {
        updatedCoFin[coKey] = "1";
      } else {
        updatedCoFin[coKey] = "0";
      }
    });

    setCOFin([updatedCoFin]);
  };

  const memoizedData = useMemo(() => {
    if (filters.column && filters.value) {
      return data.filter((row) =>
        String(row[filters.column])
          .toLowerCase()
          .includes(filters.value.toLowerCase())
      );
    }
    return data;
  }, [data, filters]);

  const handleInputChange = useCallback((rowIndex, columnId) => (e) => {
    const value = e.target.value;
    setData((prevData) =>
      prevData.map((row, idx) =>
        idx === rowIndex ? { ...row, [columnId]: value } : row
      )
    );
  }, []);

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleAddRow = useCallback(() => {
    const newRow = {
      rollNumber: `CO${Date.now()}`,
      studentName: "New Student",
      CO1: "0",
      CO2: "0",
      CO3: "0",
      CO4: "0",
      CO5: "0",
      CO6: "0",
    };
    setData((prevData) => [...prevData, newRow]);
  }, []);

  const handleDeleteSelected = useCallback(() => {
    setData((prevData) => prevData.filter((_, idx) => !selectedRows.includes(idx)));
    setSelectedRows([]);
  }, [selectedRows]);

  const toggleRowSelection = (rowIndex) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(rowIndex)
        ? prevSelected.filter((index) => index !== rowIndex)
        : [...prevSelected, rowIndex]
    );
  };

  const columns = useMemo(
    () => [
      {
        header: "Select",
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={selectedRows.includes(row.index)}
            onChange={() => toggleRowSelection(row.index)}
            className="form-checkbox"
          />
        ),
      },
      {
        accessorKey: "rollNumber",
        header: "Roll Number",
        cell: ({ row, column }) => (
          <Input
            value={row.getValue(column.id)}
            onClick={(e) => e.stopPropagation()} // Prevent collapse on input click
            onChange={handleInputChange(row.index, column.id)}
            placeholder="Roll No."
            className="dark:bg-gray-800 dark:text-white border-none bg-white" // Dark mode styles
          />
        ),
      },
      {
        accessorKey: "studentName",
        header: "Student Name",
        cell: ({ row, column }) => (
          <Input
            value={row.getValue(column.id)}
            onClick={(e) => e.stopPropagation()} // Prevent collapse on input click
            onChange={handleInputChange(row.index, column.id)}
            placeholder="Student Name"
            className="dark:bg-gray-800 dark:text-white border-none bg-white" // Dark mode styles
          />
        ),
      },
      ...Array.from({ length: 6 }, (_, idx) => ({
        accessorKey: `CO${idx + 1}`,
        header: `CO${idx + 1}`,
        cell: ({ row, column }) => (
          <Input
            value={row.getValue(column.id)}
            onClick={(e) => e.stopPropagation()} // Prevent collapse on input click
            onChange={handleInputChange(row.index, column.id)}
            placeholder={`CO${idx + 1}`}
            className="dark:bg-gray-800 dark:text-white bg-white border-none" // Dark mode styles
          />
        ),
      })),
    ],
    [handleInputChange, selectedRows]
  );

  const table = useReactTable({
    data: memoizedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full space-y-4 dark:bg-gray-900 dark:text-white p-4">
      <div className="flex gap-4 ">
        <Button onClick={handleAddRow}>Add Row</Button>
        <Button
          onClick={handleDeleteSelected}
          variant="destructive"
          disabled={!selectedRows.length}
        >
          Delete Selected
        </Button>
        <Button onClick={handleUpdateCO}>Update CO Values</Button>
      </div>
      <div className="rounded-md bg-white p-4 shadow-md text-center border-black border-2 dark:bg-gray-800 dark:border-gray-700 ">
        <div className="flex gap-4 mb-4 w-[50%] ">
          <Select onValueChange={(value) => handleFilterChange("column", value)}>
            <SelectTrigger className="dark:border-white border-black">
              <SelectValue placeholder="Select Column" />
            </SelectTrigger>
            <SelectContent>
              {columns.map(
                (column) =>
                  column.accessorKey && (
                    <SelectItem key={column.accessorKey} value={column.accessorKey}>
                      {column.header}
                    </SelectItem>
                  )
              )}
            </SelectContent>
          </Select>
          <Input
            value={filters.value}
            onChange={(e) => handleFilterChange("value", e.target.value)}
            placeholder="Filter value"
            className="dark:bg-gray-800 dark:text-white dark:border-white border-black"
          />
        </div>
        <div className="overflow-auto max-h-[500px] ">
          <Table>
            <TableHeader className="dark:bg-gray-800">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-2 dark:bg-gray-800"
                >
                  {row.getVisibleCells().map((cell) => (
                    <motion.td
                      key={cell.id}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </motion.td>
                  ))}
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-center p-4">
        <div className="w-[50%] p-4">
          <TableDemo isEditable={true} data={coMin} setData={setCOMin} />
        </div>
        <div className="w-[50%] p-4">
          <TableDemo isEditable={false} data={coFin} setData={setCOFin} />
        </div>
      </div>
    </div>
  );
}
