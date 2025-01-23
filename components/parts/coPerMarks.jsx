import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { useState } from "react";
  
  export function TableDemo({ isEditable }) {
    const [coMarks, setCoMarks] = useState([
      {
        CO1: "1",
        CO2: "2",
        CO3: "3",
        CO4: "4",
        CO5: "5",
        CO6: "6",
      },
    ]);
  
    const handleInputChange = (e, column) => {
      const { value } = e.target;
      setCoMarks((prevMarks) =>
        prevMarks.map((row) => ({
          ...row,
          [column]: value,
        }))
      );
    };
  
    return (
      <Table className="rounded-xl border border-gray-200 p-4 bg-white shadow-lg">
        <TableCaption className="text-xl font-semibold text-gray-700">
          {isEditable? 'Minimum Marks Per CO' :'FINAL MARKS [CO - Attainment]'}
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-sm text-gray-600 text-center">CO1</TableHead>
            <TableHead className="text-sm text-gray-600 text-center">CO2</TableHead>
            <TableHead className="text-sm text-gray-600 text-center">CO3</TableHead>
            <TableHead className="text-sm text-gray-600 text-center">CO4</TableHead>
            <TableHead className="text-sm text-gray-600 text-center">CO5</TableHead>
            <TableHead className="text-sm text-gray-600 text-center">CO6</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coMarks.map((row, index) => (
            <TableRow key={index} className="hover:bg-gray-50">
              {Object.keys(row).map((column) => (
                <TableCell key={column} className="text-center">
                  {isEditable ? (
                    <input
                      type="text"
                      value={row[column]}
                      onChange={(e) => handleInputChange(e, column)}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    row[column]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  