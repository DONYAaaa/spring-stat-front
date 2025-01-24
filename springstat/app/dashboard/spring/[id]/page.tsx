"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import "@/styles/table.css";

// Описываем структуру данных, как в DataTable
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
  pairNumber?: number;
  isWedge?: string;
}

export default function SpringDetailsPage() {
  const router = useRouter();
  const { id } = useParams() || {}; // считываем [id] из URL

  const [spring, setSpring] = useState<TableRowData | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Если id undefined, не делаем запрос
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // 1) Загружаем основные данные (допустим, из /api/SpringSet/<id>)
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
        const response = await fetch(`${baseUrl}/api/SpringSet/${id}`);
        if (!response.ok) {
          throw new Error("Ошибка загрузки данных о пружине");
        }

        const result = await response.json();
        // Допускаем, что может вернуться объект или массив из одного элемента
        const singleData = Array.isArray(result) ? result[0] : result;
        setSpring(singleData);

        // 2) Загружаем фото (если есть отдельный эндпоинт для фото)
        const photoResponse = await fetch(`${baseUrl}/api/SpringSet/${id}/photo`);
        if (photoResponse.ok) {
          const blob = await photoResponse.blob();
          const url = URL.createObjectURL(blob);
          setImageUrl(url);
        } else {
          // Фото нет
          setImageUrl(null);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <p>Загрузка данных...</p>;
  }

  if (error) {
    return <p className="text-red-500">Ошибка: {error}</p>;
  }

  if (!spring) {
    return <p>Нет данных по пружине с id: {id}</p>;
  }

  return (
    <div className="container mx-auto mt-4">
      {/* Кнопка «Назад» — вернёт на предыдущую страницу */}
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
      >
        Назад
      </button>

      {/* Таблица с одной строкой, где выводим все нужные поля */}
      <Table>
        <TableHeader>
          <TableRow>
            {/* Набор столбцов — при необходимости можно убрать/добавить */}
            <TableHead>ID</TableHead>
            <TableHead>Номер пары</TableHead>
            <TableHead>Подклиновая</TableHead>
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
          <TableRow>
            <TableCell>{spring.id}</TableCell>
            <TableCell>{spring.pairNumber ?? ""}</TableCell>
            <TableCell>{spring.isWedge ?? ""}</TableCell>
            <TableCell>{spring.isAccepted}</TableCell>
            <TableCell>{spring.springType}</TableCell>
            <TableCell>{spring.height.toFixed(2)}</TableCell>
            <TableCell>{spring.outerDiameter.toFixed(2)}</TableCell>
            <TableCell>{spring.innerDiameter.toFixed(2)}</TableCell>
            <TableCell>{spring.perpendicularity.toFixed(2)}</TableCell>
            <TableCell>{spring.coilDiameter}</TableCell>
            <TableCell>{spring.controlDate}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* Фото, если есть */}
      {imageUrl ? (
        <div className="mt-4">
          <img src={imageUrl} alt="Spring Side Points" />
        </div>
      ) : (
        <p className="mt-4">Фото отсутствует</p>
      )}
    </div>
  );
}
