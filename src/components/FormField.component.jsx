import React from "react";

const FormField = ({
  labelName,
  placeholder,
  inputType,
  isTextArea,
  value,
  handleChange,
}) => {
  return (
    <label className="flex w-full flex-1 flex-col">
      {labelName && (
        <span className="mb-[10px] font-epilogue text-[14px] font-medium leading-[22px] text-[#808191]">
          {labelName}
        </span>
      )}
      {isTextArea ? (
        <textarea
          required
          value={value}
          onChange={handleChange}
          rows={10}
          placeholder={placeholder}
          className="rounded-[10px] border-[1px] border-[#3a3a43] bg-transparent py-[15px] px-[15px]  font-epilogue text-[14px] text-white outline-none placeholder:text-[#4b5264] sm:min-w-[500px] sm:px-[25px]"
        />
      ) : (
        <input
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          className="rounded-[10px] border-[1px] border-[#3a3a43] bg-transparent py-[15px] px-[15px]  font-epilogue text-[14px] text-white outline-none placeholder:text-[#4b5264] sm:min-w-[500px] sm:px-[25px]"
        />
      )}
    </label>
  );
};

export default FormField;
