import React, { Suspense, useEffect, useState } from "react"
import getPatientData from "@/lib/getPatientData";
import { bloodExamination, patientData, wholePatientData } from "@/types";
import PatientForm from "./PatientForm";

interface PatientDataProps {
    patientId: string;
}


  
export default function PatientData({ patientId }: PatientDataProps) {
  const [patientData, setPatientData] = useState<patientData | null>(null);
  const [bloodExamination, setBloodExamination] = useState<bloodExamination | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const wholePatientData: wholePatientData = await getPatientData(patientId);
        if (wholePatientData.wirowka) {
          setBloodExamination(wholePatientData.wirowka);
        }
        setPatientData(wholePatientData.dane_pacjenta);

      } catch (error) {
        console.error('Error fetching patient data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [patientId]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
          {!loading && <PatientForm patientData={patientData as patientData} patientBloodExamination={bloodExamination} />}
    </Suspense>
  );
}
