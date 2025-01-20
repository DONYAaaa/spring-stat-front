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

interface SpringPair {
  id: number;
  setId: number;
  innerSpring: string;
  outerSpring: string;
  wedgeSpringStatus: string;
}

const PAGE_SIZE = 100;

const SpringPairTable = () => {
  const [data, setData] = useState<SpringPair[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/springPairs/paged?page=${currentPage}&pageSize=${PAGE_SIZE}`
        );
        if (!response.ok) {
          throw new Error("Ошибка загрузки данных");
        }
        const result = await response.json();

        // Предполагаем, что result.data - массив объектов SpringPair
        setData(result.data);

        // Вычисляем общее число страниц
        setTotalPages(Math.ceil(result.totalCount / PAGE_SIZE));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentPage, API_URL]);

  return (
    <div className="table-container">
      <>
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

        {/* Пагинация внутри того же скроллируемого блока */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          />
      </>
    </div>
  );
};

export default SpringPairTable;
