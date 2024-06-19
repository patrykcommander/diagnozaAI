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

  return (
    <button
      className="w-4- h-10 rounded-md bg-red-600 border-2 text-white font-semibold text-lg"
      onClick={handleDelete}
    >
      Delete
    </button>
  );
}
