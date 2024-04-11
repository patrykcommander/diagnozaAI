export interface patient {
    patientId: string,
    createdAt: string,
    isFullData: boolean,
    tumorType: string,
}

export interface patientData {
    json_file_name: string | null;
    age: number | null;
    plt: number | null;
    histology: string | null;
    ca125: number | null;
    operation_date: string | null;
    tumor_type: string | null;
    menopausal_status: string | null;
}

export interface bloodExamination {
    csv_file_name?: string;
    sample_id?: string | null;
    grade?: string | null;
    figo_stage?: string | null;
    rna_isolation_date?: string | null;
    rna_tape_station_date?: string | null;
    rna_isolation_concentration?: string | null;
    reverse_transcription_date?: string | null;
    tube_qpcr?: string | null;
    array_qpcr?: string | null;
    collection_date?: string | null;
    collection_time?: string | null;
    processing_date?: string | null;
    processing_time?: string | null;
    box_position?: string | null;
    tumor?: string | null;
    nodes?: string | null;
    metastasis?: string | null;
    ctc?: string | null;
}

export interface wholePatientData {
    nr_pacjenta:    string, 
    data_dodania:   string, 
    dane_pacjenta:  patientData,
    pelne_dane:     boolean,
    wirowka?:       bloodExamination
}

export type Merged = patientData & bloodExamination;