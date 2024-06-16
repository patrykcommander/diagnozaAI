"use client";

import React, { useRef, useState } from "react";
import SubmitButton from "./SubmitButton";
import { useFormState } from "react-dom";
import { changePatientFiles } from "@/server/action/changePatientFiles";

interface FileInputProps {
  children: React.ReactNode;
  accept: string;
  nr_pacjenta?: string;
}

export default function FileForm({
  children,
  accept,
  nr_pacjenta,
}: FileInputProps) {
  const inputRef = useRef<any>(null);
  const [actionStatus, formAction] = useFormState(changePatientFiles, null);
  let [files, setFiles] = useState<FileList | null>(null);

  function openFileExplorer() {
    inputRef.current.value = "";
    inputRef.current.click();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.currentTarget.files) {
      setFiles(e.currentTarget.files);
    }
  }

  return (
    <form action={formAction}>
      <div className="flex flex-col justify-center items-center gap-10">
        <div
          className="flex text-white rounded-md px-5 py-3 text-lg font-semibold bg-primary-blue hover:bg-secondary-blue"
          onClick={openFileExplorer}
        >
          <input
            className="hidden"
            name="files"
            type="file"
            accept={accept}
            ref={inputRef}
            onChange={handleChange}
            multiple
          />
          <input
            className="hidden"
            name="nr_pacjenta"
            type="text"
            value={nr_pacjenta}
            readOnly
          ></input>
          {files === null ? (
            children
          ) : (
            <p className="">
              Pliki
              <br />
              gotowe
            </p>
          )}
        </div>
        <SubmitButton
          actionStatus={actionStatus}
          isFileProvided={files === null}
        >
          Aktualizuj dane
        </SubmitButton>
      </div>
    </form>
  );
}
