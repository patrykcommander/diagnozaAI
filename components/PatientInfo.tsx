import React from "react";
import FileForm from "@/components/FileForm";
import getPatientData from "@/lib/getPatientData";
import PatientForm from "./PatientForm";
import { PatientData, wholePatientData } from "@/types";
import ChangePatient from "./ChangePatient";

export default async function PatientInfo({
  patientId,
}: {
  patientId: string;
}) {
  const patientInfo: wholePatientData = await getPatientData(patientId);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center">
        <div className="flex flex-row justify-between max-w-7xl w-full mt-10">
          <div>
            <p className="text-2xl font-semibold">Pacjent: {patientId}</p>
          </div>
          <div className="flex gap-20">
            <ChangePatient
              patientId={patientId}
              direction="previous"
              color="blue"
            >
              <p className="font-semibold text-white">Poprzedni pacjent</p>
            </ChangePatient>
            <ChangePatient patientId={patientId} direction="next" color="blue">
              <p className="font-semibold text-white">Następny pacjent</p>
            </ChangePatient>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row justify-between max-w-7xl w-full mt-10">
          {patientInfo && (
            <PatientForm
              patientData={patientInfo.dane_pacjenta as PatientData}
              patientBloodExamination={patientInfo.wirowka}
            />
          )}
        </div>
        <div className="flex fixed top-1/2 right-10 m-5">
          <div className="flex flex-col justify-end gap-10">
            <FileForm accept=".json, .csv" nr_pacjenta={patientId}>
              <p className="truncate w-full">
                Zmień plik
                <br />
                pacjenta
              </p>
            </FileForm>
          </div>
        </div>
      </div>
    </div>
  );
}
