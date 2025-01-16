import React from "react";
import SpringPairs from "@/components/ui/springpairtable";
import { mockSpringPairs } from "@/lib/mockSpringPairs";
import "@/app/globals.css";

const Page = () => {
  return (
      <SpringPairs data={mockSpringPairs} />
  );
};

export default Page;