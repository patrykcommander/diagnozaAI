import React from "react";
import DropZone from "./DropZone";
import { SubmitHandler, useForm, Controller } from "react-hook-form";

interface UploadProps {
    closeDialog?: () => void;
}

export default function Upload({ closeDialog } : UploadProps) {
    const {
        register,
        control,
        handleSubmit,
    } = useForm({mode: "onSubmit"});


    const formSubmit = (formData: any) => {        
        console.log(formData)
    };

    return (
        <div className="flex flex-col items-center justify-center h-96">
            <form id="file-upload" className="w-full" onSubmit={handleSubmit(formSubmit)}>
                <div className="flex flex-row justify-evenly mb-10">
                    <Controller
                    name="json"
                    control={control}
                    defaultValue={null}
                    render={({ field }) => (
                        <DropZone
                            label="JSON"
                            accept=".json"
                            name="json"
                            control={control}
                        />
                    )}
                    />
                    <Controller
                    name="csv"
                    control={control}
                    defaultValue={null}
                    render={({ field }) => (
                        <DropZone
                            label="CSV"
                            accept=".csv"
                            name="csv"
                            control={control}
                        />
                    )}
                    />
                </div>
            </form>
            <button
            className="rounded-md px-4 py-2 bg-black"
            type="submit"
            form="file-upload"
            >
                <span className="text-white">Submit</span>
            </button>
        </div>
    )
}
