import React from "react"
import { patient } from "@/types";

interface StatsProps {
    patients?: patient[],
}

export default function StatsStripe({ patients } : StatsProps) {
    let patientsCount = 0, isFullDataCount = 0, isEmptyDataCount = 0;

    if (patients) {
        patientsCount = patients.length;
        isFullDataCount = patients.filter( patient => patient.isFullData === true).length;
        isEmptyDataCount = patientsCount - isFullDataCount;
    } 

    return (
        <div className="flex flex-row justify-between gap-20 px-6">
            <p className="font-semibold">Liczba dodanych pacjentów: {patientsCount}</p>
            <p className="font-semibold">Pacjenci z pełnymi danymi: {isFullDataCount}</p>
            <p className="font-semibold">Pacjenci z niepełnymi danymi: {isEmptyDataCount}</p> 
        </div>
    )
}
