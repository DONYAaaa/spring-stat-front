"use client";

import React, { useState } from "react";
import "@/styles/table.css";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TableRowData {
  id: number;
  inspectionResult: string; // Новый столбец "Результат Контроля"
  operator: string;
  springType: string;
  height: number;
  outerDiameter: number;
  innerDiameter: number;
  perpendicularityDeviation: number;
  wireDiameter: number;
  controlDate: string;
}

const DataTable = ({ data }: { data: TableRowData[] }) => {
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);

  const handleRowClick = (id: number) => {
    setSelectedRowId(selectedRowId === id ? null : id);
  };

  return (
    <div className="table-container">
      {/* Общий контейнер с прокруткой */}
      <div className="table-scroll">
        <Table>
          {/* Заголовок фиксирован */}
          <TableHeader className="table-header">
            <TableRow>
              <TableHead className="px-2 py-1">ID</TableHead>
              <TableHead className="px-2 py-1">Результат Контроля</TableHead>
              <TableHead className="px-2 py-1">Оператор</TableHead>
              <TableHead className="px-2 py-1">Тип пружины</TableHead>
              <TableHead className="px-2 py-1">Высота</TableHead>
              <TableHead className="px-2 py-1">Наружный Диаметр</TableHead>
              <TableHead className="px-2 py-1">Внутренний Диаметр</TableHead>
              <TableHead className="px-2 py-1">Отклонение</TableHead>
              <TableHead className="px-2 py-1">Диаметр Прутка</TableHead>
              <TableHead className="px-2 py-1">Дата Контроля</TableHead>
            </TableRow>
          </TableHeader>

          {/* Тело таблицы */}
          <TableBody>
            {data.map((row) => (
              <React.Fragment key={row.id}>
                <TableRow
                  className={`table-row cursor-pointer text-center ${
                    selectedRowId === row.id ? "bg-gray-200" : ""
                  }`}
                  onClick={() => handleRowClick(row.id)}
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.inspectionResult}</TableCell>
                  <TableCell>{row.operator}</TableCell>
                  <TableCell>{row.springType}</TableCell>
                  <TableCell>{row.height}</TableCell>
                  <TableCell>{row.outerDiameter}</TableCell>
                  <TableCell>{row.innerDiameter}</TableCell>
                  <TableCell>{row.perpendicularityDeviation}</TableCell>
                  <TableCell>{row.wireDiameter}</TableCell>
                  <TableCell>{row.controlDate}</TableCell>
                </TableRow>

                {/* Заглушка (появляется под выбранной строкой) */}
                {selectedRowId === row.id && (
                  <TableRow className="bg-gray-100">
                    <TableCell colSpan={10} className="text-center p-4">
                      🔍 Здесь будет детальная информация о контроле!
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

export default DataTable;
