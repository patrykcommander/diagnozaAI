import React, { Suspense, useEffect, useState } from "react"
import getPatientData from "@/lib/getPatientData";
import { bloodExamination, patientData, wholePatientData } from "@/types";

interface PatientDataProps {
    patientId: string;
}

function Field(label: string, value: string) {
    return (
      <p className="mt-2" key={label}>
        {label}: <strong>{value}</strong>
      </p>
    );
  }
  
  function renderFields(obj: object): React.ReactNode[] {
    return Object.entries(obj).map(([key, value]) => {
      return Field(key, value);
    });
  }
  
  export default function PatientData({ patientId }: PatientDataProps) {
    const [patientData, setPatientData] = useState<patientData | null>(null);
    const [bloodExamination, setBloodExamination] = useState<bloodExamination | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const wholePatientData: wholePatientData = await getPatientData(patientId);
          setBloodExamination(wholePatientData.wirowka);
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
            <div className="flex flex-col">
                {patientData && renderFields(patientData)}
                {bloodExamination && renderFields(bloodExamination)}
            </div>
      </Suspense>
    );
}
