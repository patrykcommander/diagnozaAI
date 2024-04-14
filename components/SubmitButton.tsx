import { actionStatus } from "@/types";
import { CircularProgress } from "@mui/material";
import clsx from "clsx";
import React from "react"
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
    actionStatus: actionStatus | null;
    isFileProvided?: boolean;
}


export default function SubmitButton({actionStatus, isFileProvided} : SubmitButtonProps) {
    const formStatus = useFormStatus();
    const className = `rounded-md px-5 py-3 text-lg font-semibold ${!isFileProvided ? "bg-black" : "bg-slate-300"}`;

    return (
        <div className="flex flex-col justify-center items-center">
            <button
                className={clsx(className)}
                type="submit"
                disabled={isFileProvided || formStatus.pending}
            >
                <span className="text-white">Utwórz pacjenta</span>
            </button>
            {!formStatus.pending ? (
                <p className="text-xl font-semibold mt-5">{actionStatus === null ? "" : actionStatus.message}</p>
            ) : (
                <CircularProgress className="mt-5" />
            )}
        </div> 
    )
}
