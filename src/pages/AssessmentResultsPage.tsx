import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAssessment } from "../hooks/useAssessment";
import { useCertificateDownload } from "../hooks/useCertificateDownload";
import { useGetAssessmentResultsQuery } from "../store/assessmentApi";

// Assessment-specific components
import AssessmentLayout from "../components/assessment/AssessmentLayout";
import ResultsCard from "../components/assessment/ResultsCard";

const AssessmentResultsPage: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();

  const {
    // Actions
    resetTest,
  } = useAssessment();

  // Use the new API query to get assessment results
  const {
    data: resultsData,
    isLoading,
    error,
  } = useGetAssessmentResultsQuery(testId!, {
    skip: !testId,
  });

  // Certificate download functionality
  const { downloadCertificatePDF, isDownloading } = useCertificateDownload();

  // Redirect to dashboard if no testId
  useEffect(() => {
    if (!testId) {
      navigate("/dashboard");
    }
  }, [testId, navigate]);

  const handleDownloadCertificate = async (certificateId: string) => {
    try {
      await downloadCertificatePDF(certificateId);
    } catch (error) {
      console.error("Failed to download certificate:", error);
    }
  };

  const handleContinueToNext = () => {
    resetTest();
    navigate("/assessment-test");
  };

  const handleReturnToSelection = () => {
    resetTest();
    navigate("/assessment-test");
  };

  // Loading state
  if (isLoading) {
    return (
      <AssessmentLayout>
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading results...</p>
        </div>
      </AssessmentLayout>
    );
  }

  // Error state
  if (error || !resultsData?.success || !resultsData?.data) {
    return (
      <AssessmentLayout>
        <div className="text-center py-16">
          <div className="bg-red-50 border-2 border-red-200 rounded-3xl px-6 py-8 max-w-md mx-auto">
            <p className="text-red-800 font-medium mb-4">
              {error ? "Failed to load assessment results" : "No results found"}
            </p>
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

  const { test, certificate } = resultsData.data;

  // Show results
  return (
    <AssessmentLayout>
      <div className="max-w-4xl mx-auto">
        <ResultsCard
          score={test.score}
          level={test.levelAchieved}
          canProceedToNext={test.canProceedToNextStep}
          currentStep={test.step}
          certificateInfo={certificate}
          isDownloading={isDownloading}
          onDownloadCertificate={handleDownloadCertificate}
          onContinueToNext={handleContinueToNext}
          onReturnToSelection={handleReturnToSelection}
        />
      </div>
    </AssessmentLayout>
  );
};

export default AssessmentResultsPage;
