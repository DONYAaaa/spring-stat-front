import React from "react";
import Table from "@/components/ui/table-cont";
import { mockData } from "@/lib/mockData";
import "@/app/globals.css";

const Page = () => {
  return (
      <Table data={mockData} />
  );
};

export default Page;