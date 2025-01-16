import Image from "next/image";
import React from "react";
import Table from "@/components/ui/table";

const mockData = [
  {
    id: 1,
    operator: "Иванов",
    springType: "Пружина сжатия",
    height: 50,
    outerDiameter: 30,
    innerDiameter: 20,
    perpendicularityDeviation: 0.1,
    wireDiameter: 5,
    controlDate: "2025-01-01",
  },
  {
    id: 2,
    operator: "Петров",
    springType: "Пружина растяжения",
    height: 70,
    outerDiameter: 40,
    innerDiameter: 25,
    perpendicularityDeviation: 0.2,
    wireDiameter: 6,
    controlDate: "2025-01-02",
  }
];

const Page = () => {
  return (
      <Table data={mockData} />
  );
};

export default Page;