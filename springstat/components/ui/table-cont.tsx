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
import PhotoModal from "@/components/ui/photo-modal"; // Модальное окно с фото

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
  imageUrl?: string | null; // Фото (если уже загружено)
}

// Пропсы компонента, где setId - опционально
interface DataTableProps {
  setId?: string;
}

const PAGE_SIZE = 100;

const DataTable: React.FC<DataTableProps> = ({ setId }) => {
  const [data, setData] = useState<TableRowData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedRow, setSelectedRow] = useState<TableRowData | null>(null);

  // Индикаторы состояния
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        let response: Response;

        // Если передан непустой setId, грузим одну запись
        if (setId && setId.trim() !== "") {
          response = await fetch(`${API_URL}/api/spring/${setId}`);
        } else {
          // Иначе грузим пагинированно
          response = await fetch(
            `${API_URL}/api/spring/paged?page=${currentPage}&pageSize=${PAGE_SIZE}`
          );
        }

        if (!response.ok) {
          throw new Error("Ошибка загрузки данных");
        }

        const result = await response.json();

        // Если мы запросили одну пружину, на бэкенде может быть:
        // - одиночный объект
        // - массив из одного элемента
        // В любом случае приводим к массиву:
        if (setId && setId.trim() !== "") {
          const singleData = Array.isArray(result) ? result : [result];
          setData(singleData);
          setTotalPages(1); // одна страница
        } else {
          // Если список, то предполагаем, что в result есть {data, totalCount}
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

  // Клик по строке: открываем модалку и при необходимости подгружаем фото
  const handleRowClick = async (row: TableRowData) => {
    // Если кликнули по той же строке - скрываем модалку
    if (selectedRow?.id === row.id) {
      setSelectedRow(null);
      setIsModalOpen(false);
      return;
    }

    setSelectedRow(row);
    setIsModalOpen(true);

    // Если фото ещё не загружено (imageUrl нет), делаем запрос
    if (!row.imageUrl) {
      try {
        const response = await fetch(`${API_URL}/api/spring/${row.id}/photo`);
        if (!response.ok) {
          throw new Error("Фото не найдено");
        }
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        // Обновляем selectedRow, добавив imageUrl
        setSelectedRow((prev) => (prev ? { ...prev, imageUrl: url } : prev));
      } catch {
        // Если ошибка, значит фото нет
        setSelectedRow((prev) => (prev ? { ...prev, imageUrl: null } : prev));
      }
    }
  };

  return (
    <div className="table-container">
      {loading && <p>Загрузка данных...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Если нет ошибки и данные загружены */}
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
                  className={`table-row cursor-pointer text-center ${
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

          {/* Пагинация показывается только если нет setId */}
          {(!setId || setId.trim() === "") && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}

      {/* Модальное окно с фото */}
      <PhotoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageUrl={selectedRow?.imageUrl || ""}
      />
    </div>
  );
};

export default DataTable;
