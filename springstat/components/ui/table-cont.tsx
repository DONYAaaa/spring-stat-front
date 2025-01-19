"use client";

import React, { useState, useEffect } from "react";
import "@/styles/table.css";
import Pagination from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TableRowData {
  id: number;
  IsAccepted: string;
  operator: string;
  springType: string;
  height: number;
  outerDiameter: number;
  innerDiameter: number;
  perpendicularity: number;
  coilDiameter: number;
  controlDate: string;
}

const PAGE_SIZE = 20;

const DataTable = () => {
  const [data, setData] = useState<TableRowData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Вычисляем динамически
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [photoLoading, setPhotoLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/spring/paged?page=${currentPage}&pageSize=${PAGE_SIZE}`);
        if (!response.ok) {
          throw new Error("Ошибка загрузки данных");
        }
        const result = await response.json();
        setData(result.data);
        setTotalPages(Math.ceil(result.totalCount / PAGE_SIZE));
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [currentPage]);

  const handleRowClick = async (id: number) => {
    if (selectedRowId === id) {
      setSelectedRowId(null);
      setPhotoUrl(null);
      return;
    }

    setSelectedRowId(id);
    setPhotoLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/spring/${id}/photo`);
      if (!response.ok) {
        throw new Error("Фото не найдено");
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setPhotoUrl(url);
    } catch (error) {
      setPhotoUrl(null);
    } finally {
      setPhotoLoading(false);
    }
  };

  return (
    <div className="table-container">
      <div className="table-scroll">
        {loading && <p>Загрузка данных...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <>
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
                      <TableCell>{row.IsAccepted}</TableCell>
                      <TableCell>{row.operator}</TableCell>
                      <TableCell>{row.springType}</TableCell>
                      <TableCell>{row.height.toFixed(2)}</TableCell>
                      <TableCell>{row.outerDiameter.toFixed(2)}</TableCell>
                      <TableCell>{row.innerDiameter.toFixed(2)}</TableCell>
                      <TableCell>{row.perpendicularity.toFixed(2)}</TableCell>
                      <TableCell>{row.coilDiameter.toFixed(2)}</TableCell>
                      <TableCell>{row.controlDate}</TableCell>
                    </TableRow>

                    {selectedRowId === row.id && (
                      <TableRow className="bg-gray-100">
                        <TableCell colSpan={10} className="text-center p-4">
                          {photoLoading ? (
                            <p>Загрузка фото...</p>
                          ) : photoUrl ? (
                            <img 
                              src={photoUrl} 
                              alt="Фото пружины" 
                              className="max-w-xs mx-auto border border-gray-300 shadow-md"
                            />
                          ) : (
                            <p>Фото не найдено</p>
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>

            {/* Подключаем пагинацию */}
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={setCurrentPage} 
            />
          </>
        )}
      </div>
    </div>
  );
};

export default DataTable;
