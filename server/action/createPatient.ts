"use server"

import axios from "@/cfg"

const validateFormData = (userFormData: FormData) : FormData => {
    let newFormData: FormData = new FormData();

    const fileJSON = userFormData.get("file-json") as File
    const fileCSV = userFormData.get("file-csv") as File

    if (fileJSON.name !== 'undefined') {
        newFormData.append("file-json", fileJSON);
    } else {
        throw { error: {resposne: {data: "No JSON file provided" }}}
    };
    
    if (fileCSV.name !== 'undefined') newFormData.append("file-csv", fileCSV);

    return newFormData
}


export const createPatient = async (state: any, formData: FormData) => {
    const newFormData = validateFormData(formData);

    try {
        const response = await axios({
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: newFormData,
            method: "POST",
            url: "/patients/patient",
        });

        return {code: response.status, message: response.data.message}
    } catch (error: any) {
        console.log(error)
        return {code: "", message: error.response.data.message}
    };   
    
};
