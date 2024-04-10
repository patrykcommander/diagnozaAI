"use client"

import React from "react"
import { useRouter } from "next/navigation";
import { patient } from "@/types"
import clsx from "clsx";
import Checkbox from "./Checkbox";

interface patientCardProps {
  keyVal: number;
  patientInfo: patient;
}

export default function PatientCard({ keyVal, patientInfo } : patientCardProps) {
  const router = useRouter();
  const handleRedirect = () => {
    router.push(`/patients/patient/${patientInfo.patientId}`);
  };

  const colorVariants = {
    "primary": "bg-table-primary",
    "secondary": "bg-table-secondary",
  };

  const className = `flex flex-row items-center mt-4 mb-4 justify-around border-2 border-slate-800 rounded-md shadow-md cursor-pointer ${keyVal % 2 == 0 ? colorVariants["primary"] : colorVariants["secondary"]}`;
  return (
    <div className={clsx(className)} onClick={handleRedirect}>
        <p className="px-4 py-5 table-p">{patientInfo.patientId}</p>
        <p className="px-4 py-5 table-p">{patientInfo.createdAt}</p>
        <p className="px-4 py-5 table-p">{patientInfo.tumorType || "Nie odczytano z pliku JSON"}</p>
        <p className="px-4 py-5 table-p"><Checkbox isChecked={patientInfo.isFullData}/></p>
    </div>
  )
}
