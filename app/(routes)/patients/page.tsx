import React, { Suspense } from "react";
import PatientTable from "@/components/PatientTable";
import MyPagination from "@/components/Pagination";
import getPatientsCount from "@/lib/getPatientsCount";
import { PAGINATION_TOTAL_ELEMENTS } from "@/config/PatientsPage";

interface PatientsPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
export default async function PatientsPage({
  searchParams,
}: PatientsPageProps) {
  const currentPage = Number(searchParams["page"] ?? 1);
  const fullDataFilter = (searchParams["fullData"] ?? "all") as string;

  const totalElements = await getPatientsCount(fullDataFilter);

  return (
    <>
      <Suspense fallback={<div>Loading....</div>}>
        <PatientTable
          currentPage={currentPage}
          fullDataFilter={fullDataFilter}
        />
      </Suspense>
      <MyPagination
        currentPage={currentPage}
        totalElements={Number(totalElements)}
        elementsPerPage={PAGINATION_TOTAL_ELEMENTS}
      />
    </>
  );
}
