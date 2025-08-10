import React from "react";

interface Question {
  text: string;
  options: string[];
  competency: string;
  level: string;
}

interface QuestionCardProps {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  isProcessing: boolean;
  isSubmitting: boolean;
  autoSubmitting: boolean;
  onSubmitAnswer: (answerIndex: number) => void;
  onEndAssessment: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentQuestionIndex,
  totalQuestions,
  isProcessing,
  isSubmitting,
  autoSubmitting,
  onSubmitAnswer,
  onEndAssessment,
}) => {
  const isDisabled = isProcessing || autoSubmitting;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Question Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {question.competency}
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-bold bg-gray-900 text-white">
              {question.level}
            </span>
          </div>
        </div>

        {/* Question Content */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 leading-relaxed">
            {question.text}
          </h2>

          {/* Answer Options */}
          <div
            className={`space-y-3 transition-all duration-300 ${
              isDisabled ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            {question.options.map((option, index) => (
              <button
                key={index}
                type="button"
                className={`w-full group relative ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
                disabled={isDisabled}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (!isDisabled) {
                    onSubmitAnswer(index);
                  }
                }}
              >
                <div
                  className={`flex items-start p-4 border-2 border-gray-200 rounded-xl transition-all duration-200 text-left ${
                    !isDisabled
                      ? "hover:border-blue-300 hover:bg-blue-50 cursor-pointer"
                      : ""
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-lg border-2 border-gray-300 bg-white flex items-center justify-center font-semibold text-gray-700 mr-4 transition-all duration-200 ${
                      !isDisabled
                        ? "group-hover:border-blue-500 group-hover:bg-blue-500 group-hover:text-white"
                        : ""
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 font-medium leading-relaxed">
                      {option}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Loading State */}
          {(isProcessing || autoSubmitting) && (
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center justify-center">
                <div className="animate-spin w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full mr-3"></div>
                <span className="text-blue-800 font-medium text-sm">
                  {autoSubmitting
                    ? "Auto-submitting due to security violation..."
                    : isSubmitting
                      ? "Submitting answer..."
                      : "Loading next question..."}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <span className="font-medium">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
              <span className="mx-2">•</span>
              <span>
                {Math.round(
                  ((currentQuestionIndex + 1) / totalQuestions) * 100
                )}
                % Complete
              </span>
            </div>

            <button
              type="button"
              className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-50 cursor-pointer"
              }`}
              disabled={isDisabled}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!isDisabled) {
                  onEndAssessment();
                }
              }}
            >
              End Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
