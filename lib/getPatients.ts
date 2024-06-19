import axios from "@/cfg";
import { PAGINATION_TOTAL_ELEMENTS } from "@/config/PatientsPage";

export const getPatients = async (
  currentPage: number,
  fullDataFilter: string
) => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://localhost:5000/patients",
      params: {
        page: currentPage,
        elementsPerPage: PAGINATION_TOTAL_ELEMENTS,
        fullData: fullDataFilter,
      },
    });

    if (res.status === 200) {
      const parsedPatients = res.data;
      return parsedPatients.map((patient: string) => {
        return JSON.parse(patient);
      });
    }
  } catch (error) {
    console.error("Error while fetching patients");
    return [];
  }
};
