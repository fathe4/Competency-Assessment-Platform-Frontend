import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "7xl" | "full";
  padding?: boolean;
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className = "",
  maxWidth = "7xl",
  padding = true,
}) => {
  const getMaxWidthClass = () => {
    switch (maxWidth) {
      case "sm":
        return "max-w-sm";
      case "md":
        return "max-w-md";
      case "lg":
        return "max-w-lg";
      case "xl":
        return "max-w-xl";
      case "2xl":
        return "max-w-2xl";
      case "7xl":
        return "max-w-7xl";
      case "full":
        return "max-w-full";
      default:
        return "max-w-7xl";
    }
  };

  const paddingClass = padding ? "px-4 sm:px-6 lg:px-8 py-8" : "";

  return (
    <div
      className={`${getMaxWidthClass()} mx-auto ${paddingClass} ${className}`}
    >
      {children}
    </div>
  );
};

export default PageContainer;
