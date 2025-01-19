"use client";

import React, { useState, useEffect } from "react";
import "@/styles/table.css";
import Pagination from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const PAGE_SIZE = 100;

interface TableRowData {
  id: number;
  isAccepted: string;
  operator: string;
  springType: string;
  height: number;
  outerDiameter: number;
  innerDiameter: number;
  perpendicularity: number;
  coilDiameter: number;
  controlDate: string;
}

const DataTable = () => {
  const [data, setData] = useState<TableRowData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/spring/paged?page=${currentPage}&pageSize=${PAGE_SIZE}`);
        if (!response.ok) throw new Error("Ошибка загрузки данных");
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

  const handleRowClick = (id: number) => {
    router.push(`/dashboard/image?id=${id}&page=${currentPage}`);
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
                  <TableRow 
                    key={row.id} 
                    className="table-row cursor-pointer text-center"
                    onClick={() => handleRowClick(row.id)}
                  >
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.isAccepted}</TableCell>
                    <TableCell>{row.operator}</TableCell>
                    <TableCell>{row.springType}</TableCell>
                    <TableCell>{row.height}</TableCell>
                    <TableCell>{row.outerDiameter}</TableCell>
                    <TableCell>{row.innerDiameter}</TableCell>
                    <TableCell>{row.perpendicularity}</TableCell>
                    <TableCell>{row.coilDiameter}</TableCell>
                    <TableCell>{row.controlDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </>
        )}
      </div>
    </div>
  );
};

export default DataTable;
