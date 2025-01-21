import { ChangeEvent, InvalidEvent } from "react";

interface FormInputI {
  label?: string;
  htmlFor?: string;
  type?: string;
  placeholder?: string;
  maxLength?: number; // Fixed typo: "maxLenght" -> "maxLength"
  minLength?: number; // Fixed typo: "minLenght" -> "minLength"
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  pattern?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onInvalid?: (e: InvalidEvent<HTMLInputElement>) => void; // Fixed type
}

export const FormInput = ({
  htmlFor,
  type = "text",
  placeholder,
  onChange,
  label = "input",
  required,
  readOnly,
  disabled,
  minLength,
  maxLength,
  pattern,
  onInvalid,
}: FormInputI) => {
  return (
    <label htmlFor={htmlFor} className="register-form-field-container">
      <h3 className="register-form-field-title">{label}</h3>
      <input
        pattern={pattern}
        minLength={minLength}
        maxLength={maxLength}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        type={type}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          e.currentTarget.setCustomValidity("");
          onChange ? onChange(e) : undefined;
        }}
        className="register-form-field-input"
        placeholder={placeholder}
        onInvalid={(e: InvalidEvent<HTMLInputElement>) => {
          if (onInvalid) {
            onInvalid(e);
          }
        }}
      />
    </label>
  );
};
