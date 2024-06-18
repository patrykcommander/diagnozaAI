import axios from "@/cfg";
import { PAGINATION_TOTAL_ELEMENTS } from "@/config/PatientsPage";
import { Patient } from "@/types";

export const getPatients = async (currentPage: number) => {
  try {
    const patients = await axios
      .get(
        `/patients?page=${currentPage}&elementsPerPage=${PAGINATION_TOTAL_ELEMENTS}`
      )
      .then((response) => {
        if (response.status === 200) {
          const parsedPatients = response.data;
          return parsedPatients.map((patient: string) => {
            return JSON.parse(patient);
          });
        } else {
          console.error("Wrong response status: ", response.status);
          return [];
        }
      });

    return patients as Patient[];
  } catch (error) {
    console.error("Error while fetching patients: ", error);
    return [];
  }
};
