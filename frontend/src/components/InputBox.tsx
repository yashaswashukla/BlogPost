import { ChangeEvent } from "react";

interface propsType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
function InputBox({ label, onChange, placeholder }: propsType) {
  return (
    <div className="mt-4">
      <div className="text-md font-semibold">{label}</div>
      <input
        onChange={onChange}
        type="text"
        placeholder={placeholder}
        className="border rounded-md border-slate-300 w-full px-3 py-1 mt-2"
      />
    </div>
  );
}

export default InputBox;
