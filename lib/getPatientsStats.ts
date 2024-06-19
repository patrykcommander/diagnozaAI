import axios, { AxiosResponse } from "axios";

export default async function getPatientsStats() {
  try {
    const response: AxiosResponse = await axios({
      method: "GET",
      url: "http://localhost:5000/patients/statistics",
    });

    if (response.status === 200) {
      return JSON.parse(JSON.stringify(response.data));
    } else if (response.status === 400) {
      return [];
    }
  } catch (error) {
    console.error("Error while fetching the patient count");
    return [];
  }
}
