import React from "react";
import { TrophyIcon, CheckCircleIcon, DownloadIcon } from "../shared";

interface CertificateInfo {
  id: string;
  levelAchieved: string;
}

interface ResultsCardProps {
  score: number;
  level: string | null;
  canProceedToNext: boolean;
  currentStep?: number | null;
  certificateInfo?: CertificateInfo | null;
  isDownloading: boolean;
  onDownloadCertificate: (certificateId: string) => void;
  onContinueToNext: () => void;
  onReturnToSelection: () => void;
}

const ResultsCard: React.FC<ResultsCardProps> = ({
  score,
  level,
  canProceedToNext,
  currentStep,
  certificateInfo,
  isDownloading,
  onDownloadCertificate,
  onContinueToNext,
  onReturnToSelection,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            {/* Trophy Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl mb-6 shadow-sm">
              <TrophyIcon className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Assessment Completed!
            </h1>

            {/* Score Display */}
            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <div className="text-5xl font-bold text-gray-900 mb-3">
                {Math.round(score)}%
              </div>
              <div className="text-lg text-gray-600 mb-4">Final Score</div>
              <div className="max-w-xs mx-auto">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-gray-800 to-gray-900 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(Math.max(score, 0), 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Level Achievement */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Competency Level Achieved
              </h2>

              {level === "FAILED" ? (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-lg mx-auto">
                  <div className="flex items-center justify-center mb-3">
                    <span className="text-2xl font-bold text-red-900">
                      {level}
                    </span>
                  </div>
                  <p className="text-red-800 font-medium text-sm">
                    Unfortunately, you cannot retake Step 1. Score was below
                    25%.
                  </p>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6 max-w-lg mx-auto">
                  <div className="flex items-center justify-center mb-3">
                    <CheckCircleIcon className="w-6 h-6 text-green-600 mr-2" />
                    <span className="text-2xl font-bold text-green-900">
                      {level || "COMPLETED"}
                    </span>
                  </div>
                  <p className="text-green-800 font-medium text-sm">
                    {canProceedToNext
                      ? "Professional competency level achieved. You are authorized to proceed to the next assessment level."
                      : "Competency level achieved."}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 max-w-xs mx-auto">
              {certificateInfo && level !== "FAILED" && (
                <button
                  className="w-full bg-gray-900 text-white rounded-xl py-3 px-4 font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isDownloading}
                  onClick={() => onDownloadCertificate(certificateInfo.id)}
                >
                  <DownloadIcon className="w-4 h-4 mr-2" />
                  {isDownloading
                    ? "Generating Certificate..."
                    : "Download Certificate"}
                </button>
              )}

              {canProceedToNext && currentStep && currentStep < 3 && (
                <button
                  className="w-full bg-green-600 text-white rounded-xl py-3 px-4 font-semibold hover:bg-green-700 transition-colors"
                  onClick={onContinueToNext}
                >
                  Continue to Level {String.fromCharCode(65 + currentStep)}
                </button>
              )}

              <button
                className="w-full border border-gray-300 text-gray-700 rounded-xl py-3 px-4 font-semibold hover:bg-gray-50 transition-colors"
                onClick={onReturnToSelection}
              >
                Return to Level Selection
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsCard;
