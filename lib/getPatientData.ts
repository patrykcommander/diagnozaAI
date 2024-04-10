import axios from "@/cfg";

export default async function getPatientData(patientId: string) {
    try {        
        const response = await axios({
            method: "GET",
            url: `/patients/patient`,
            params: {
                nr_pacjenta: patientId,
            }
        });

        if(response.status === 200) {
            return response.data;
        } 
        else if (response.status === 400) {
            return [];
        };
        
    } catch (error) {
        console.error("Error while fetching the patientData");
    };
};
