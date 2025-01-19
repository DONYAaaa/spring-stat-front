import React from "react";
import SpringSetTable from "@/components/ui/springsettable"; // Должно быть `SpringSetTable`
import { mockSpringSets } from "@/lib/mockSpringSets";
import "@/app/globals.css";

const Page = () => {
  return (
    <SpringSetTable data={mockSpringSets} />
  );
};

export default Page;
