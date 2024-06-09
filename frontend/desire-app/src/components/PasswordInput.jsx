import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShownPassword, setIsShownPassword] = useState(false);

  const togglePassword = () => {
    setIsShownPassword(!isShownPassword);
  };

  return (
    <div className="flex w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none">
      <input
        value={value}
        onChange={onChange}
        type={isShownPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="w-full text-sm outline-none bg-transparent rounded"
      />

      {isShownPassword ? (
        <FaRegEye
          size={19}
          className="text-primary cursor-pointer"
          onClick={() => togglePassword()}
        />
      ) : (
        <FaRegEyeSlash
          size={19}
          className="text-slate-400 cursor-pointer"
          onClick={() => togglePassword()}
        />
      )}
    </div>
  );
};

export default PasswordInput;
