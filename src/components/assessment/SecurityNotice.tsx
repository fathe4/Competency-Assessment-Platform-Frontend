import React from "react";
import { WarningIcon } from "../shared";

const SecurityNotice: React.FC = () => {
  const securityItems = [
    "Tab Switching Prohibited",
    "Navigation Restricted",
    "Context Menu Disabled",
    "Auto-Submit on Violation",
  ];

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 mb-12 max-w-5xl mx-auto">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center mr-4">
          <WarningIcon className="w-6 h-6 text-yellow-600" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900">
          Assessment Security Protocol
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {securityItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center p-4 bg-gray-50 rounded-2xl"
          >
            <div className="w-2 h-2 bg-gray-900 rounded-full mr-3"></div>
            <span className="text-sm font-medium text-gray-700">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityNotice;
