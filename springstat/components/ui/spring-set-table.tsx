"use client";

import { useRouter } from "next/navigation";
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

interface SpringSet {
  id: number;
  numberSet: string;
  controlDate: string;
  operator: string;
  duration: number;
  status: string;
  actualChanges: number;
  theoreticalReplacements: number;
}

const PAGE_SIZE = 100;

const SpringSetTable = () => {
  const router = useRouter();
  
  const [data, setData] = useState<SpringSet[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${API_URL}/api/springSets/paged?page=${currentPage}&pageSize=${PAGE_SIZE}`
        );
        if (!response.ok) {
          throw new Error("Ошибка загрузки данных");
        }
        const result = await response.json();

        setData(result.data);
        setTotalPages(Math.ceil(result.totalCount / PAGE_SIZE));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, API_URL]);

  // Обработчик клика на всю строку
  const handleRowClick = (id: number) => {
    router.push(`/dashboard/by-set/${id}`);
  };

  return (
    <div className="table-container text-sm">
      {loading && <p>Загрузка данных...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <>
          <div className="overflow-x-auto mb-2">
            <Table>
              <TableHeader className="table-header">
                <TableRow>
                  <TableHead>Номер БР</TableHead>
                  <TableHead>Дата контроля</TableHead>
                  <TableHead>Оператор</TableHead>
                  <TableHead>Длительность</TableHead>
                  <TableHead>Состояние комплекта</TableHead>
                  <TableHead>Кол-во факт. изменений</TableHead>
                  <TableHead>Кол-во теор. замен</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((set) => (
                  <TableRow
                    key={set.id}
                    className="text-center hover:bg-gray-100 hover:cursor-pointer"
                    onClick={() => handleRowClick(set.id)}
                  >
                    <TableCell>{set.numberSet}</TableCell>
                    <TableCell>{set.controlDate}</TableCell>
                    <TableCell>{set.operator}</TableCell>
                    <TableCell>{set.duration} мин</TableCell>
                    <TableCell>{set.status}</TableCell>
                    <TableCell>{set.actualChanges}</TableCell>
                    <TableCell>{set.theoreticalReplacements}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default SpringSetTable;
