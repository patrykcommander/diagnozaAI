"use server"

import axios from "@/cfg"
import { notFound, redirect } from "next/navigation";

export const switchPatient = async (patientId: string, direction: number) => {
    let newPatientId;

    try {
        const response = await axios({
            method: "GET",
            url: "/patients/patient",
            params: {
                nr_pacjenta: patientId,
                getEmpty: true,
                direction: direction
            },
        });

        if (response.status === 200) {
            newPatientId = response.data.patientId;
        } else {
            console.error("Error", response.status);
        };
    } catch (error) {
        console.error(error);
    };   

    if (newPatientId) {
        redirect(`/patients/patient/${newPatientId}`);
    } else {
        notFound();
    }
    
};
