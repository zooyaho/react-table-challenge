import React from "react";
import { FaCheck } from "react-icons/fa";

interface CheckboxPropsType {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export default function Checkbox({
  checked = false,
  onChange,
}: CheckboxPropsType) {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="hidden"
      />
      <div
        className={`w-6 h-6 flex items-center justify-center rounded border ${
          checked ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300"
        }`}
      >
        {checked && <FaCheck className="text-white" />}
      </div>
    </label>
  );
}
