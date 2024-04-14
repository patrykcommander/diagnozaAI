import React from "react"

interface StatsProps {
    patientsCount: number;
    isFullDataCount: number;
    isEmptyDataCount: number;
}

export default function StatsStripe({ patientsCount, isFullDataCount, isEmptyDataCount } : StatsProps) {
    return (
        <div className="flex flex-row justify-between gap-20 px-6">
            <p className="font-semibold">Liczba dodanych pacjentów: {patientsCount}</p>
            <p className="font-semibold">Pacjenci z pełnymi danymi: {isFullDataCount}</p>
            <p className="font-semibold">Pacjenci z niepełnymi danymi: {isEmptyDataCount}</p> 
        </div>
    )
}
