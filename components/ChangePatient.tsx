"use client";

import React from "react";
import clsx from "clsx";
import { changePatient } from "@/lib/changePatient";
import { useRouter } from "next/navigation";

interface ButtonProps {
  patientId: string;
  direction: string;
  children?: React.ReactNode;
  color: "blue";
  disabled?: boolean | undefined;
}

export default async function ChangePatient({
  patientId,
  direction,
  color,
  children,
  disabled,
}: ButtonProps) {
  const router = useRouter();

  const colorVariants = {
    blue: "bg-primary-blue hover:bg-secondary-blue",
  };

  const className = `w-28 rounded-md px-4 py-2 ${
    disabled
      ? "bg-secondary-grey"
      : colorVariants[color as keyof typeof colorVariants]
  }`;

  const handlePatientChange = async () => {
    try {
      const newPatientId = await changePatient(
        patientId,
        direction == "next" ? 1 : -1
      );

      newPatientId
        ? router.push(`/patients/patient/${newPatientId}`)
        : router.push("/not-found");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      className={clsx(className)}
      disabled={disabled}
      onClick={handlePatientChange}
    >
      {children}
    </button>
  );
}
