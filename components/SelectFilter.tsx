"use client";

import { filterOptions } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

interface SelectFilterProps {
  children: React.ReactNode;
  filterOptions: filterOptions[];
}

export default function SelectFilter({
  children,
  filterOptions,
}: SelectFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [selectedFilter, setSelectedFilter] = useState<string>(
    searchParams.get("fullData") || "all"
  );

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    setSelectedFilter(e.currentTarget.value);

    const params = new URLSearchParams(searchParams);
    params.set("fullData", e.currentTarget.value);
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-row justify-center items-center gap-2">
      {children}
      <select
        className="rounded-md border-2 border-slate-700 p-1"
        onChange={handleFilterChange}
        defaultValue={selectedFilter}
      >
        {filterOptions.map(({ label, value }, key) => (
          <option className="text-lg" value={value} key={key}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
