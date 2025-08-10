import React, { useEffect } from "react";
import { useAssessment } from "../hooks/useAssessment";
import { useAssessmentSecurity } from "../hooks/useAssessmentSecurity";
import { useCertificateDownload } from "../hooks/useCertificateDownload";
import { ShieldIcon } from "../components/shared";

// Assessment-specific components
import AssessmentLayout from "../components/assessment/AssessmentLayout";
import SecurityNotice from "../components/assessment/SecurityNotice";
import LevelSelector from "../components/assessment/LevelSelector";
import AssessmentHeader from "../components/assessment/AssessmentHeader";
import QuestionCard from "../components/assessment/QuestionCard";
import ResultsCard from "../components/assessment/ResultsCard";

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
    certificateInfo,

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
      updateAssessmentTimer(timeElapsed + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, updateAssessmentTimer, timeElapsed]);

  // Test completed - show results
  if (isCompleted) {
    return (
      <ResultsCard
        score={score}
        level={level}
        canProceedToNext={canProceedToNext}
        currentStep={currentStep}
        certificateInfo={certificateInfo}
        isDownloading={isDownloading}
        onDownloadCertificate={(certificateId) =>
          downloadCertificatePDF(certificateId)
        }
        onContinueToNext={() =>
          startAssessment((currentStep! + 1) as 1 | 2 | 3)
        }
        onReturnToSelection={resetTest}
      />
    );
  }

  // Active test - show current question
  if (currentQuestion) {
    return (
      <div className="min-h-screen max-h-screen overflow-hidden bg-gray-50 flex flex-col">
        <AssessmentHeader
          currentStep={currentStep}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
          progress={progress}
          timeRemaining={timeRemaining}
          securityActive={securityStatus.isSecurityActive}
          autoSubmitting={securityStatus.isAutoSubmitting}
        />

        <div className="flex-1 overflow-y-auto">
          <QuestionCard
            question={currentQuestion}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
            isProcessing={isProcessingQuestion}
            isSubmitting={isSubmittingAnswer}
            autoSubmitting={securityStatus.isAutoSubmitting}
            onSubmitAnswer={submitQuestionAnswer}
            onEndAssessment={finishAssessment}
          />
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <AssessmentLayout>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-16 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="animate-spin w-8 h-8 border-2 border-gray-600 border-t-transparent rounded-full mr-3"></div>
              <span className="text-lg font-medium text-gray-600">
                Loading assessment system...
              </span>
            </div>
          </div>
        </div>
      </AssessmentLayout>
    );
  }

  // Selection View (default)
  return (
    <AssessmentLayout>
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 text-white rounded-2xl mb-6">
          <ShieldIcon className="w-8 h-8" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          Digital Competency Assessment
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Professional evaluation system designed to measure and certify digital
          competencies across multiple proficiency levels
        </p>
      </div>

      <SecurityNotice />

      <LevelSelector isLoading={isLoading} onSelectLevel={startAssessment} />

      {error && (
        <div className="mt-8 text-center">
          <div className="inline-block bg-red-50 border-2 border-red-200 rounded-3xl px-6 py-4">
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        </div>
      )}
    </AssessmentLayout>
  );
};

export default AssessmentTestPage;
