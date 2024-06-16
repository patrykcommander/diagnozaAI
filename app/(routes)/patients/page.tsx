import React, { Suspense } from "react";
import PatientTable from "@/components/PatientTable";

export default function page() {
  return (
    <Suspense fallback={<div>Loading....</div>}>
      <PatientTable />
    </Suspense>
  );
}
