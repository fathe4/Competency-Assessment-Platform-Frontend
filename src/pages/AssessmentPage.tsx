import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAssessment } from "../hooks/useAssessment";
import { useAssessmentSecurity } from "../hooks/useAssessmentSecurity";

// Assessment-specific components
import AssessmentLayout from "../components/assessment/AssessmentLayout";
import AssessmentHeader from "../components/assessment/AssessmentHeader";
import QuestionCard from "../components/assessment/QuestionCard";
import SecurityNotice from "../components/assessment/SecurityNotice";

const AssessmentPage: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();

  const {
    // State
    currentStep,
    isActive,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    isCompleted,
    timeRemaining,
    timeElapsed,
    progress,
    isLoading,
    error,
    isProcessingQuestion,

    // Actions
    submitQuestionAnswer,
    updateAssessmentTimer,
    finishAssessment,
    loadAssessmentByTestId,
  } = useAssessment();

  // Handle end assessment with loading state and redirect
  const handleEndAssessment = async () => {
    await finishAssessment();
    // Redirect to results page after completion
    navigate(`/assessment/${testId}/results`);
  };

  // Handle auto-submit due to security violation
  const handleAutoSubmit = async () => {
    console.warn("Auto-submitting test due to security violation");
    await finishAssessment();
    navigate(`/assessment/${testId}/results`);
  };

  // Initialize assessment security
  const securityStatus = useAssessmentSecurity({
    isActive: isActive && !isCompleted,
    onAutoSubmit: handleAutoSubmit,
  });

  // Load assessment data when component mounts
  useEffect(() => {
    if (testId && !isActive) {
      loadAssessmentByTestId(testId);
    }
  }, [testId, isActive, loadAssessmentByTestId]);

  // Timer effect
  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      updateAssessmentTimer(timeElapsed + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, timeElapsed, updateAssessmentTimer]);

  // Redirect to dashboard if no testId
  useEffect(() => {
    if (!testId) {
      navigate("/dashboard");
    }
  }, [testId, navigate]);

  // Handle completed assessment - redirect to results
  useEffect(() => {
    if (isCompleted && testId) {
      navigate(`/assessment/${testId}/results`);
    }
  }, [isCompleted, testId, navigate]);

  // Loading state
  if (isLoading) {
    return (
      <AssessmentLayout>
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading assessment...</p>
        </div>
      </AssessmentLayout>
    );
  }

  // Error state
  if (error) {
    return (
      <AssessmentLayout>
        <div className="text-center py-16">
          <div className="bg-red-50 border-2 border-red-200 rounded-3xl px-6 py-8 max-w-md mx-auto">
            <p className="text-red-800 font-medium mb-4">{error}</p>
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </AssessmentLayout>
    );
  }

  // Show assessment interface
  if (isActive && currentQuestion) {
    return (
      <AssessmentLayout>
        <AssessmentHeader
          currentStep={currentStep}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
          timeRemaining={timeRemaining}
          progress={progress}
          securityActive={securityStatus?.isSecurityActive}
          autoSubmitting={securityStatus?.isAutoSubmitting}
        />

        <QuestionCard
          question={currentQuestion}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
          onSubmitAnswer={submitQuestionAnswer}
          isProcessing={isProcessingQuestion}
          isSubmitting={isProcessingQuestion}
          autoSubmitting={securityStatus?.isAutoSubmitting || false}
          onEndAssessment={handleEndAssessment}
        />

        {/* Security Notice - Show Assessment Security Protocol at bottom */}
        <div className="mt-6">
          <SecurityNotice />
        </div>

        {/* Security Status Indicator */}
        {securityStatus && !securityStatus.isSecurityActive && (
          <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded-lg shadow-lg">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm font-medium">
                Security monitoring active
              </span>
            </div>
          </div>
        )}
      </AssessmentLayout>
    );
  }

  // Fallback - redirect to dashboard
  return (
    <AssessmentLayout>
      <div className="text-center py-16">
        <p className="text-gray-600 mb-4">No active assessment found.</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Return to Dashboard
        </button>
      </div>
    </AssessmentLayout>
  );
};

export default AssessmentPage;
