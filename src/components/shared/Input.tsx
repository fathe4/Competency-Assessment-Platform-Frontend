import React from "react";

interface InputProps {
  id: string;
  name: string;
  type: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  autoComplete?: string;
  required?: boolean;
  icon: React.ReactNode;
  isFocused?: boolean;
  hasValue?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  name,
  type,
  label,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  autoComplete,
  required = false,
  icon,
  isFocused = false,
  hasValue = false,
}) => {
  return (
    <div className="space-y-1">
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <div
            className={`h-5 w-5 transition-colors duration-200 ${
              isFocused ? "text-blue-500" : "text-gray-400"
            }`}
          >
            {icon}
          </div>
        </div>
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required={required}
          className={`block w-full pl-10 pr-3 py-3 border rounded-xl transition-all duration-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
            hasValue ? "border-gray-300" : "border-gray-200"
          } placeholder-gray-400 text-gray-900 text-sm font-medium`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
    </div>
  );
};

export default Input;
