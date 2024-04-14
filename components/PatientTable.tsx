import React, { Suspense, useEffect, useState } from "react"
import { patient } from "@/types"
import PatientCard from "./PatientCard"
import { getAllPatients } from "@/lib/getAllPatients";
import StatsStripe from "./StatsStripe";

export default function PatientTable() {
    const [patients, setPatients] = useState<Array<patient>>();
    const [patientsCount, setPatientsCount] = useState<number>(0);
    const [isFullDataCount, setIsFullDataCount] = useState<number>(0);
    const [isEmptyDataCount, setIsEmptyDataCount] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const patientsReq: patient[] = await getAllPatients();
            setPatients(patientsReq);
            setPatientsCount(patientsReq.length);
            setIsFullDataCount(patientsReq.filter( patient => patient.isFullData === true).length);
            setIsEmptyDataCount(patientsReq.filter( patient => patient.isFullData === false).length);
    
          } catch (error) {
            console.error('Error fetching patient data:', error);
          } 
        };
    
        fetchData();
      }, []);


    return (
        <Suspense fallback={<div>Loading....</div>}>
            <div className="flex justify-center">
                <div className="px-4 py-2 h-12 w-auto bg-secondary-blue mt-5 rounded-md shadow-md text-xl">
                    <StatsStripe patientsCount={patientsCount} isFullDataCount={isFullDataCount} isEmptyDataCount={isEmptyDataCount} />
                </div>
            </div>
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
                            {patients && patients.map((value, index) => (
                                <PatientCard key={index} keyVal={index} patientInfo={value}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Suspense>
    )
}
