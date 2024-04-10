import axios from "@/cfg";
import { patient } from "@/types";

export const getAllPatients = async () => {
    try {
        const patients = await axios.get("/patients").then((response) => {
            if (response.status === 200) {
                let parsedPatients = response.data
                return parsedPatients.map((patient: string) => {
                    return JSON.parse(patient)
                })
            } else {
                console.error("Wrong response status: ", response.status)
                return [];
            }
        })

        return patients as patient[]
    } catch (error) {
        console.error("Error while fetching patients: ", error)
        return [];
    }
};
