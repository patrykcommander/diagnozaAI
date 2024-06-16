"use server";

import axios from "@/cfg";

export const changePatientFiles = async (state: any, formData: FormData) => {
  let newFormData: FormData = new FormData();
  const nr_pacjenta = formData.get("nr_pacjenta");

  try {
    formData.forEach((entry) => {
      if (typeof entry === "object") {
        if (entry.name.includes(".json")) {
          newFormData.append("file-json", entry);
        } else {
          newFormData.append("file-csv", entry);
        }
      }
    });

    const response = await axios({
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: newFormData,
      method: "PATCH",
      url: "/patients/patient",
      params: {
        nr_pacjenta: nr_pacjenta,
      },
    });

    return { code: response.status, message: response.data.message };
  } catch (error: any) {
    console.error(error);
    return { code: "", message: error.response.data.message };
  }
};
