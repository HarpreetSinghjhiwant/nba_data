"use client";

import { DataTableDemo } from "@/components/parts/marks_data";
import { useState } from "react";

export default function Home() {
  const [expandedRow, setExpandedRow] = useState(null); // Track the expanded row index
  const [min1CO, setMinor1CO] = useState(
    [
      {
        CO1: "",
        CO2: "",
        CO3: "",
        CO4: "",
        CO5: "",
        CO6: "",
      }
    ]
  );
  const [min2CO, setMinor2CO] = useState(
    [
      {
        CO1: "",
        CO2: "",
        CO3: "",
        CO4: "",
        CO5: "",
        CO6: "",
      }
    ]
  );
  const [finCO, setfinCO] = useState(
    [
      {
        CO1: "",
        CO2: "",
        CO3: "",
        CO4: "",
        CO5: "",
        CO6: "",
      }
    ]
  );
  const [assCO, setassCO] = useState([
    {
      CO1: "",
      CO2: "",
      CO3: "",
      CO4: "",
      CO5: "",
      CO6: "",
    }
  ]);

  const toggleRow = (rowIndex) => {
    if (expandedRow === rowIndex) {
      setExpandedRow(null); // Collapse the row if it's already expanded
    } else {
      setExpandedRow(rowIndex); // Expand the clicked row
    }
  };

  return (
    <div className="p-4 flex flex-col justify-center gap-6">
      {/* First DataTableDemo row with down arrow toggle */}
      <div className="flex items-center gap-2 cursor-pointer bg-gray-400 w-full p-2 rounded-xl" onClick={() => toggleRow(0)}>
        <span className="text-xl">{expandedRow === 0 ? "↑" : "↓"}</span> {/* Toggle Arrow */}
        <span>Student Minor 1</span>
      </div>

      {expandedRow === 0 && (
        <DataTableDemo
          data={min1CO} setData={setMinor1CO}
        />
      )}

      {/* Second DataTableDemo row with down arrow toggle */}
      <div className="flex items-center gap-2 cursor-pointer bg-gray-400 w-full p-2 rounded-xl" onClick={() => toggleRow(1)}>
        <span className="text-xl">{expandedRow === 1 ? "↑" : "↓"}</span> {/* Toggle Arrow */}
        <span>Students Minor 2</span>
      </div>

      {expandedRow === 1 && (
        <DataTableDemo
          data={min2CO}
          setData={setMinor2CO}
        />
      )}

      <div className="flex items-center gap-2 cursor-pointer bg-gray-400 w-full p-2 rounded-xl" onClick={() => toggleRow(2)}>
        <span className="text-xl">{expandedRow === 2 ? "↑" : "↓"}</span> {/* Toggle Arrow */}
        <span>Students Assignment</span>
      </div>

      {expandedRow === 2 && (
        <DataTableDemo
          data={assCO}
          setData={setassCO}
        />
      )}

      <div className="flex items-center gap-2 cursor-pointer bg-gray-400 w-full p-2 rounded-xl" onClick={() => toggleRow(3)}>
        <span className="text-xl">{expandedRow === 3 ? "↑" : "↓"}</span> {/* Toggle Arrow */}
        <span>Students Final</span>
      </div>

      {expandedRow === 3 && (
        <DataTableDemo
          data={finCO}
          setData={setfinCO}
        />
      )}
    </div>
  );
}
