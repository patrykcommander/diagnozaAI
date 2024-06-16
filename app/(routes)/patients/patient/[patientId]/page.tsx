import React, { Suspense } from "react";
import PatientInfo from "@/components/PatientInfo";

export default function patientPage({
  params,
}: {
  params: { patientId: string };
}) {
  const patientId = params.patientId;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PatientInfo patientId={patientId} />
    </Suspense>
  );
}
