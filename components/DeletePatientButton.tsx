"use client";

import deletePatient from "@/lib/deletePatient";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default async function DeletePatientButton() {
  const pathname = usePathname();
  const router = useRouter();
  const patient_id = pathname.split("/").pop();

  const handleDelete = async () => {
    const result = await deletePatient(patient_id as string);

    if (result == 1) {
      router.push("/patients?page=1");
      router.refresh();
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
}
