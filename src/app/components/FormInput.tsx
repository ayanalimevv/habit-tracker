import React from "react";

const FormInput = ({
  label,
  type,
  placeholder,
  required = false,
  onChangeHandler,
  value,
}: {
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
  onChangeHandler: React.Dispatch<React.SetStateAction<any>>;
  value: any;
}) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="input input-bordered"
        required={required}
        onChange={(e) => onChangeHandler(e.target.value)}
        value={value}
      />
    </div>
  );
};

export default FormInput;
