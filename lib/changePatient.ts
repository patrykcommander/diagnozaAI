import axios from "axios";

export const changePatient = async (patientId: string, direction: number) => {
  let newPatientId;

  try {
    const response = await axios({
      method: "GET",
      url: "http://localhost:5000/patients/patient",
      params: {
        nr_pacjenta: patientId,
        getEmpty: true,
        direction: direction,
      },
    });

    if (response.status === 200) {
      newPatientId = response.data.patientId;
      console.log(newPatientId);
      return newPatientId;
    }
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
