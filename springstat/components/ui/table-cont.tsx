"use client";

import React, { useState, useEffect } from "react";
import "@/styles/table.css";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TableRowData {
  id: number;
  inspectionResult: string;
  operator: string;
  springType: string;
  height: number;
  outerDiameter: number;
  innerDiameter: number;
  perpendicularityDeviation: number;
  wireDiameter: number;
  controlDate: string;
  pngPhotoSidePoints: string | null; // Фото передаётся как Base64
}

const DataTable = () => {
  const [data, setData] = useState<TableRowData[]>([]);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/spring/all`);
        if (!response.ok) {
          throw new Error("Ошибка загрузки данных");
        }
        const result: TableRowData[] = await response.json();

        // Преобразуем бинарные фото в Base64
        const transformedData = result.map(row => ({
          ...row,
          pngPhotoSidePoints: row.pngPhotoSidePoints ? `data:image/png;base64,${row.pngPhotoSidePoints}` : null
        }));

        setData(transformedData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  const handleRowClick = (id: number) => {
    setSelectedRowId(selectedRowId === id ? null : id);
  };

  return (
    <div className="table-container">
      <div className="table-scroll">
        {loading && <p>Загрузка данных...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <Table>
            <TableHeader className="table-header">
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Результат Контроля</TableHead>
                <TableHead>Оператор</TableHead>
                <TableHead>Тип пружины</TableHead>
                <TableHead>Высота</TableHead>
                <TableHead>Наружный Диаметр</TableHead>
                <TableHead>Внутренний Диаметр</TableHead>
                <TableHead>Отклонение</TableHead>
                <TableHead>Диаметр Прутка</TableHead>
                <TableHead>Дата Контроля</TableHead>
              </TableRow>
            </TableHeader>

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

                  {selectedRowId === row.id && row.pngPhotoSidePoints && (
                    <TableRow className="bg-gray-100">
                      <TableCell colSpan={10} className="text-center p-4">
                        <img src={row.pngPhotoSidePoints} alt="Фото пружины" className="max-w-xs mx-auto" />
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default DataTable;
