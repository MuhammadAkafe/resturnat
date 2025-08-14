import { forwardRef } from "react";

interface FormFieldProps {
  id: string;
  label: string;
  type?: "text" | "email" | "password" | "tel" | "url" | "number";
  placeholder?: string;
  value?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  autoComplete?: string;
  className?: string;
  "aria-describedby"?: string;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      id,
      label,
      type = "text",
      placeholder,
      value,
      name,
      onChange,
      onBlur,
      error,
      required = false,
      disabled = false,
      minLength,
      maxLength,
      pattern,
      autoComplete,
      className = "",
      "aria-describedby": ariaDescribedby,
    },
    ref
  ) => {
    const errorId = `${id}-error`;
    const describedBy = [ariaDescribedby, error && errorId]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="space-y-1">
        <label
          htmlFor={id}
          className={`block text-sm font-medium text-gray-700 ${
            required
              ? "after:content-['*'] after:ml-0.5 after:text-red-500"
              : ""
          }`}
        >
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          minLength={minLength}
          maxLength={maxLength}
          pattern={pattern}
          autoComplete={autoComplete}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={describedBy || undefined}
          className={`
            w-full rounded-lg border px-3 py-2 text-gray-900 placeholder-gray-400 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? "border-red-300 focus:ring-red-500" : "border-gray-300"}
            ${className}
          `}
        />
        {error && (
          <p
            id={errorId}
            className="text-sm text-red-600"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";

export default FormField;
