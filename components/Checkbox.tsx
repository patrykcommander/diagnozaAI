import React from "react"

interface CheckboxProps {
    isChecked: boolean;
}

export default function Checkbox({ isChecked } : CheckboxProps) {
  return (
    <input className="table-checkbox" type="checkbox" checked={isChecked} readOnly>
    </input>
  )
}
