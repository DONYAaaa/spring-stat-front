"use client";

import React, { useState, useEffect } from "react";
import "@/styles/table.css";
import Pagination from "@/components/ui/Pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockSpringSets } from "@/lib/mockSpringSets"; // Добавили поддержку моковых данных

interface SpringSet {
  id: number;
  setNumber: string;
  controlDate: string;
  duration: number;
  status: string;
  actualChanges: number;
  theoreticalReplacements: number;
}

const PAGE_SIZE = 10; // Количество записей на страницу

const SpringSetTable = () => {
  const [data, setData] = useState<SpringSet[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || ""; // Проверяем, что API_URL определён

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!API_URL) {
          throw new Error("API_URL не задан в .env.local");
        }

        const response = await fetch(`${API_URL}/api/springSets/paged?page=${currentPage}&pageSize=${PAGE_SIZE}`);
        if (!response.ok) {
          throw new Error("Ошибка загрузки данных с сервера");
        }

        const result: { data: SpringSet[]; totalPages: number } = await response.json();
        setData(result.data);
        setTotalPages(result.totalPages);
      } catch (error: any) {
        console.error(error);
        setError(error.message);
        setData(mockSpringSets.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)); // Используем моковые данные при ошибке
        setTotalPages(Math.ceil(mockSpringSets.length / PAGE_SIZE));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

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
                  <TableRow key={set.id} className="text-center">
                    <TableCell>{set.id}</TableCell>
                    <TableCell>{set.setNumber}</TableCell>
                    <TableCell>{set.controlDate}</TableCell>
                    <TableCell>{set.duration} мин</TableCell>
                    <TableCell>{set.status}</TableCell>
                    <TableCell>{set.actualChanges}</TableCell>
                    <TableCell>{set.theoreticalReplacements}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </div>

      {/* Фиксированная пагинация */}
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
};

export default SpringSetTable;
