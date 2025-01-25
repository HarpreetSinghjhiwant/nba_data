"use client";

import React, { useState, useMemo, useCallback } from "react";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import {
  Table,
  TableBody,
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
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog"; // ShadCN Dialog

export function DataTableDemo({ coData, setCoData, coMin, setCOMin, coFin, setCOFin }) {
  const [data, setData] = [coData, setCoData];
  const [selectedRows, setSelectedRows] = useState([]);
  const [filters, setFilters] = useState({
    column: "",
    value: "",
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [thresholds, setThresholds] = useState({
    "3": 70,
    "2": 60,
    "1": 50,
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

      // Get the latest threshold values from the state (thresholds)
      const threshold70 = parseFloat(thresholds["3"]);
      const threshold60 = parseFloat(thresholds["2"]);
      const threshold50 = parseFloat(thresholds["1"]);

      if (percentage >= threshold70) {
        updatedCoFin[coKey] = "3";
      } else if (percentage >= threshold60) {
        updatedCoFin[coKey] = "2";
      } else if (percentage >= threshold50) {
        updatedCoFin[coKey] = "1";
      } else {
        updatedCoFin[coKey] = "0";
      }
    });

    setCOFin([updatedCoFin]);
  };


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

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleThresholdChange = (coKey, value) => {
    setThresholds((prevThresholds) => ({
      ...prevThresholds,
      [coKey]: value,
    }));
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
            className="dark:bg-gray-800 dark:text-white border-none bg-white"
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
            className="dark:bg-gray-800 dark:text-white border-none bg-white"
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
            className="dark:bg-gray-800 dark:text-white bg-white border-none"
          />
        ),
      })),
    ],
    [handleInputChange, selectedRows]
  );

  const table = useReactTable({
    data,
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
        <Button onClick={handleDialogOpen}>Update Thresholds</Button> {/* Open Dialog */}
      </div>
      <div className="rounded-md bg-white p-4 shadow-md text-center border-black border-2 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex gap-4 mb-4 w-[50%]">
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
        <div className="overflow-auto max-h-[500px]">
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

      {/* ShadCN Dialog for Threshold Updates */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="w-[300px]">
          <DialogHeader>
            <DialogTitle className="text-center p-2">Update CO Thresholds</DialogTitle>
            {/* <DialogDescription>
              Update the percentage thresholds for CO ratings (70%, 60%, etc.).
            </DialogDescription> */}
          </DialogHeader>
          <div className="space-y-4">
            {["3", "2", "1"].map((coKey) => (
              <div key={coKey} className="flex items-center gap-2">
                <span>{coKey}</span>
                <Input
                  value={thresholds[coKey] || ""}
                  onChange={(e) => handleThresholdChange(coKey, e.target.value)}
                  placeholder="Enter Threshold"
                  className="dark:bg-gray-800 dark:text-white bg-white"
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={handleDialogClose}>Close</Button>
            <Button
              onClick={() => {
                // Apply the thresholds and close the dialog
                handleUpdateCO();  // Ensure the CO values are updated when thresholds are applied
                handleDialogClose();
              }}
            >
              Apply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


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
