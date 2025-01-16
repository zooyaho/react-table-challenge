import { AiOutlineSearch } from "react-icons/ai";
import { InputHTMLAttributes } from "react";
import BasicInput from "../BasicInput";

export default function SearchInput({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <BasicInput
      leftIcon={<AiOutlineSearch />}
      className={`w-full ${className}`}
      {...props}
    />
  );
}
