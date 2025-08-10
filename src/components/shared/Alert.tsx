import React from "react";
import { ExclamationIcon } from "./Icons";

interface AlertProps {
  message: string;
  type?: "error" | "success" | "warning" | "info";
}

const Alert: React.FC<AlertProps> = ({ message, type = "error" }) => {
  const getAlertStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-50/80 border-green-200/50 text-green-800";
      case "warning":
        return "bg-yellow-50/80 border-yellow-200/50 text-yellow-800";
      case "info":
        return "bg-blue-50/80 border-blue-200/50 text-blue-800";
      case "error":
      default:
        return "bg-red-50/80 border-red-200/50 text-red-800";
    }
  };

  const getIconColor = () => {
    switch (type) {
      case "success":
        return "text-green-400";
      case "warning":
        return "text-yellow-400";
      case "info":
        return "text-blue-400";
      case "error":
      default:
        return "text-red-400";
    }
  };

  return (
    <div
      className={`rounded-xl backdrop-blur-sm border p-4 ${getAlertStyles()}`}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <div className={`h-5 w-5 ${getIconColor()}`}>
            <ExclamationIcon />
          </div>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-semibold">{message}</h3>
        </div>
      </div>
    </div>
  );
};

export default Alert;
