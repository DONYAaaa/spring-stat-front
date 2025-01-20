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
  TableRow 
} from "@/components/ui/table";
import PhotoModal from "@/components/ui/photo-modal";

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
  imageUrl?: string | null;
}

const PAGE_SIZE = 100;

const DataTable = () => {
  const [data, setData] = useState<TableRowData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedRow, setSelectedRow] = useState<TableRowData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_URL}/api/spring/paged?page=${currentPage}&pageSize=${PAGE_SIZE}`
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

  const handleRowClick = async (row: TableRowData) => {
    if (selectedRow?.id === row.id) {
      setSelectedRow(null);
      setIsModalOpen(false);
      return;
    }

    setSelectedRow(row);
    setIsModalOpen(true);

    if (!row.imageUrl) {
      try {
        const response = await fetch(`${API_URL}/api/spring/${row.id}/photo`);
        if (!response.ok) throw new Error("Фото не найдено");

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setSelectedRow((prev) => (prev ? { ...prev, imageUrl: url } : prev));
      } catch {
        setSelectedRow((prev) => (prev ? { ...prev, imageUrl: null } : prev));
      }
    }
  };

  return (
    <div className="table-container">
      {/* Этот блок — скроллируемый контейнер */}
      <div className="table-scroll">
        {loading && <p>Загрузка данных...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <>
            {/* ОДИН общий <Table> для заголовка и тела */}
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
                  className={`cursor-pointer text-center ${
                      selectedRow?.id === row.id ? "bg-gray-200" : ""
                    }`}
                    onClick={() => handleRowClick(row)}
                    >
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.isAccepted}</TableCell>
                    <TableCell>{row.operator}</TableCell>
                    <TableCell>{row.springType}</TableCell>
                    <TableCell>{row.height.toFixed(2)}</TableCell>
                    <TableCell>{row.outerDiameter.toFixed(2)}</TableCell>
                    <TableCell>{row.innerDiameter.toFixed(2)}</TableCell>
                    <TableCell>{row.perpendicularity.toFixed(2)}</TableCell>
                    <TableCell>{row.coilDiameter.toFixed(2)}</TableCell>
                    <TableCell>{row.controlDate}</TableCell>
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

      {/* Модальное окно с фото (вне прокручиваемой области) */}
      <PhotoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageUrl={selectedRow?.imageUrl || ""}
      />
    </div>
  );
};

export default DataTable;
