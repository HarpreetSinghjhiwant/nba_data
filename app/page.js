"use client";

import { FinalCOMarks } from "@/components/parts/finalCOMarks";
import { DataTableDemo } from "@/components/parts/marksData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // Import ShadCN Tabs components
import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion
import { ModeToggle } from "@/components/parts/modeToggle";

export default function Home() {
  const [min1CO, setMin1CO] = useState([
    {
      CO1: "0",
      CO2: "0",
      CO3: "0",
      CO4: "0",
      CO5: "0",
      CO6: "0",
    },
  ]);

  const [min1COMin, setMin1COMin] = useState([
    {
      CO1: "1",
      CO2: "1",
      CO3: "1",
      CO4: "1",
      CO5: "1",
      CO6: "1",
    },
  ]);
  const [min2COMin, setMin2COMin] = useState([
    {
      CO1: "1",
      CO2: "1",
      CO3: "1",
      CO4: "1",
      CO5: "1",
      CO6: "1",
    },
  ]);
  const [assCOMin, setAssCOMin] = useState([
    {
      CO1: "1",
      CO2: "1",
      CO3: "1",
      CO4: "1",
      CO5: "1",
      CO6: "1",
    },
  ]);
  const [finCOMin, setFinCOMin] = useState([
    {
      CO1: "1",
      CO2: "1",
      CO3: "1",
      CO4: "1",
      CO5: "1",
      CO6: "1",
    },
  ]);

  const [min1Data,setMin1Data] = useState([]);
  const [min2Data,setMin2Data] = useState([]);
  const [assData,setAssData] = useState([]);
  const [finData,setFinData] = useState([]);

  const [min2CO, setMin2CO] = useState([
    {
      CO1: "0",
      CO2: "0",
      CO3: "0",
      CO4: "0",
      CO5: "0",
      CO6: "0",
    },
  ]);
  const [finCO, setfinCO] = useState([
    {
      CO1: "0",
      CO2: "0",
      CO3: "0",
      CO4: "0",
      CO5: "0",
      CO6: "0",
    },
  ]);
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
  const [inDirectData, setInDirectData] = useState([
    {
      COs: "Course Survey Feedback",
      CO1: "0.00",
      CO2: "0.00",
      CO3: "0.00",
      CO4: "0.00",
      CO5: "0.00",
      CO6: "0.00",
      CO7: "0.00",
      CO8: "0.00",
      CO9: "0.00",
      CO10: "0.00",
    },
  ]);
  const [overallData, setOverallData] = useState([]);

  useEffect(() => {
    calculateDirectData();
  }, [min1CO, min2CO, assCO, finCO]);

  useEffect(() => {
    calculateOverallData();
  }, [directData, inDirectData]);

  const calculateDirectData = () => {
    const coKeys = [
      "CO1",
      "CO2",
      "CO3",
      "CO4",
      "CO5",
      "CO6",
      "CO7",
      "CO8",
      "CO9",
      "CO10",
    ];

    const fillMissingCOs = (data) => {
      return coKeys.reduce((acc, co) => {
        acc[co] = parseFloat(data[co]) ? parseFloat(data[co]).toFixed(2) : "0.00";
        return acc;
      }, {});
    };

    const filledMin1CO = fillMissingCOs(min1CO[0]);
    const filledMin2CO = fillMissingCOs(min2CO[0]);
    const filledAssCO = fillMissingCOs(assCO[0]);
    const filledFinCO = fillMissingCOs(finCO[0]);

    const minor = coKeys.reduce((acc, co) => {
      const val = Math.max(
        parseFloat(filledMin1CO[co]) || 0,
        parseFloat(filledMin2CO[co]) || 0
      );
      acc[co] = isNaN(val) ? "0.00" : val.toFixed(2);
      return acc;
    }, {});

    const weighted = coKeys.reduce((acc, co) => {
      const minorVal = parseFloat(minor[co]) || 0;
      const assVal = parseFloat(filledAssCO[co]) || 0;
      const finVal = parseFloat(filledFinCO[co]) || 0;

      const val = minorVal * 0.3 + assVal * 0.2 + finVal * 0.5;
      acc[co] = isNaN(val) ? "0.00" : val.toFixed(2);
      return acc;
    }, {});

    const data = [
      { COs: "Minor", ...minor },
      { COs: "Assignment", ...filledAssCO },
      { COs: "ESE", ...filledFinCO },
      { COs: "Total", ...weighted },
    ];
    setDirectData(data);
  };

  const calculateOverallData = () => {
    if (!directData.length || !inDirectData.length) return;

    const coKeys = [
      "CO1",
      "CO2",
      "CO3",
      "CO4",
      "CO5",
      "CO6",
      "CO7",
      "CO8",
      "CO9",
      "CO10",
    ];

    const weightedDirect = directData.find((row) => row.COs === "Total");

    const overall = coKeys.reduce((acc, co) => {
      const weightedVal = parseFloat(weightedDirect[co]) || 0;
      const inDirectVal = parseFloat(inDirectData[0][co]) || 0;

      const val = (weightedVal + inDirectVal) / 2;
      acc[co] = isNaN(val) ? "0.00" : val.toFixed(2);
      return acc;
    }, {});

    const data = [{ COs: "Overall Attainment", ...overall }];
    setOverallData(data);
  };

  return (
    <div className="p-4 flex flex-col justify-center gap-6">
      <Tabs defaultValue="minor1">
        <TabsList className="flex justify-center gap-4 text-center p-8">
          <TabsTrigger className="text-xl px-6 py-3" value="minor1">Minor 1</TabsTrigger>
          <TabsTrigger className="text-xl px-6 py-3" value="minor2">Minor 2</TabsTrigger>
          <TabsTrigger className="text-xl px-6 py-3" value="assignment">Assignment</TabsTrigger>
          <TabsTrigger className="text-xl px-6 py-3" value="final">Final</TabsTrigger>
          <TabsTrigger className="text-xl px-6 py-3" value="finalCO">Final CO Calculation</TabsTrigger>
          <ModeToggle/>
        </TabsList>

        <TabsContent value="minor1">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader className="flex items-center gap-2">
                <CardTitle>Student Minor 1</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTableDemo coData={min1Data} setCoData={setMin1Data} coMin={min1COMin} setCOMin={setMin1COMin} coFin={min1CO} setCOFin={setMin1CO}/>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="minor2">
          <motion.div
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader className="flex items-center gap-2">
                <CardTitle>Student Minor 2</CardTitle>
              </CardHeader>
              <CardContent>
              <DataTableDemo coData={min2Data} setCoData={setMin2Data} coMin={min2COMin} setCOMin={setMin2COMin} coFin={min2CO} setCOFin={setMin2CO}/>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="assignment">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader className="flex items-center gap-2">
                <CardTitle>Student Assignment</CardTitle>
              </CardHeader>
              <CardContent>
              <DataTableDemo coData={assData} setCoData={setAssData} coMin={assCOMin} setCOMin={setAssCOMin} coFin={assCO} setCOFin={setassCO}/>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="final">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader className="flex items-center gap-2">
                <CardTitle>Student Final</CardTitle>
              </CardHeader>
              <CardContent>
              <DataTableDemo coData={finData} setCoData={setFinData} coMin={finCOMin} setCOMin={setFinCOMin} coFin={finCO} setCOFin={setfinCO}/>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="finalCO">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader className="flex items-center gap-2">
                <CardTitle>Final CO Calculation</CardTitle>
              </CardHeader>
              <CardContent>
                <FinalCOMarks directData={directData} overallData={overallData} inDirectData={inDirectData} />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
