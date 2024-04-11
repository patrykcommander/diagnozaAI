import { bloodExamination, patientData } from "@/types";
import { Grid, TextField } from "@mui/material";
import React from "react";

interface PatientFormProps {
    patientData: patientData;
    patientBloodExamination: bloodExamination | null;
};

interface FormRowProps {
    firstItem: {
        label: string,
        value: string | number | null;
        fieldName: string;
    };
    multiline: boolean;
};

function FormRow({ firstItem }: FormRowProps) {
    return (
      <Grid item xs={6}> {/* Set xs to 12 if multiline is true, otherwise set it to 6 */}
        <div className="flex flex-row items-center gap-10 justify-start">
          <p className="w-2/5 font-semibold text-xl text-right text-wrap">{firstItem.label}</p>
          <TextField 
            className="w-3/5" 
            value={firstItem.value} 
            placeholder={firstItem.value === null ? "Brak danych" : ""} 
            variant="outlined"
          />
        </div>
      </Grid>
    );
  }

const DB_NAME_TO_LABEL = {
    json_file_name: "Json File Name",
    age: "Age",
    plt: "PLT",
    histology: "Histology",
    ca125: "CA125",
    operation_date: "Operation Date",
    tumor_type: "Tumor Type",
    menopausal_status: "Menopausal Status",
    csv_file_name: "CSV File Name",
    sample_id: "Sample ID",
    grade: "Grade",
    figo_stage: "Figo Stage",
    rna_isolation_date: "RNA Isolation Date",
    rna_tape_station_date: "RNA Tape Station Date",
    rna_isolation_concentration: "RNA Isolation Concentration",
    reverse_transcription_date: "Reverse Transcription Date",
    tube_qpcr: "Tube QPCR",
    array_qpcr: "Array QPCR",
    collection_date: "Collection Date",
    collection_time: "Collection Time",
    processing_date: "Processing Date",
    processing_time: "Processing Time",
    box_position: "Box Position",
    tumor: "Tumor",
    nodes: "Nodes",
    metastasis: "Metastasis",
    ctc: "CTC",
};

export default function PatientForm({ patientData, patientBloodExamination } : PatientFormProps) {
    const merged = { ...patientData, ...patientBloodExamination}

    return (
        <div className="w-full flex flex-col justify-center items-center mb-20">
            <div className="flex flex-col w-1/2 align-middle gap-5">
                <div className="flex">
                    <p className="flex-1 text-xl text-center font-semibold">Pliki źródłowe</p>
                </div>
                <div className="flex border-2 rounded-md border-black justify-between mb-10">
                    <p className="flex-1 text-xl text-center border-r-2 border-black py-2">{merged.json_file_name}</p>
                    <p className="flex-1 text-xl text-center py-2">{merged.csv_file_name || "Brak"}</p>
                </div>
            </div>
            <div>
                <Grid container spacing={4}>
                    <Grid container item rowSpacing={2} columnSpacing={5}>
                        {Object.entries(merged).map(([key, value], index) => (
                            !key.includes("file_name") && !key.includes("histology") &&  
                            <FormRow 
                            firstItem={{
                                label: DB_NAME_TO_LABEL[key as keyof typeof DB_NAME_TO_LABEL], 
                                value: value, 
                                fieldName: key}
                            }
                            multiline={false}
                            />
                        ))}
                    </Grid>
                    <Grid item xs={12}>
                        <div className="flex flex-col items-center gap-5 justify-start pt-5">
                            <p className="font-semibold text-xl text-right text-wrap">{DB_NAME_TO_LABEL["histology" as keyof typeof DB_NAME_TO_LABEL]}</p>
                            <TextField 
                                className="w-full" 
                                rows={6}
                                multiline
                                value={merged.histology} 
                                placeholder={merged.histology === null ? "Brak danych" : ""} 
                                variant="outlined"
                            />
                        </div>
                    </Grid> 
                </Grid>
            </div>   
        </div>
    )
};
