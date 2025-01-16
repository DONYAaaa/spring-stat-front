"use client";

import React, { useState } from "react";
import "@/styles/table.css";
import SpringPairs from "@/components/ui/springpairtable";
import { mockSpringPairs } from "@/lib/mockSpringPairsSeven";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface SpringSet {
  id: number;
  setNumber: string;
  controlDate: string;
  duration: number;
  status: string;
  actualChanges: number;
  theoreticalReplacements: number;
}

const SpringSetTable = ({ data }: { data: SpringSet[] }) => {
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
              <TableHead>Номер комплекта</TableHead>
              <TableHead>Дата контроля</TableHead>
              <TableHead>Длительность</TableHead>
              <TableHead>Состояние комплекта</TableHead>
              <TableHead>Кол-во факт. изменений</TableHead>
              <TableHead>Кол-во теор. замен</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((set) => (
              <React.Fragment key={set.id}>
                {/* Основная строка */}
                <TableRow
                  className={`text-center table-row cursor-pointer ${
                    selectedRowId === set.id ? "bg-gray-200" : ""
                  }`}
                  onClick={() => handleRowClick(set.id)}
                >
                  <TableCell>{set.id}</TableCell>
                  <TableCell>{set.setNumber}</TableCell>
                  <TableCell>{set.controlDate}</TableCell>
                  <TableCell>{set.duration} мин</TableCell>
                  <TableCell>{set.status}</TableCell>
                  <TableCell>{set.actualChanges}</TableCell>
                  <TableCell>{set.theoreticalReplacements}</TableCell>
                </TableRow>

                {/* Дополнительная информация (появляется под выбранной строкой) */}
                {selectedRowId === set.id && (
                  <TableRow className="bg-gray-100">
                    <TableCell colSpan={7} className="text-center p-4">
                        <SpringPairs data={mockSpringPairs} />
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

export default SpringSetTable;
