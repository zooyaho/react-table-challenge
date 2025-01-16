import { AiOutlineSearch } from "react-icons/ai";
import { forwardRef, InputHTMLAttributes } from "react";
import BasicInput from "../BasicInput";

const SearchInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className = "", ...props }, ref) => {
  return (
    <BasicInput
      ref={ref}
      leftIcon={<AiOutlineSearch />}
      className={`w-full ${className}`}
      {...props}
    />
  );
});

export default SearchInput;
