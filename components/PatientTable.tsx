import React from "react"
import clsx from "clsx"
import { patient } from "@/types"
import PatientCard from "./PatientCard"

interface PatientTableProps {
    patients: patient[],
}

export default function PatientTable({ patients } : PatientTableProps) {
  return (
    <div className="flex items-center justify-center mt-14">
        <div>
            <div className="flex flex-row max-w-7xl justify-around font-semibold text-xl h-10">
                <p className="table-p">ID</p>
                <p className="table-p">Data dodania</p>
                <p className="table-p">Typ nowotworu</p>
                <p className="table-p">Pełne dane</p>
            </div>
            {patients.map((value, index) => (
                <PatientCard key={index} keyVal={index} patientInfo={value}/>
            ))}
        </div>
    </div>
  )
}
