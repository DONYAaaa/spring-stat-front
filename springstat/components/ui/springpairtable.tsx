"use client";

import React, { useState } from "react";
import "@/styles/table.css";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TableSe from "@/components/ui/table-cont";
import { mockData } from "@/lib/mockDataTwo";

interface SpringPair {
  id: number;
  setId: number;
  innerSpring: string;
  outerSpring: string;
  wedgeSpring: string;
}

const SpringPairTable = ({ data }: { data: SpringPair[] }) => {
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);

  const handleRowClick = (id: number) => {
    setSelectedRowId(selectedRowId === id ? null : id);
  };

  return (
    <div className="table-container">
      <div className="table-scroll">
        <Table>
          <TableHeader className="table-header">
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>ID комплекта</TableHead>
              <TableHead>Номер внутренней</TableHead>
              <TableHead>Номер наружной</TableHead>
              <TableHead>Номер подклиновой</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((pair) => (
              <React.Fragment key={pair.id}>
                {/* Основная строка */}
                <TableRow
                  className={`text-center table-row cursor-pointer ${
                    selectedRowId === pair.id ? "bg-gray-200" : ""
                  }`}
                  onClick={() => handleRowClick(pair.id)}
                >
                  <TableCell>{pair.id}</TableCell>
                  <TableCell>{pair.setId}</TableCell>
                  <TableCell>{pair.innerSpring}</TableCell>
                  <TableCell>{pair.outerSpring}</TableCell>
                  <TableCell>{pair.wedgeSpring}</TableCell>
                </TableRow>

                {/* Дополнительная информация (появляется под выбранной строкой) */}
                {selectedRowId === pair.id && (
                  <TableRow className="bg-gray-100">
                    <TableCell colSpan={5} className="text-center p-4">
                        <TableSe data={mockData} />
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SpringPairTable;
