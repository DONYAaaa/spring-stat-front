"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SpringPairTable from "@/components/ui/spring-pair-table";
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
    <div className="container mx-auto p-2 text-sm h-full">
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
        <h2 className="font-semibold mb-2">Список пружин</h2>
        <div className="mb-4 mx-auto h-[70vh] overflow-auto">
          <SpringTable setId={id} />
        </div>

      {/* Таблица с парами пружин */}
      <div className="mb-4 h-4/5">
        <h2 className="font-semibold mb-2">Пары пружин</h2>
        <div className="overflow-x-auto">
          <SpringPairTable setId={id} />
        </div>
      </div>
    </div>
  );
};

export default SpringSetDetails;
