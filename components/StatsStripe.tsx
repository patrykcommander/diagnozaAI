import React from "react";
interface StatsProps {
  patientsCount: number | [];
  emptyData: number | [];
  fullData: number | [];
}

export default function StatsStripe({
  patientsCount,
  emptyData,
  fullData,
}: StatsProps) {
  return (
    <div className="flex justify-center">
      <div className="px-4 py-2 h-12 w-auto bg-primary-blue mt-5 rounded-md shadow-md text-xl">
        <div className="flex flex-row justify-between gap-20 px-6">
          <p className="text-white font-semibold">
            Liczba dodanych pacjentów: {patientsCount}
          </p>
          <p className="text-white font-semibold">
            Pacjenci z pełnymi danymi: {emptyData}
          </p>
          <p className="text-white font-semibold">
            Pacjenci z niepełnymi danymi: {fullData}
          </p>
        </div>
      </div>
    </div>
  );
}
