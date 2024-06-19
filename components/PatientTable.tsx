import { Patient, PatientsStats } from "@/types";
import React from "react";
import PatientCard from "./PatientCard";
import StatsStripe from "./StatsStripe";
import { getPatients } from "@/lib/getPatients";
import getPatientsStats from "@/lib/getPatientsStats";
import SelectFilter from "./SelectFilter";

const FULL_DATA_FILTER = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Yes",
    value: "yes",
  },
  {
    label: "No",
    value: "no",
  },
];

export default async function PatientTable({
  currentPage,
  fullDataFilter,
}: {
  currentPage: number;
  fullDataFilter: string;
}) {
  const patients: Patient[] | undefined = await getPatients(
    currentPage,
    fullDataFilter
  );
  const { patientsCount, emptyData, fullData }: PatientsStats =
    await getPatientsStats();

  return (
    <>
      <StatsStripe
        patientsCount={patientsCount}
        emptyData={emptyData}
        fullData={fullData}
      />
      <div className="flex justify-center">
        <div className="flex-row w-1/2">
          <div className="flex flex-col items-center justify-center mt-14 gap-4">
            <div>
              <SelectFilter filterOptions={FULL_DATA_FILTER}>
                <p className="font-semibold text-lg">
                  Filtruj po: 'Pełne Dane'
                </p>
              </SelectFilter>
            </div>
            <div className="flex flex-row max-w-7xl justify-around font-semibold text-xl">
              <p className="table-p">ID</p>
              <p className="table-p">Data dodania</p>
              <p className="table-p">Typ nowotworu</p>
              <p className="table-p">Pełne dane</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 mb-4">
              {patients &&
                patients.map((value, index) => (
                  <PatientCard key={index} keyVal={index} patientInfo={value} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
