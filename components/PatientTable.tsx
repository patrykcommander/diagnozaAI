import { Patient } from "@/types";
import React from "react";
import PatientCard from "./PatientCard";
import { getAllPatients } from "@/lib/getAllPatients";
import StatsStripe from "./StatsStripe";

export default async function PatientTable() {
  const patients: Patient[] = await getAllPatients();

  return (
    <>
      <StatsStripe patients={patients} />
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
