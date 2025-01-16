import React, { forwardRef, InputHTMLAttributes, ReactNode } from "react";

interface BasicInputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
}

/* 기본 input */
const BasicInput = forwardRef<HTMLInputElement, BasicInputProps>(
  ({ leftIcon, rightIcon, className = "", ...props }, ref) => {
    return (
      <div className={`relative flex items-center ${className}`}>
        {leftIcon && (
          <span className="absolute left-3 text-gray-500">{leftIcon}</span>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
            ${leftIcon ? "pl-10" : ""} 
            ${rightIcon ? "pr-10" : ""}
          `}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3 text-gray-500">{rightIcon}</span>
        )}
      </div>
    );
  }
);

export default BasicInput;
