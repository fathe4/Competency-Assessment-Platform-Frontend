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

  return (
    <div>
      {/* Security Header */}
      {securityActive && (
        <div className="bg-gray-900 text-white px-4 py-2 text-center">
          <ShieldIcon className="w-4 h-4 inline mr-2" />
          <span className="font-semibold text-sm">SECURE ASSESSMENT MODE</span>
        </div>
      )}

      {/* Auto-submit warning */}
      {autoSubmitting && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-2 text-center">
          <div className="animate-spin w-3 h-3 border-2 border-yellow-600 border-t-transparent rounded-full inline mr-2"></div>
          <span className="font-medium text-sm">
            Security violation detected. Assessment will be submitted
            automatically.
          </span>
        </div>
      )}

      {/* Progress Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Level & Question */}
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div className="bg-gray-900 text-white px-2 py-1 rounded-lg text-center">
                <div className="text-xs font-semibold">Level</div>
                <div className="text-sm md:text-lg font-bold">
                  {currentStep ? String.fromCharCode(64 + currentStep) : "-"}
                </div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-xs text-gray-500 font-medium">
                  Question
                </div>
                <div className="text-sm md:text-lg font-bold text-gray-900">
                  {currentQuestionIndex + 1} / {totalQuestions}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="order-last md:order-none">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium text-gray-600">
                  Progress
                </span>
                <span className="text-xs font-bold text-gray-900">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 text-center mt-1">
                {Math.round(
                  ((currentQuestionIndex + 1) / totalQuestions) * 100
                )}
                % Complete
              </div>
            </div>

            {/* Timer */}
            <div className="flex items-center justify-center md:justify-end space-x-2">
              <div className="text-center md:text-right">
                <div className="text-xs text-gray-500 font-medium">
                  Time Left
                </div>
                <div className="text-sm md:text-lg font-bold text-gray-900">
                  {formatTime(timeRemaining)}
                </div>
              </div>
              <div className="bg-blue-50 p-1.5 rounded-lg">
                <ClockIcon className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentHeader;
