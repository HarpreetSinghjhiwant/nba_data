"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

import { ChartContainer } from "@/components/ui/chart"

export function FinalCOMarks({ directData, inDirectData, overallData }) {

  const chartConfig = {
    colors: {
      CO1: "#2563eb",
      CO2: "#60a5fa",
      CO3: "#4ade80",
      CO4: "#f59e0b",
      CO5: "#e11d48",
      CO6: "#22d3ee",
      CO7: "#8b5cf6",
      CO8: "#f43f5e",
      CO9: "#34d399",
      CO10: "#fb923c",
    }
  };

  // Assuming overallData has keys CO1, CO2, etc. for each row
  const chartData = overallData.map((item) => ({
    name: item.Name, // Assuming each row has a "Name" field to show as the x-axis
    CO1: item.CO1,
    CO2: item.CO2,
    CO3: item.CO3,
    CO4: item.CO4,
    CO5: item.CO5,
    CO6: item.CO6,
    CO7: item.CO7,
    CO8: item.CO8,
    CO9: item.CO9,
    CO10: item.CO10,
  }));

  return (
    <>
    <div className="p-4">
      <Table className="rounded-xl border border-gray-200 p-4 bg-white shadow-lg">
        <TableCaption className="text-xl font-semibold text-gray-700">
          Direct CO - Attainment
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            {Object.keys(directData[0] || {}).map((column) => (
              <TableHead key={column} className="text-sm text-gray-600 text-center">
                {column}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {directData.map((row, rowIndex) => (
            <TableRow key={rowIndex} className="hover:bg-gray-50">
              {Object.keys(row).map((column) => (
                <TableCell key={column} className="text-center">
                  {row[column]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    
    <div className="p-4">
      <Table className="rounded-xl border border-gray-200 p-4 bg-white shadow-lg">
        <TableCaption className="text-xl font-semibold text-gray-700">
          Indirect CO - Attainment
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            {Object.keys(inDirectData[0] || {}).map((column) => (
              <TableHead key={column} className="text-sm text-gray-600 text-center">
                {column}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {inDirectData.map((row, rowIndex) => (
            <TableRow key={rowIndex} className="hover:bg-gray-50">
              {Object.keys(row).map((column) => (
                <TableCell key={column} className="text-center">
                  {row[column]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>

      <div className="p-4">
      <Table className="rounded-xl border border-gray-200 p-4 bg-white shadow-lg">
        <TableCaption className="text-xl font-semibold text-gray-700">
          Total CO - Attainment
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            {Object.keys(overallData[0] || {}).map((column) => (
              <TableHead key={column} className="text-sm text-gray-600 text-center">
                {column}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {overallData.map((row, rowIndex) => (
            <TableRow key={rowIndex} className="hover:bg-gray-50">
              {Object.keys(row).map((column) => (
                <TableCell key={column} className="text-center">
                  {row[column]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>

    <div className="flex justify-center text-center">
      <ChartContainer config={chartConfig} className="min-h-[200px] w-[50%] pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="CO1" fill={chartConfig.colors.CO1} radius={4} />
            <Bar dataKey="CO2" fill={chartConfig.colors.CO2} radius={4} />
            <Bar dataKey="CO3" fill={chartConfig.colors.CO3} radius={4} />
            <Bar dataKey="CO4" fill={chartConfig.colors.CO4} radius={4} />
            <Bar dataKey="CO5" fill={chartConfig.colors.CO5} radius={4} />
            <Bar dataKey="CO6" fill={chartConfig.colors.CO6} radius={4} />
            <Bar dataKey="CO7" fill={chartConfig.colors.CO7} radius={4} />
            <Bar dataKey="CO8" fill={chartConfig.colors.CO8} radius={4} />
            <Bar dataKey="CO9" fill={chartConfig.colors.CO9} radius={4} />
            <Bar dataKey="CO10" fill={chartConfig.colors.CO10} radius={4} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
      </div>
    </>
  );
}
