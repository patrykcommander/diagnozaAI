import axios, { AxiosResponse } from "axios";

export default async function deletePatient(patient_id: string) {
  try {
    const response: AxiosResponse = await axios({
      method: "DELETE",
      url: `http://localhost:5000/patients/patient`,
      params: {
        nr_pacjenta: patient_id,
      },
    });

    if (response.status == 200) return 1;
  } catch {
    console.log("Failed while deleting patient");
  }
}
