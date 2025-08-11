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
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200 p-4 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        {/* Left side - Title */}
        <div className="flex items-center">
          <div className="w-8 h-8 bg-yellow-100 rounded-xl flex items-center justify-center mr-3">
            <WarningIcon className="w-4 h-4 text-yellow-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Security Protocol Active
          </h3>
        </div>

        {/* Right side - Security items in a horizontal layout */}
        <div className="flex items-center space-x-4">
          {securityItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center px-3 py-1.5 bg-white/80 rounded-lg border border-yellow-200/50"
            >
              <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full mr-2"></div>
              <span className="text-xs font-medium text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile responsive - stack vertically on small screens */}
      <div className="md:hidden mt-3 pt-3 border-t border-yellow-200">
        <div className="grid grid-cols-2 gap-2">
          {securityItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center px-2 py-1.5 bg-white/80 rounded-lg border border-yellow-200/50"
            >
              <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full mr-2"></div>
              <span className="text-xs font-medium text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecurityNotice;
