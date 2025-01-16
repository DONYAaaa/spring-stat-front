import React from "react";
import SpringSet from "@/components/ui/springsettable";
import { mockSpringSets } from "@/lib/mockSpringSets";
import "@/app/globals.css";

const Page = () => {
  return (
      <SpringSet data={mockSpringSets} />
  );
};

export default Page;