import React, { useEffect } from "react";
import { useAssessment } from "../hooks/useAssessment";
import { useAssessmentSecurity } from "../hooks/useAssessmentSecurity";
import { useCertificateDownload } from "../hooks/useCertificateDownload";

const AssessmentTestPage: React.FC = () => {
  const {
    // State
    currentStep,
    isActive,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    isCompleted,
    score,
    level,
    canProceedToNext,
    timeRemaining,
    timeElapsed,
    progress,
    isLoading,
    error,
    isSubmittingAnswer,
    isProcessingQuestion,
    certificateInfo, // Add certificate info

    // Actions
    startAssessment,
    submitQuestionAnswer,
    updateAssessmentTimer,
    finishAssessment,
    resetTest,
  } = useAssessment();

  // Certificate download functionality
  const { downloadCertificatePDF, isDownloading } = useCertificateDownload();

  // Handle auto-submit due to security violation
  const handleAutoSubmit = () => {
    console.warn("Auto-submitting test due to security violation");
    finishAssessment();
  };

  // Initialize assessment security
  const securityStatus = useAssessmentSecurity({
    isActive: isActive && !isCompleted,
    onAutoSubmit: handleAutoSubmit,
  });

  // Timer effect
  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      // Get current elapsed time from state and increment
      updateAssessmentTimer(timeElapsed + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, updateAssessmentTimer, timeElapsed]);

  // Format time remaining
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Test not started yet
  if (!isActive && !isCompleted) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
          Digital Competency Assessment
        </h1>

        {/* Security Notice */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <div className="text-red-600 mr-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-red-800 font-semibold mb-2">
                Assessment Security Notice
              </h3>
              <ul className="text-red-700 text-sm space-y-1">
                <li>
                  • Tab switching is <strong>strictly prohibited</strong>
                </li>
                <li>
                  • Navigation away from this page is{" "}
                  <strong>not allowed</strong>
                </li>
                <li>
                  • Right-click and keyboard shortcuts are{" "}
                  <strong>disabled</strong>
                </li>
                <li>
                  • Any security violation will result in{" "}
                  <strong>automatic test submission</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Choose Test Step</h2>
          <div className="space-y-4">
            <button
              onClick={() => startAssessment(1)}
              className="w-full p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              disabled={isLoading}
            >
              Step 1: A1 & A2 Levels (44 questions)
            </button>
            <button
              onClick={() => startAssessment(2)}
              className="w-full p-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
              disabled={isLoading}
            >
              Step 2: B1 & B2 Levels (44 questions)
            </button>
            <button
              onClick={() => startAssessment(3)}
              className="w-full p-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
              disabled={isLoading}
            >
              Step 3: C1 & C2 Levels (44 questions)
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
      </div>
    );
  }

  // Test completed - show results
  if (isCompleted) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h1 className="text-3xl font-bold mb-4">Test Complete!</h1>

          <div className="mb-6">
            <div className="text-6xl font-bold text-blue-500 mb-2">
              {Math.round(score)}%
            </div>
            <div className="text-xl text-gray-600">Your Score</div>
          </div>

          <div className="mb-6">
            <div className="text-2xl font-semibold mb-2">
              Level Achieved: {level}
            </div>

            {level === "FAILED" && (
              <div className="text-red-600">
                Unfortunately, you cannot retake Step 1. Score was below 25%.
              </div>
            )}

            {canProceedToNext && (
              <div className="text-green-600">
                Congratulations! You can proceed to the next step.
              </div>
            )}
          </div>

          <div className="space-y-3">
            {/* Certificate Download Button */}
            {certificateInfo && level !== "FAILED" && (
              <button
                onClick={() => downloadCertificatePDF(certificateInfo.id)}
                disabled={isDownloading}
                className={`w-full p-3 rounded-lg transition-all duration-200 ${
                  isDownloading
                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {isDownloading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating Certificate...
                  </div>
                ) : (
                  <>📜 Download Certificate</>
                )}
              </button>
            )}

            {canProceedToNext && currentStep && currentStep < 3 && (
              <button
                onClick={() => startAssessment((currentStep + 1) as 1 | 2 | 3)}
                className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Start Step {currentStep + 1}
              </button>
            )}

            <button
              onClick={resetTest}
              className="w-full p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Start Over
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active test - show current question
  if (currentQuestion) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        {/* Security Status Bar */}
        {securityStatus.isSecurityActive && (
          <div className="bg-red-600 text-white px-4 py-2 rounded-lg mb-4 flex items-center">
            <div className="w-2 h-2 bg-red-300 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm font-semibold">SECURE MODE ACTIVE</span>
          </div>
        )}

        {/* Auto-submit warning */}
        {securityStatus.isAutoSubmitting && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded mb-4">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600 mr-2"></div>
              <span className="font-semibold">
                🚨 Security violation detected! Auto-submitting test in 2
                seconds...
              </span>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm text-gray-600">Step {currentStep}</span>
              <div className="font-semibold">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Time Remaining</div>
              <div className="font-semibold text-red-500">
                {formatTime(timeRemaining)}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">{currentQuestion.text}</h2>

          <div
            className={`space-y-3 transition-all duration-300 ${
              isProcessingQuestion || securityStatus.isAutoSubmitting
                ? "opacity-50 pointer-events-none"
                : ""
            }`}
          >
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => submitQuestionAnswer(index)}
                disabled={
                  isProcessingQuestion || securityStatus.isAutoSubmitting
                }
                className={`w-full p-4 text-left border border-gray-300 rounded-lg transition-all duration-200 ${
                  isProcessingQuestion || securityStatus.isAutoSubmitting
                    ? "cursor-not-allowed bg-gray-100 border-gray-200"
                    : "hover:bg-gray-50 hover:border-blue-500 cursor-pointer"
                }`}
              >
                <span className="font-medium mr-3">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </button>
            ))}
          </div>

          {/* Loading indicator */}
          {(isProcessingQuestion || securityStatus.isAutoSubmitting) && (
            <div className="flex items-center justify-center mt-4 p-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <span className="ml-2 text-blue-600 font-medium">
                {securityStatus.isAutoSubmitting
                  ? "Auto-submitting due to security violation..."
                  : isSubmittingAnswer
                    ? "Submitting answer..."
                    : "Loading next question..."}
              </span>
            </div>
          )}

          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Competency: {currentQuestion.competency} ({currentQuestion.level})
            </div>

            <button
              onClick={finishAssessment}
              disabled={isProcessingQuestion || securityStatus.isAutoSubmitting}
              className={`px-4 py-2 rounded transition-all duration-200 ${
                isProcessingQuestion || securityStatus.isAutoSubmitting
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-red-500 text-white hover:bg-red-600"
              }`}
            >
              End Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center">Loading...</div>
    </div>
  );
};

export { AssessmentTestPage };
