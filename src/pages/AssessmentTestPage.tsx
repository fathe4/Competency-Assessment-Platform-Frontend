import React from "react";
import { useAssessment } from "../hooks/useAssessment";
import { ShieldIcon } from "../components/shared";

// Assessment-specific components
import AssessmentLayout from "../components/assessment/AssessmentLayout";
import LevelSelector from "../components/assessment/LevelSelector";

const AssessmentTestPage: React.FC = () => {
  const {
    // State
    isLoading,
    error,

    // Actions
    startAssessment,
  } = useAssessment();

  // Level Selection View (always show this page for level selection)
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
