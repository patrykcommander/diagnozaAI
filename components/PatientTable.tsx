import { Patient, PatientsStats } from "@/types";
import React from "react";
import PatientCard from "./PatientCard";
import StatsStripe from "./StatsStripe";
import { getPatients } from "@/lib/getPatients";
import getPatientsStats from "@/lib/getPatientsStats";

export default async function PatientTable({
  currentPage,
}: {
  currentPage: number;
}) {
  const patients: Patient[] = await getPatients(currentPage);
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
          <div className="flex items-center justify-center mt-14">
            <div>
              <div className="flex flex-row max-w-7xl justify-around font-semibold text-xl h-10">
                <p className="table-p">ID</p>
                <p className="table-p">Data dodania</p>
                <p className="table-p">Typ nowotworu</p>
                <p className="table-p">Pełne dane</p>
              </div>
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
