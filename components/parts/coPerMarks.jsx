import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TableDemo({ isEditable, data, setData }) {

  const handleInputChange = (e, rowIndex, column) => {
    const { value } = e.target;

    const updatedCoMarks = data.map((row, index) =>
      index === rowIndex
        ? {
            ...row,
            [column]: value,
          }
        : row
    );

    setData(updatedCoMarks); // Update local state
  };

  return (
    <Table className="rounded-xl border border-gray-200 p-4 bg-white dark:bg-gray-800 dark:border-gray-600 shadow-lg">
      <TableCaption className="text-xl font-semibold text-gray-700 dark:text-gray-300">
        {isEditable ? "Minimum Marks Per CO" : "FINAL MARKS [CO - Attainment]"}
      </TableCaption>
      <TableHeader>
        <TableRow className="bg-gray-100 dark:bg-gray-700">
          {Object.keys(data[0] || {}).map((column) => (
            <TableHead key={column} className="text-sm text-gray-600 text-center dark:text-gray-300">
              {column}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-600">
            {Object.keys(row).map((column) => (
              <TableCell key={column} className="text-center">
                {isEditable ? (
                  <input
                    type="text"
                    value={row[column]}
                    onChange={(e) => handleInputChange(e, rowIndex, column)}
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-700 dark:text-white"
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
