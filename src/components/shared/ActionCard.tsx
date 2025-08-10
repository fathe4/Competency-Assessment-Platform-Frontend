import React from "react";

interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
  buttonText?: string;
  href?: string;
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "info";
  disabled?: boolean;
}

const ActionCard: React.FC<ActionCardProps> = ({
  title,
  description,
  icon,
  onClick,
  buttonText = "Action",
  href,
  variant = "primary",
  disabled = false,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
          border: "border-blue-200/50",
          text: "text-blue-900",
          desc: "text-blue-700",
          button:
            "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700",
          icon: "text-blue-600",
        };
      case "secondary":
        return {
          bg: "bg-gradient-to-br from-gray-50 to-slate-50",
          border: "border-gray-200/50",
          text: "text-gray-900",
          desc: "text-gray-700",
          button:
            "bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700",
          icon: "text-gray-600",
        };
      case "success":
        return {
          bg: "bg-gradient-to-br from-green-50 to-emerald-50",
          border: "border-green-200/50",
          text: "text-green-900",
          desc: "text-green-700",
          button:
            "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700",
          icon: "text-green-600",
        };
      case "warning":
        return {
          bg: "bg-gradient-to-br from-yellow-50 to-amber-50",
          border: "border-yellow-200/50",
          text: "text-yellow-900",
          desc: "text-yellow-700",
          button:
            "bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700",
          icon: "text-yellow-600",
        };
      case "danger":
        return {
          bg: "bg-gradient-to-br from-red-50 to-rose-50",
          border: "border-red-200/50",
          text: "text-red-900",
          desc: "text-red-700",
          button:
            "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700",
          icon: "text-red-600",
        };
      case "info":
        return {
          bg: "bg-gradient-to-br from-cyan-50 to-sky-50",
          border: "border-cyan-200/50",
          text: "text-cyan-900",
          desc: "text-cyan-700",
          button:
            "bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-700 hover:to-sky-700",
          icon: "text-cyan-600",
        };
      default:
        return {
          bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
          border: "border-blue-200/50",
          text: "text-blue-900",
          desc: "text-blue-700",
          button:
            "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700",
          icon: "text-blue-600",
        };
    }
  };

  const styles = getVariantStyles();

  const handleClick = () => {
    if (disabled) return;
    if (href) {
      window.location.href = href;
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`${styles.bg} backdrop-blur-sm rounded-2xl border ${styles.border} p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={handleClick}
    >
      {/* Icon */}
      <div
        className={`w-12 h-12 ${styles.icon} mb-4 flex items-center justify-center bg-white/50 rounded-xl backdrop-blur-sm`}
      >
        {icon}
      </div>

      {/* Content */}
      <h3 className={`text-lg font-bold ${styles.text} mb-2`}>{title}</h3>
      <p className={`${styles.desc} text-sm mb-4 leading-relaxed`}>
        {description}
      </p>

      {/* Action Button */}
      <button
        className={`${styles.button} text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default ActionCard;
