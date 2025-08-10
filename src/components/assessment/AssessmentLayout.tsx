import React from "react";

interface AssessmentLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const AssessmentLayout: React.FC<AssessmentLayoutProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
};

export default AssessmentLayout;
