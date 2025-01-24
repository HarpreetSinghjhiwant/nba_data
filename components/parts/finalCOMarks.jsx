import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function FinalCOMarks({ directData, inDirectData, overallData }) {

  return (
    <>
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
    
    </>
  );
}

