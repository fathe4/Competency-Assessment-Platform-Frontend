import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Simple assessment state - only what we need
export interface AssessmentState {
  // Current test info
  currentStep: 1 | 2 | 3 | null;
  testId: string | null;
  isActive: boolean;

  // Timer (still managed locally)
  timeElapsed: number;
  isTimerRunning: boolean;

  // Results (set from API)
  score: number;
  level: string | null;
  canProceedToNext: boolean;
  isCompleted: boolean;

  // Loading states
  isLoading: boolean;
  error: string | null;
}

const initialState: AssessmentState = {
  currentStep: null,
  testId: null,
  isActive: false,
  timeElapsed: 0,
  isTimerRunning: false,
  score: 0,
  level: null,
  canProceedToNext: false,
  isCompleted: false,
  isLoading: false,
  error: null,
};

const assessmentSlice = createSlice({
  name: "assessment",
  initialState,
  reducers: {
    // Start a test step
    startTest: (
      state,
      action: PayloadAction<{
        step: 1 | 2 | 3;
        testId: string;
      }>
    ) => {
      const { step, testId } = action.payload;
      state.currentStep = step;
      state.testId = testId;
      state.isActive = true;
      state.timeElapsed = 0;
      state.isTimerRunning = true;
      state.score = 0;
      state.isCompleted = false;
      state.canProceedToNext = false;
      state.error = null;
    },

    // Update timer
    updateTimer: (state, action: PayloadAction<number>) => {
      state.timeElapsed = action.payload;
    },

    // Pause/Resume timer
    pauseTimer: (state) => {
      state.isTimerRunning = false;
    },

    resumeTimer: (state) => {
      state.isTimerRunning = true;
    },

    // Complete test and set results from API
    completeTest: (
      state,
      action: PayloadAction<
        | {
            score: number;
            levelAchieved: string;
            canProceedToNextStep: boolean;
          }
        | undefined
      >
    ) => {
      state.isActive = false;
      state.isTimerRunning = false;
      state.isCompleted = true;

      // Use API data directly - backend handles all business logic
      if (action.payload) {
        const { score, levelAchieved, canProceedToNextStep } = action.payload;

        state.score = score;
        state.level = levelAchieved;
        state.canProceedToNext = canProceedToNextStep;
      } else {
        // Fallback values when no API data (error cases)
        state.score = 0;
        state.level = null;
        state.canProceedToNext = false;
      }
    },

    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Set error
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Reset state
    resetAssessment: () => {
      return initialState;
    },
  },
});

export const {
  startTest,
  updateTimer,
  pauseTimer,
  resumeTimer,
  completeTest,
  setLoading,
  setError,
  resetAssessment,
} = assessmentSlice.actions;

export default assessmentSlice.reducer;
