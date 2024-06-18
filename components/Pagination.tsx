"use client";

import React from "react";
import { Pagination } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalElements: number | [];
  elementsPerPage: number;
}

export default function MyPagination({
  currentPage,
  totalElements,
  elementsPerPage,
}: PaginationProps) {
  const pathname = usePathname();
  const router = useRouter();
  let count: number;

  if (totalElements)
    count = Math.ceil((totalElements as number) / elementsPerPage);
  else {
    count = 1;
  }

  const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
    router.push(`${pathname}?page=${value}`);
  };

  return (
    <div className="flex flex-row items-center justify-center pb-4">
      <Pagination count={count} page={currentPage} onChange={handleChange} />
    </div>
  );
}
