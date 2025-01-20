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
  const [data, setData] = useState<SpringSet[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

  useEffect(() => {
    const fetchData = async () => {
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
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, API_URL]);

  return (
    <div className="table-container">
      {/* Внутренний блок для прокрутки содержимого */}
        {loading && <p>Загрузка данных...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <>
            <Table>
              {/* Заголовок таблицы */}
              <TableHeader className="table-header">
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Номер комплекта</TableHead>
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
                  <TableRow key={set.id} className="text-center">
                    <TableCell>{set.id}</TableCell>
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

            {/* Пагинация */}
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
