"use client"
import * as React from "react"


import { cn } from "@/lib/utils"

interface TableRow {
  id: number;
  operator: string;
  springType: string;
  height: number;
  outerDiameter: number;
  innerDiameter: number;
  perpendicularityDeviation: number;
  wireDiameter: number;
  controlDate: string;
}

const Table = ({ data }: { data: TableRow[] }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <table className="table-fixed border-collapse border border-gray-300 w-auto text-sm text-gray-700">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Id</th>
            <th className="border border-gray-300 px-4 py-2">Оператор</th>
            <th className="border border-gray-300 px-4 py-2">Тип пружины</th>
            <th className="border border-gray-300 px-4 py-2">Высота</th>
            <th className="border border-gray-300 px-4 py-2">Наружный Диаметр</th>
            <th className="border border-gray-300 px-4 py-2">Внутренний диаметр</th>
            <th className="border border-gray-300 px-4 py-2">Отклонение от перпендикулярности</th>
            <th className="border border-gray-300 px-4 py-2">Диаметр прутка</th>
            <th className="border border-gray-300 px-4 py-2">Дата контроля</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className="cursor-pointer hover:bg-gray-200"
              onClick={() => alert(`Clicked row ID: ${row.id}`)}
            >
              <td className="border border-gray-300 px-4 py-2 text-center">{row.id}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{row.operator}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{row.springType}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{row.height}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {row.outerDiameter}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {row.innerDiameter}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {row.perpendicularityDeviation}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">{row.wireDiameter}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{row.controlDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;