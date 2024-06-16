"use client";

import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { createPatient } from "@/server/action/createPatient";
import DropZone from "./DropZone";
import SubmitButton from "./SubmitButton";
import { useRouter } from "next/navigation";

interface UploadProps {
  closeDialog: () => void;
}

export default function Upload({ closeDialog }: UploadProps) {
  const router = useRouter();
  const [actionStatus, formAction] = useFormState(createPatient, null);
  const [fileJSON, setFileJSON] = useState<File | null>(null);
  const [fileCSV, setFileCSV] = useState<File | null>(null);

  useEffect(() => {
    setFileCSV(null);
    setFileJSON(null);
    if (actionStatus !== null && actionStatus.code === 200)
      setTimeout(() => {
        closeDialog();
        router.push("/");
      }, 1000);
  }, [actionStatus]);

  const handleJsonUpload = (file: File | null) => {
    if (file) {
      setFileJSON(file);
    } else {
      setFileJSON(null);
    }
  };

  const handleCsvUpload = (file: File | null) => {
    if (file) {
      setFileCSV(file);
    } else {
      setFileCSV(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-96">
      <form className="w-full" action={formAction}>
        <div className="flex flex-row justify-evenly mb-10">
          <DropZone
            label="JSON"
            accept=".json"
            name="file-json"
            onChange={handleJsonUpload}
            files={fileJSON}
          />
          <DropZone
            label="CSV"
            accept=".csv"
            name="file-csv"
            onChange={handleCsvUpload}
            files={fileCSV}
          />
        </div>
        <SubmitButton
          actionStatus={actionStatus}
          isFileProvided={fileJSON === null}
        >
          Utwórz pacjenta
        </SubmitButton>
      </form>
    </div>
  );
}
