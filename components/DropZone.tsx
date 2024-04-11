import React, { useRef, useState } from "react";

interface DropZoneProps {
    label: string;
    accept: string;
    name: string;
    control: any;
}

export default function DropZone({ label, accept, name, control } : DropZoneProps)  {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<any>(null);
  const [files, setFiles] = useState<File | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if(e.currentTarget.files) setFiles(e.currentTarget.files[0]);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files) {
        setFiles(e.dataTransfer.files[0]);
    }
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragEnter(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function removeFile() {
    setFiles(null);
  }

  function openFileExplorer() {
    inputRef.current.value = "";
    inputRef.current.click();
  }

  return (
    <div className="flex w-1/3">
      <div
        className={`${
          dragActive ? "bg-blue-400" : "bg-blue-100"
        } px-4 w-full rounded-lg min-h-[10rem] text-center flex flex-col items-center justify-center`}
        onDragEnter={handleDragEnter}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
      >
        <p className="font-medium text-xl">{label}</p>
        <input
            name={name}
            placeholder="fileInput"
            className="hidden"
            ref={inputRef}
            type="file"
            multiple={false}
            onChange={handleChange}
            accept={accept}
        />
        {
            !files ? <p >
                Przeciągnij i upuść lub {" "}
                <span
                className="font-bold text-blue-600 cursor-pointer"
                onClick={openFileExplorer}
                >
                <u>Wybierz plik</u>
                </span>{" "}
                do wysłania
            </p> 
            : 
            <div className="flex flex-col items-center">
                <p className="text-wrap break-all">{files.name}</p>
                <span 
                className="font-bold text-red-600 cursor-pointer"
                onClick={removeFile}>
                    <u>Usuń</u>
                </span>
            </div>
        }
      </div>
    </div>
  );
}
