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

// Тип для одного объекта "пары пружин"
interface SpringPair {
  id: number;
  setId: number;
  innerSpring: string;
  outerSpring: string;
  wedgeSpringStatus: string;
}

// Доп. тип для пропсов (setId необязателен)
interface SpringPairTableProps {
  setId?: string; 
}

const PAGE_SIZE = 100;

const SpringPairTable: React.FC<SpringPairTableProps> = ({ setId }) => {
  const [data, setData] = useState<SpringPair[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Для наглядности добавим индикаторы
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        let response: Response;
        // Если `setId` передан и не пустой, делаем запрос на одиночный эндпоинт
        if (setId && setId.trim() !== "") {
          response = await fetch(`${API_URL}/api/springPairs/${setId}`);
        } else {
          // Иначе берём «paged» эндпоинт
          response = await fetch(
            `${API_URL}/api/springPairs/paged?page=${currentPage}&pageSize=${PAGE_SIZE}`
          );
        }

        if (!response.ok) {
          throw new Error("Ошибка загрузки данных");
        }

        const result = await response.json();

        // Если запросили по `setId`, бэкенд может вернуть один объект или массив.
        // Подстроимся под оба варианта — обернём один объект в массив:
        if (setId && setId.trim() !== "") {
          const singleData = Array.isArray(result) ? result : [result];
          setData(singleData);
          // Для одного элемента пагинация не нужна, но пусть totalPages = 1.
          setTotalPages(1);
        } else {
          // Иначе работаем с result.data и result.totalCount
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
    // При смене `setId` сбрасываем страницу на 1
  }, [API_URL, setId, currentPage]);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p className="text-red-500">Ошибка: {error}</p>;
  }

  return (
    <div className="table-container">
      <Table>
        <TableHeader className="table-header">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>ID комплекта</TableHead>
            <TableHead>Номер внутренней</TableHead>
            <TableHead>Номер наружной</TableHead>
            <TableHead>Подклиновая</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((pair) => (
            <TableRow key={pair.id} className="text-center">
              <TableCell>{pair.id}</TableCell>
              <TableCell>{pair.setId}</TableCell>
              <TableCell>{pair.innerSpring}</TableCell>
              <TableCell>{pair.outerSpring}</TableCell>
              <TableCell>{pair.wedgeSpringStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Пагинацию показываем только в случае, если не было передано setId */}
      {!setId && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default SpringPairTable;
