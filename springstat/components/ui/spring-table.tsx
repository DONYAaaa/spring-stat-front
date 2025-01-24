"use client";

import React, { useState, useEffect } from "react";
import "@/styles/table.css";
import Pagination from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation"; 

// Тип для каждой строки таблицы
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
  // Новые поля — при запросе одной конкретной пружины
  pairNumber?: number;
  isWedge?: string;
  imageUrl?: string | null; 
}

interface DataTableProps {
  setId?: string;
}

const PAGE_SIZE = 100;

const DataTable: React.FC<DataTableProps> = ({ setId }) => {
  const router = useRouter();
  const [data, setData] = useState<TableRowData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Индикаторы состояния
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        let response: Response;

        // Если есть setId, грузим одну запись из SpringSet
        if (setId && setId.trim() !== "") {
          response = await fetch(`${API_URL}/api/SpringSet/${setId}`);
        } else {
          // Иначе грузим пагинированно из SpringContinuous
          response = await fetch(
            `${API_URL}/api/SpringContinuous/paged?page=${currentPage}&pageSize=${PAGE_SIZE}`
          );
        }

        if (!response.ok) {
          throw new Error("Ошибка загрузки данных");
        }

        const result = await response.json();

        // Если запросили одну пружину (setId), результат может быть объектом или массивом
        if (setId && setId.trim() !== "") {
          const singleData = Array.isArray(result) ? result : [result];
          setData(singleData);
          setTotalPages(1); // только одна страница
        } else {
          // Если список, предполагаем, что бэкенд возвращает { data, totalCount }
          setData(result.data);
          setTotalPages(Math.ceil(result.totalCount / PAGE_SIZE));
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Если меняется setId, сбрасываем страницу на 1
  }, [API_URL, setId, currentPage]);

  // Вместо открытия модального окна — переходим на страницу /dashboard/spring/[id]
  const handleRowClick = (row: TableRowData) => {
    router.push(`/dashboard/spring/${row.id}`);
  };

  return (
    <div className="table-container">
      {loading && <p>Загрузка данных...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <Table>
            <TableHeader className="table-header">
              <TableRow>
                {setId && setId.trim() !== "" && (
                  <>
                    <TableHead>Номер пары</TableHead>
                    <TableHead>Подклиновая</TableHead>
                  </>
                )}
                <TableHead>Результат Контроля</TableHead>
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
                  className="table-row cursor-pointer text-center hover:bg-gray-200"
                  onClick={() => handleRowClick(row)}
                >
                  {setId && setId.trim() !== "" && (
                    <>
                      <TableCell>{row.pairNumber ?? ""}</TableCell>
                      <TableCell>{row.isWedge ?? ""}</TableCell>
                    </>
                  )}
                  <TableCell>{row.isAccepted}</TableCell>
                  <TableCell>{row.springType}</TableCell>
                  <TableCell>{row.height.toFixed(2)}</TableCell>
                  <TableCell>{row.outerDiameter.toFixed(2)}</TableCell>
                  <TableCell>{row.innerDiameter.toFixed(2)}</TableCell>
                  <TableCell>{row.perpendicularity.toFixed(2)}</TableCell>
                  <TableCell>{row.coilDiameter}</TableCell>
                  <TableCell>{row.controlDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Пагинация показывается только если нет конкретного setId */}
          {(!setId || setId.trim() === "") && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default DataTable;
