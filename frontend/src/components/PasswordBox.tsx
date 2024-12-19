import { ChangeEvent, useState } from "react";

interface propsType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
function PasswordBox({ label, onChange, placeholder }: propsType) {
  const [curr, setCurr] = useState("Show");
  const [type, setType] = useState("password");
  const showHandler = () => {
    if (type === "password") {
      setType("text");
      setCurr("Hide");
    } else {
      setType("password");
      setCurr("Show");
    }
  };
  return (
    <div className="mt-4">
      <div className="text-md font-semibold">{label}</div>
      <div className="flex border border-slate-300 rounded-md mt-2">
        <input
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          className="w-full pl-3 rounded-l-md"
        ></input>
        <button
          onClick={showHandler}
          className="border-l border-slate-300 px-2 py-1 bg-black text-white rounded-tr-md rounded-br-md hover:bg-slate-800 focus:border-none"
        >
          {curr}
        </button>
      </div>
    </div>
  );
}

export default PasswordBox;
