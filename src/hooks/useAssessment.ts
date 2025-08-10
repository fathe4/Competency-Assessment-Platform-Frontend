import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  startTest,
  completeTest,
  updateTimer,
  setLoading as setAssessmentLoading,
  setError,
  resetAssessment,
} from "../store/slices/assessmentSlice";
import {
  useStartAssessmentMutation,
  useGetCurrentQuestionQuery,
  useSubmitAnswerMutation,
  useCompleteAssessmentMutation,
} from "../store/assessmentApi";
import { toastUtils } from "../utils/toast";

/**
 * Hook that uses Redux state + API calls - backend handles all business logic
 */
export const useAssessment = () => {
  const dispatch = useAppDispatch();
  const assessmentState = useAppSelector((state) => state.assessment);

  // Local state for answer submission loading
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);

  // Local state for certificate information
  const [certificateInfo, setCertificateInfo] = useState<{
    id: string;
    levelAchieved: string;
  } | null>(null);

  // API hooks
  const [startAssessmentAPI] = useStartAssessmentMutation();
  const [submitAnswerAPI] = useSubmitAnswerMutation();
  const [completeAssessmentAPI] = useCompleteAssessmentMutation();

  // Get current question from API (only when test is active)
  const {
    data: questionData,
    isLoading: isLoadingQuestion,
    error: questionError,
    refetch: refetchQuestion,
  } = useGetCurrentQuestionQuery(assessmentState.testId || "", {
    skip: !assessmentState.testId || !assessmentState.isActive,
  });

  // Combined loading state - either loading question from API or submitting answer
  const isProcessingQuestion = isLoadingQuestion || isSubmittingAnswer;

  // Start assessment
  const startAssessment = useCallback(
    async (step: 1 | 2 | 3) => {
      try {
        dispatch(setAssessmentLoading(true));
        setCertificateInfo(null); // Reset certificate info for new assessment

        const response = await startAssessmentAPI({ step }).unwrap();

        if (response.success && response.data) {
          const { testId } = response.data;

          // Start test with API data (no mock questions needed)
          dispatch(
            startTest({
              step,
              testId,
            })
          );
        }

        dispatch(setAssessmentLoading(false));
      } catch (error: unknown) {
        console.error("Failed to start assessment:", error);

        // Type guard to check if error has the expected structure
        const getErrorMessage = (err: unknown): string => {
          if (err && typeof err === "object" && "data" in err) {
            const errorWithData = err as { data?: { message?: string } };
            return errorWithData.data?.message || "Failed to start assessment";
          }
          return "Failed to start assessment";
        };

        dispatch(setError(getErrorMessage(error)));
        dispatch(setAssessmentLoading(false));
      }
    },
    [dispatch, startAssessmentAPI]
  );

  // Submit answer
  const submitQuestionAnswer = useCallback(
    async (selectedOptionIndex: number) => {
      if (!assessmentState.testId || isSubmittingAnswer) return;

      // Get current question ID from API data
      const currentQuestionId = questionData?.data?.question?.id;
      if (!currentQuestionId) {
        console.error("No current question ID available");
        dispatch(setError("No current question available"));
        return;
      }

      try {
        setIsSubmittingAnswer(true);

        const response = await submitAnswerAPI({
          testId: assessmentState.testId,
          questionId: currentQuestionId,
          selectedOptionIndex,
          timeSpent: 30,
        }).unwrap();

        // Show toast notification for answer result
        if (response.success && response.data) {
          if (response.data.isCorrect) {
            toastUtils.success("Correct answer! 🎉", {
              autoClose: 2000,
            });
          } else {
            toastUtils.error("Incorrect answer", {
              autoClose: 2000,
            });
          }
        }

        // Refetch to get next question
        await refetchQuestion();
      } catch (error) {
        console.error("Failed to submit answer:", error);
        dispatch(setError("Failed to submit answer"));
        toastUtils.error("Failed to submit answer. Please try again.");
      } finally {
        setIsSubmittingAnswer(false);
      }
    },
    [
      assessmentState.testId,
      questionData?.data?.question?.id,
      dispatch,
      submitAnswerAPI,
      refetchQuestion,
      isSubmittingAnswer,
    ]
  );

  // Complete assessment
  const completeAssessment = useCallback(async () => {
    if (!assessmentState.testId) return;

    // Prevent multiple completion calls
    if (assessmentState.isCompleted || assessmentState.isLoading) {
      console.log("Assessment already completed or in progress, skipping...");
      return;
    }

    try {
      console.log("Completing assessment...", {
        testId: assessmentState.testId,
        timeElapsed: assessmentState.timeElapsed,
      });

      const response = await completeAssessmentAPI({
        testId: assessmentState.testId,
        totalTimeSpent: assessmentState.timeElapsed,
      }).unwrap();

      // Update Redux state with API completion data
      if (response.success && response.data?.test) {
        const testData = response.data.test;
        const certificateData = response.data.certificate;

        dispatch(
          completeTest({
            score: testData.score,
            levelAchieved: testData.levelAchieved,
            canProceedToNextStep: testData.canProceedToNextStep,
          })
        );

        // Store certificate info if available
        setCertificateInfo(certificateData);

        console.log("Assessment completed successfully:", response.data);
      } else {
        // Fallback when API data is incomplete
        console.warn("API response missing required data, using fallback");
        dispatch(completeTest(undefined));
        setCertificateInfo(null);
      }
    } catch (error) {
      console.error("Failed to complete assessment:", error);
      // Still complete locally to prevent UI hanging
      dispatch(completeTest(undefined));
    }
  }, [
    dispatch,
    completeAssessmentAPI,
    assessmentState.testId,
    assessmentState.timeElapsed,
    assessmentState.isCompleted,
    assessmentState.isLoading,
  ]);

  // Update timer
  const updateAssessmentTimer = useCallback(
    (elapsedSeconds: number) => {
      dispatch(updateTimer(elapsedSeconds));

      // Auto-complete when time is up - use API timeRemaining
      const apiTimeRemaining = questionData?.data?.testProgress?.timeRemaining;

      // Debug logging
      console.log("Timer update:", {
        elapsedSeconds,
        apiTimeRemaining,
        willAutoComplete:
          apiTimeRemaining !== undefined && apiTimeRemaining <= 0,
      });

      if (apiTimeRemaining !== undefined && apiTimeRemaining <= 0) {
        console.log("Time's up! Auto-completing assessment...");
        completeAssessment();
      }
    },
    [
      dispatch,
      questionData?.data?.testProgress?.timeRemaining,
      completeAssessment,
    ]
  );

  // Reset everything
  const resetTest = useCallback(() => {
    dispatch(resetAssessment());
    setCertificateInfo(null); // Reset certificate info
  }, [dispatch]);

  // Helper functions
  const getCurrentQuestion = () => {
    // Use API data and transform to match component expectations
    const apiQuestion = questionData?.data?.question;
    if (!apiQuestion) return null;

    return {
      id: apiQuestion.id,
      text: apiQuestion.questionText, // Map questionText to text
      options: apiQuestion.options,
      competency: apiQuestion.competency,
      level: apiQuestion.level,
    };
  };

  const getTimeRemaining = () => {
    // Use API data only
    if (questionData?.data?.testProgress?.timeRemaining !== undefined) {
      return questionData.data.testProgress.timeRemaining;
    }
    return 0; // Default when no API data
  };

  const getProgress = () => {
    // Use API data only
    if (questionData?.data?.testProgress?.progressPercentage !== undefined) {
      return questionData.data.testProgress.progressPercentage;
    }
    return 0; // Default when no API data
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return {
    // Redux state (for backward compatibility)
    ...assessmentState,

    // API data
    questionData: questionData?.data || null,
    isLoadingQuestion,
    questionError,

    // Combined loading states
    isSubmittingAnswer,
    isProcessingQuestion,

    // Current question and progress from API (mapped to component expectations)
    currentQuestion: getCurrentQuestion(),
    currentQuestionIndex: questionData?.data?.testProgress?.currentIndex ?? 0,
    totalQuestions: questionData?.data?.testProgress?.totalQuestions ?? 0,
    testProgress: questionData?.data?.testProgress || null,
    navigation: questionData?.data?.navigation || null,

    // Computed values
    timeRemaining: getTimeRemaining(),
    progress: getProgress(),

    // Formatted helpers
    formattedTimeRemaining: formatTime(getTimeRemaining()),
    formattedTimeElapsed: formatTime(assessmentState.timeElapsed),

    // Certificate information
    certificateInfo,

    // Actions
    startAssessment,
    submitQuestionAnswer,
    completeAssessment: completeAssessment,
    finishAssessment: completeAssessment, // Alias for component compatibility
    updateAssessmentTimer,
    resetTest,
  };
};

export default useAssessment;
