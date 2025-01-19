"use client";

import React, { useState, useEffect } from "react";
import "@/styles/table.css";
import Pagination from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface SpringPair {
  id: number;
  setId: number;
  innerSpring: string;
  outerSpring: string;
  wedgeSpring: string;
}

const PAGE_SIZE = 100;

const SpringPairTable = () => {
  const [data, setData] = useState<SpringPair[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/springPairs/paged?page=${currentPage}&pageSize=${PAGE_SIZE}`);
        if (!response.ok) {
          throw new Error("Ошибка загрузки данных");
        }
        const result: SpringPair[] = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentPage]);

  return (
    <div className="table-container">
      <div className="table-scroll">
        <Table>
          <TableHeader className="table-header">
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>ID комплекта</TableHead>
              <TableHead>Номер внутренней</TableHead>
              <TableHead>Номер наружной</TableHead>
              <TableHead>Номер подклиновой</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((pair) => (
              <TableRow key={pair.id} className="text-center">
                <TableCell>{pair.id}</TableCell>
                <TableCell>{pair.setId}</TableCell>
                <TableCell>{pair.innerSpring}</TableCell>
                <TableCell>{pair.outerSpring}</TableCell>
                <TableCell>{pair.wedgeSpring}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Подключаем пагинацию */}
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
};

export default SpringPairTable;
