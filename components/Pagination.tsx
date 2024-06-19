"use client";

import React from "react";
import { Pagination } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  let count: number;

  if (totalElements)
    count = Math.ceil((totalElements as number) / elementsPerPage);
  else {
    count = 1;
  }

  const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", value.toString());

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  return (
    <div className="flex flex-row items-center justify-center pb-4">
      <Pagination count={count} page={currentPage} onChange={handleChange} />
    </div>
  );
}
