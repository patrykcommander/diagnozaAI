import React, { Suspense } from "react"
import { getAllPatients } from '@/lib/getAllPatients'
import { patient } from "@/types"
import PatientCard from "@/components/PatientCard"
import StatsStripe from "@/components/StatsStripe"
import PatientTable from "@/components/PatientTable"

export default async function page() {
  const patients: patient[] = await getAllPatients()
  let patientsCount: number, isFullDataCount: number, isEmptyDataCount: number;

  if (patients) {
    patientsCount = patients.length;
    isFullDataCount = patients.filter( patient => patient.isFullData === true).length;
    isEmptyDataCount = patientsCount - isFullDataCount;
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="px-4 py-2 h-12 w-auto bg-secondary-blue mt-5 rounded-md shadow-md text-xl">
          <Suspense fallback={<StatsStripe/>}>
            <StatsStripe patients={patients}/>
          </Suspense>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex-row w-1/2">
          <Suspense fallback={<div>Loading....</div>}>
              <PatientTable patients={patients} />
          </Suspense>
        </div>
      </div>
    </>
  )
}
