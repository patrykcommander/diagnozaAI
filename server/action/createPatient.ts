"use server";

import axios from "@/cfg";
import { validateFileFormData } from "@/lib/validateFileFormData";

export const createPatient = async (state: any, formData: FormData) => {
  const newFormData = validateFileFormData(formData);

  try {
    const response = await axios({
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: newFormData,
      method: "POST",
      url: "/patients/patient",
    });

    return { code: response.status, message: response.data.message };
  } catch (error: any) {
    console.log(error);
    return { code: "", message: "Error occured" };
  }
};
