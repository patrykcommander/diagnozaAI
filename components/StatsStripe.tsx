import React from "react";
import { Patient } from "@/types";
interface StatsProps {
  patients: Patient[];
}

export default function StatsStripe({ patients }: StatsProps) {
  const patientsCount = patients.length;
  const isFullDataCount = patients.filter(
    (patient) => patient.isFullData === true
  ).length;
  const isEmptyDataCount = patients.filter(
    (patient) => patient.isFullData === false
  ).length;

  return (
    <div className="flex justify-center">
      <div className="px-4 py-2 h-12 w-auto bg-primary-blue mt-5 rounded-md shadow-md text-xl">
        <div className="flex flex-row justify-between gap-20 px-6">
          <p className="text-white font-semibold">
            Liczba dodanych pacjentów: {patientsCount}
          </p>
          <p className="text-white font-semibold">
            Pacjenci z pełnymi danymi: {isFullDataCount}
          </p>
          <p className="text-white font-semibold">
            Pacjenci z niepełnymi danymi: {isEmptyDataCount}
          </p>
        </div>
      </div>
    </div>
  );
}
