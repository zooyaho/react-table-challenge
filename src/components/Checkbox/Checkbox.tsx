import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";

interface CheckboxPropsType {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export default function Checkbox({ checked, onChange }: CheckboxPropsType) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange?.(newChecked);
  };

  return (
    <div
      className={`w-6 h-6 flex items-center justify-center cursor-pointer rounded border ${
        isChecked ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300"
      }`}
      onClick={handleToggle}
    >
      {isChecked && <FaCheck className="text-white" />}
    </div>
  );
}
