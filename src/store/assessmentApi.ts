import { baseApi } from "./baseApi";
import { CONSTANTS } from "./constants";
import type { ITest, CurrentQuestionResponse } from "../types/assessment";
import type { ApiResponse, TestStep } from "../types/common";

// Assessment API Request/Response Types
interface EligibilityResponse {
  eligible: boolean;
  step: TestStep;
  currentLevel: string | null;
}

interface StartAssessmentResponse {
  testId: string;
  currentQuestionIndex: number;
  totalQuestions: number;
}

interface SubmitAnswerResponse {
  isCorrect: boolean;
  currentQuestionIndex: number;
  isLastQuestion: boolean;
  autoAdvanced: boolean;
}

interface SkipQuestionResponse {
  currentQuestionIndex: number;
  isLastQuestion: boolean;
  autoAdvanced: boolean;
}

interface NavigateResponse {
  currentQuestionIndex: number;
  direction: "next" | "previous";
}

interface CompleteAssessmentResponse {
  test: {
    id: string;
    step: TestStep;
    score: number;
    levelAchieved: string; // Required since backend now returns this
    canProceedToNextStep: boolean;
    blocksRetake: boolean;
  };
  certificate: {
    id: string;
    levelAchieved: string;
  } | null;
}

interface AssessmentHistoryResponse {
  tests: Array<{
    id: string;
    step: TestStep;
    score: number;
    levelAchieved: string;
    status: string;
    startedAt: string;
    completedAt: string;
  }>;
}

export const assessmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Check if user is eligible to take a specific assessment step
    checkEligibility: builder.query<ApiResponse<EligibilityResponse>, TestStep>(
      {
        query: (step) => ({
          url: `/assessments/eligibility/${step}`,
          method: "GET",
        }),
        providesTags: (_result, _error, step) => [
          { type: CONSTANTS.ASSESSMENT.TEST, id: `eligibility-${step}` },
        ],
      }
    ),

    // Start a new assessment
    startAssessment: builder.mutation<
      ApiResponse<StartAssessmentResponse>,
      { step: TestStep }
    >({
      query: ({ step }) => ({
        url: "/assessments/start",
        method: "POST",
        data: { step },
      }),
      invalidatesTags: [CONSTANTS.ASSESSMENT.TEST, CONSTANTS.ASSESSMENT.RESULT],
    }),

    // Get current question with progress and navigation info
    getCurrentQuestion: builder.query<
      ApiResponse<CurrentQuestionResponse>,
      string
    >({
      query: (testId) => ({
        url: `/assessments/${testId}/current-question`,
        method: "GET",
      }),
      providesTags: (_result, _error, testId) => [
        { type: CONSTANTS.ASSESSMENT.QUESTION, id: testId },
      ],
    }),

    // Submit answer for current question (auto-advances to next)
    submitAnswer: builder.mutation<
      ApiResponse<SubmitAnswerResponse>,
      {
        testId: string;
        questionId: string;
        selectedOptionIndex: number;
        timeSpent: number;
      }
    >({
      query: ({ testId, questionId, selectedOptionIndex, timeSpent }) => ({
        url: `/assessments/${testId}/submit-answer`,
        method: "POST",
        data: {
          questionId,
          selectedOptionIndex,
          timeSpent,
        },
      }),
      invalidatesTags: (_result, _error, { testId }) => [
        { type: CONSTANTS.ASSESSMENT.QUESTION, id: testId },
        { type: CONSTANTS.ASSESSMENT.TEST, id: testId },
      ],
    }),

    // Skip current question (auto-advances to next)
    skipQuestion: builder.mutation<ApiResponse<SkipQuestionResponse>, string>({
      query: (testId) => ({
        url: `/assessments/${testId}/skip-question`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, testId) => [
        { type: CONSTANTS.ASSESSMENT.QUESTION, id: testId },
        { type: CONSTANTS.ASSESSMENT.TEST, id: testId },
      ],
    }),

    // Navigate between questions manually
    navigateQuestion: builder.mutation<
      ApiResponse<NavigateResponse>,
      {
        testId: string;
        direction: "next" | "previous";
      }
    >({
      query: ({ testId, direction }) => ({
        url: `/assessments/${testId}/navigate`,
        method: "POST",
        data: { direction },
      }),
      invalidatesTags: (_result, _error, { testId }) => [
        { type: CONSTANTS.ASSESSMENT.QUESTION, id: testId },
      ],
    }),

    // Complete assessment and get final results
    completeAssessment: builder.mutation<
      ApiResponse<CompleteAssessmentResponse>,
      {
        testId: string;
        totalTimeSpent: number;
      }
    >({
      query: ({ testId, totalTimeSpent }) => ({
        url: `/assessments/${testId}/complete`,
        method: "POST",
        data: { totalTimeSpent },
      }),
      invalidatesTags: [CONSTANTS.ASSESSMENT.TEST, CONSTANTS.ASSESSMENT.RESULT],
    }),

    // Get user's assessment history
    getAssessmentHistory: builder.query<
      ApiResponse<AssessmentHistoryResponse>,
      void
    >({
      query: () => ({
        url: "/assessments/history",
        method: "GET",
      }),
      providesTags: [CONSTANTS.ASSESSMENT.RESULT],
    }),

    // Get active assessment info (for resuming tests)
    getActiveAssessment: builder.query<ApiResponse<ITest | null>, void>({
      query: () => ({
        url: "/assessments/active",
        method: "GET",
      }),
      providesTags: [CONSTANTS.ASSESSMENT.TEST],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCheckEligibilityQuery,
  useLazyCheckEligibilityQuery,
  useStartAssessmentMutation,
  useGetCurrentQuestionQuery,
  useLazyGetCurrentQuestionQuery,
  useSubmitAnswerMutation,
  useSkipQuestionMutation,
  useNavigateQuestionMutation,
  useCompleteAssessmentMutation,
  useGetAssessmentHistoryQuery,
  useLazyGetAssessmentHistoryQuery,
  useGetActiveAssessmentQuery,
  useLazyGetActiveAssessmentQuery,
} = assessmentApi;
