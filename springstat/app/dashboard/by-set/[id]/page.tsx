"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SpringTable from "@/components/ui/table-cont";

const SpringSetDetails = () => {
  const router = useRouter();
  const params = useParams(); 
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Некорректный ID комплекта");
    }
    setLoading(false);
  }, [id]);

  if (loading) return <p className="text-sm">Загрузка...</p>;
  if (error) return <p className="text-red-500 text-sm">{error}</p>;

  return (
    <div className="container mx-auto p-2 text-sm overflow-hidden">
      {/* Заголовок и кнопка Назад на одной линии */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-bold">Детали комплекта #{id}</h1>
        <button
          onClick={() => router.back()}
          className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
        >
          Назад
        </button>
      </div>

      {/* Таблица с отдельными пружинами */}
        <SpringTable setId={id} />
    </div>
  );
};

export default SpringSetDetails;
