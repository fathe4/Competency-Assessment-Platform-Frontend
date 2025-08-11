import React from "react";
import { ShieldIcon, ClockIcon } from "../shared";

interface AssessmentHeaderProps {
  currentStep?: number | null;
  currentQuestionIndex: number;
  totalQuestions: number;
  progress: number;
  timeRemaining: number;
  securityActive?: boolean;
  autoSubmitting?: boolean;
}

const AssessmentHeader: React.FC<AssessmentHeaderProps> = ({
  currentStep,
  currentQuestionIndex,
  totalQuestions,
  progress,
  timeRemaining,
  securityActive = false,
  autoSubmitting = false,
}) => {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getTimeColor = (seconds: number) => {
    if (seconds <= 300) return "text-red-600"; // 5 minutes or less - red
    if (seconds <= 600) return "text-yellow-600"; // 10 minutes or less - yellow
    return "text-green-600"; // More than 10 minutes - green
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return "from-green-500 to-emerald-600";
    if (progress >= 50) return "from-blue-500 to-indigo-600";
    if (progress >= 25) return "from-yellow-500 to-orange-600";
    return "from-red-500 to-pink-600";
  };

  return (
    <div className="sticky top-0 z-40 bg-white">
      {/* Security Header */}
      {securityActive && (
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-4 py-3 text-center shadow-sm">
          <div className="flex items-center justify-center">
            <div className="flex items-center bg-white/10 rounded-full px-3 py-1">
              <ShieldIcon className="w-4 h-4 mr-2" />
              <span className="font-semibold text-sm">
                SECURE ASSESSMENT MODE
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Auto-submit warning */}
      {autoSubmitting && (
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-200 text-red-800 px-4 py-3 text-center">
          <div className="flex items-center justify-center">
            <div className="animate-spin w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full mr-3"></div>
            <span className="font-semibold text-sm">
              Security violation detected. Assessment will be submitted
              automatically.
            </span>
          </div>
        </div>
      )}

      {/* Enhanced Progress Header */}
      <div className="bg-gradient-to-r from-gray-50 to-white shadow-lg border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
            {/* Level & Question - Enhanced Design */}
            <div className="flex items-center justify-center lg:justify-start space-x-4">
              <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white px-4 py-3 rounded-xl shadow-md">
                <div className="text-center">
                  <div className="text-xs font-semibold opacity-90 mb-1">
                    Assessment Level
                  </div>
                  <div className="text-2xl font-bold">
                    {currentStep ? String.fromCharCode(64 + currentStep) : "-"}
                  </div>
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-sm text-gray-500 font-semibold mb-1">
                  Current Question
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {currentQuestionIndex + 1}
                  <span className="text-gray-400 mx-1">/</span>
                  <span className="text-gray-600">{totalQuestions}</span>
                </div>
              </div>
            </div>

            {/* Enhanced Progress Bar */}
            <div className="lg:col-span-2 order-last lg:order-none">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  Overall Progress
                </span>
                <span className="text-sm font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded-md">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                  <div
                    className={`bg-gradient-to-r ${getProgressColor(progress)} h-3 rounded-full transition-all duration-700 ease-out shadow-sm`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">
                    Questions: {currentQuestionIndex + 1}/{totalQuestions}
                  </span>
                  <span className="text-xs text-gray-500">
                    {Math.round(
                      ((currentQuestionIndex + 1) / totalQuestions) * 100
                    )}
                    % Complete
                  </span>
                </div>
              </div>
            </div>

            {/* Enhanced Timer */}
            <div className="flex items-center justify-center lg:justify-end">
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 min-w-[140px]">
                <div className="flex items-center justify-between">
                  <div className="text-center flex-1">
                    <div className="text-xs text-gray-500 font-semibold mb-1">
                      Time Remaining
                    </div>
                    <div
                      className={`text-xl font-bold ${getTimeColor(timeRemaining)}`}
                    >
                      {formatTime(timeRemaining)}
                    </div>
                  </div>
                  <div
                    className={`p-2 rounded-lg ml-3 ${
                      timeRemaining <= 300
                        ? "bg-red-50"
                        : timeRemaining <= 600
                          ? "bg-yellow-50"
                          : "bg-green-50"
                    }`}
                  >
                    <ClockIcon
                      className={`w-5 h-5 ${
                        timeRemaining <= 300
                          ? "text-red-600"
                          : timeRemaining <= 600
                            ? "text-yellow-600"
                            : "text-green-600"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentHeader;
