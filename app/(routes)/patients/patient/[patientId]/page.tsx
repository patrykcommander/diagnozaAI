"use client"

import React from "react";
import { switchPatient } from "@/server/action/switchPatient";
import ServerActionButton from "@/components/ServerActionButton";
import PatientData from "@/components/PatientData";

export default async function patientPage({ params }: {params: {patientId: string}}) {
  const patientId = params.patientId;

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center">
        <div className="flex flex-row justify-between max-w-7xl w-full mt-10">
          <div>
            <p className="text-2xl font-semibold">Patient: {patientId}</p>
          </div>
          <div className="flex gap-20">
            <ServerActionButton color="blue" action={() => switchPatient(patientId, -1)}>
              <p className="font-semibold text-white">Poprzedni pacjent</p>
            </ServerActionButton>
            <ServerActionButton color="blue" action={() => switchPatient(patientId, 1)}>
              <p className="font-semibold text-white">Następny pacjent</p>
            </ServerActionButton>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex flex-row justify-between max-w-7xl w-full mt-10">
          <PatientData patientId={patientId}/>
        </div>
      </div>   
    </div>
  )
}


// czy mozliwym jest jakos zrenderowac wczesniej wszystkie wartosci z bazy dotyczace pacjenta - patientJson i bloodExamination