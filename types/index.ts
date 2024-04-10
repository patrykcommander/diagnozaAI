export interface patient {
    patientId: string,
    createdAt: string,
    isFullData: boolean,
    tumorType: string,
}

export interface patientData {
    id: number;
    patient_primary_key: number;
    file_name: string | null;
    src_json: any; // Assuming JSON structure, you may need to define a specific type
    age: number | null;
    plt: number | null;
    histology: string | null;
    ca125: number | null;
    operation_date: string | null;
    tumor_type: string | null;
    menopausal_status: string | null;
}

export interface bloodExamination {
    id: number;
    patient_primary_key: number;
    file_name?: string;
    csv_binary?: ArrayBuffer | null;
    csv_to_json?: Record<string, unknown> | null;
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
    nr_pacjenta:              string, 
    data_dodania:             string, 
    dane_pacjenta:            patientData,
    pelne_dane:               boolean,
    wirowka:                  bloodExamination
}