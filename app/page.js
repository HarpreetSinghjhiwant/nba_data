"use client";

import { TableDemo } from "@/components/parts/coPerMarks";
import { FinalCOMarks } from "@/components/parts/finalCOMarks";
import { DataTableDemo } from "@/components/parts/marksData";
import { useState,useEffect } from "react";

export default function Home() {
  const [expandedRow, setExpandedRow] = useState(null); // Track the expanded row index
  const [min1CO, setMin1CO] = useState(
    [
      {
        CO1: "0",
        CO2: "0",
        CO3: "0",
        CO4: "0",
        CO5: "0",
        CO6: "0",
      },
    ]
  );
  const [min2CO, setMin2CO] = useState(
    [
      {
        CO1: "0",
        CO2: "0",
        CO3: "0",
        CO4: "0",
        CO5: "0",
        CO6: "0",
      },
    ]
  );
  const [finCO, setfinCO] = useState(
    [
      {
        CO1: "0",
        CO2: "0",
        CO3: "0",
        CO4: "0",
        CO5: "0",
        CO6: "0",
      },
    ]
  );
  const [assCO, setassCO] = useState([
    {
      CO1: "0",
      CO2: "0",
      CO3: "0",
      CO4: "0",
      CO5: "0",
      CO6: "0",
    },
  ]);
  const [directData, setDirectData] = useState([]);

  const [inDirectData, setInDirectData] = useState(
    [
      {
        COs: "Course Survey Feedback",
        CO1: "0",
        CO2: "0",
        CO3: "0",
        CO4: "0",
        CO5: "0",
        CO6: "0",
      },
    ]
  )

  const [overallData, setOverallData] = useState([]);

  useEffect(() => {
    calculateDirectData();
  }, [min1CO, min2CO, assCO, finCO]);

  useEffect(() => {
    calculateOverallData();
  }, [directData, inDirectData]);

  const calculateDirectData = () => {
    const coKeys = ["CO1", "CO2", "CO3", "CO4", "CO5", "CO6"];

    // Calculate Minor (max of min1CO and min2CO)
    const minor = coKeys.reduce((acc, co) => {
      acc[co] = Math.max(
        parseFloat(min1CO[0][co]),
        parseFloat(min2CO[0][co])
      ).toFixed(2);
      return acc;
    }, {});

    // Calculate Minor * 0.3 + Assignment * 0.2 + ESE * 0.5
    const weighted = coKeys.reduce((acc, co) => {
      acc[co] = (
        minor[co] * 0.3 +
        assCO[0][co] * 0.2 +
        finCO[0][co] * 0.5
      ).toFixed(2);
      return acc;
    }, {});

    // Prepare directData
    const data = [
      { COs: "Minor", ...minor },
      { COs: "Assignment", ...assCO[0] },
      { COs: "ESE", ...finCO[0] },
      { COs: "Total", ...weighted },
    ];
    setDirectData(data);
  };

  const calculateOverallData = () => {
    if (!directData.length || !inDirectData.length) return;

    const coKeys = ["CO1", "CO2", "CO3", "CO4", "CO5", "CO6", "CO7", "CO8", "CO9", "CO10"];

    // Get weighted row from directData
    const weightedDirect = directData.find((row) => row.COs === "Total");

    // Calculate average for overall attainment
    const overall = coKeys.reduce((acc, co) => {
      acc[co] = (
        (parseFloat(weightedDirect[co]) + parseFloat(inDirectData[0][co])) /
        2
      ).toFixed(2);
      return acc;
    }, {});

    // Prepare overallData
    const data = [{ COs: "Overall Attainment", ...overall }];
    setOverallData(data);
  };



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
          coData={min1CO} setCoData={setMin1CO}
        />
      )}

      {/* Second DataTableDemo row with down arrow toggle */}
      <div className="flex items-center gap-2 cursor-pointer bg-gray-400 w-full p-2 rounded-xl" onClick={() => toggleRow(1)}>
        <span className="text-xl">{expandedRow === 1 ? "↑" : "↓"}</span> {/* Toggle Arrow */}
        <span>Students Minor 2</span>
      </div>

      {expandedRow === 1 && (
        <DataTableDemo
          coData={min2CO}
          setCoData={setMin2CO}
        />
      )}

      <div className="flex items-center gap-2 cursor-pointer bg-gray-400 w-full p-2 rounded-xl" onClick={() => toggleRow(2)}>
        <span className="text-xl">{expandedRow === 2 ? "↑" : "↓"}</span> {/* Toggle Arrow */}
        <span>Students Assignment</span>
      </div>

      {expandedRow === 2 && (
        <DataTableDemo
        coData={assCO}
          setCoData={setassCO}
        />
      )}

      <div className="flex items-center gap-2 cursor-pointer bg-gray-400 w-full p-2 rounded-xl" onClick={() => toggleRow(3)}>
        <span className="text-xl">{expandedRow === 3 ? "↑" : "↓"}</span> {/* Toggle Arrow */}
        <span>Students Final</span>
      </div>

      {expandedRow === 3 && (
        <DataTableDemo
        coData={finCO}
          setCoData={setfinCO}
        />
      )}

      <div className="flex items-center gap-2 cursor-pointer bg-gray-400 w-full p-2 rounded-xl" onClick={() => toggleRow(4)}>
        <span className="text-xl">{expandedRow === 4 ? "↑" : "↓"}</span> {/* Toggle Arrow */}
        <span>Final CO Calculation</span>
      </div>

      {expandedRow === 4 && (
          <FinalCOMarks
            directData={directData}
            overallData={overallData}
            inDirectData={inDirectData}
          />
      )}
    </div>
  );
}
