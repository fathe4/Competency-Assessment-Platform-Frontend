/**
 * Test_School Assessment Platform - Assessment Types
 * Types related to tests, questions, assessments, and certificates
 */

import type { CompetencyLevel, TestStep, TestStatus } from "./common";

// ============================================================================
// COMPETENCY & QUESTION TYPES
// ============================================================================

export interface ICompetency {
  _id?: string;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IQuestion {
  _id?: string;
  competencyId: string;
  level: CompetencyLevel;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  isActive?: boolean;
  difficulty?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Frontend-specific question types
export interface IQuestionDisplay {
  id: string;
  competency: string;
  level: CompetencyLevel;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  difficulty?: number;
}

// ============================================================================
// ASSESSMENT & TEST TYPES
// ============================================================================

export interface ITest {
  _id?: string;
  userId: string;
  step: TestStep;
  levelsTested: CompetencyLevel[];
  score?: number;
  totalQuestions?: number;
  correctAnswers?: number;
  status: TestStatus;

  // ONE QUESTION AT A TIME - Sequential Question Management
  questionOrder?: string[]; // Array of question IDs in test sequence
  currentQuestionIndex?: number; // Current position in questionOrder (0-based)
  currentQuestionId?: string; // Current active question ID
  questionsAnswered?: number; // Count of answered questions

  // Assessment session tracking
  startedAt?: Date;
  completedAt?: Date;
  timeLimit?: number;
  timeSpent?: number; // total seconds spent on test
  lastQuestionStartTime?: Date; // when current question was presented

  // Results and progression
  levelAchieved?: CompetencyLevel;
  canProceedToNextStep?: boolean;
  blocksRetake?: boolean;
  certificateId?: string;
  responses?: string[];
  createdAt?: Date;
  updatedAt?: Date;

  // Virtual properties (computed)
  progressPercentage?: number;
  isLastQuestion?: boolean;
  hasNextQuestion?: boolean;
}

export interface ITestResponse {
  _id?: string;
  testId: string;
  questionId: string;

  questionOrder: number; // Position of this question in test sequence (0-based)

  selectedOptionIndex?: number;
  isCorrect?: boolean;

  // Timing tracking for one-question-at-a-time
  timeSpent?: number; // seconds spent on this specific question
  questionStartTime?: Date; // when this question was first presented
  answeredAt?: Date; // when this question was answered

  // Navigation tracking
  isSkipped?: boolean; // if user skipped this question

  createdAt?: Date;
  updatedAt?: Date;
}

// ============================================================================
// CERTIFICATE TYPES
// ============================================================================

export interface ICompetencyAchieved {
  competencyId: string;
  level: CompetencyLevel;
  score?: number;
}

export interface ICertificate {
  _id?: string;
  userId: string;
  levelAchieved: CompetencyLevel;
  competenciesAchieved: ICompetencyAchieved[];
  testId: string;
  issuedDate: Date;
  certificateUrl?: string;
}

// ============================================================================
// SERVICE & API TYPES
// ============================================================================

// Question Service Types
export interface CreateQuestionData {
  competencyId: string;
  level: CompetencyLevel;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  difficulty?: number;
}

export interface UpdateQuestionData {
  questionText?: string;
  options?: string[];
  correctOptionIndex?: number;
  difficulty?: number;
  isActive?: boolean;
}

export interface QuestionFilters {
  competencyId?: string;
  level?: string | string[];
  step?: TestStep;
  isActive?: boolean;
  page?: number;
  limit?: number;
}

export interface StepStatus {
  step: TestStep;
  levels: CompetencyLevel[];
  questionsRequired: number;
  questionsAvailable: number;
  isReady: boolean;
  completion: number;
}

export interface AssessmentCompletionStatus {
  totalCompetencies: number;
  requiredQuestionsTotal: number;
  totalQuestionsAvailable: number;
  overallCompletion: number;
  stepStatus: StepStatus[];
  questionsByLevel: Record<string, number>;
}

// Assessment Service Types - ONE QUESTION AT A TIME
export interface StartAssessmentData {
  userId: string;
  step: TestStep;
}

export interface SubmitAnswerData {
  testId: string;
  questionId: string;
  selectedOptionIndex: number;
  timeSpent: number;
}

export interface CompleteAssessmentData {
  testId: string;
  totalTimeSpent: number;
}

// One Question at a Time Navigation
export interface GetCurrentQuestionData {
  testId: string;
}

export interface NavigateQuestionData {
  testId: string;
  direction: "next" | "previous";
}

export interface SkipQuestionData {
  testId: string;
  questionId: string;
}

export interface CurrentQuestionResponse {
  question: {
    id: string;
    competency: string;
    level: CompetencyLevel;
    questionText: string;
    options: string[];
  };
  testProgress: {
    currentIndex: number;
    totalQuestions: number;
    questionsAnswered: number;
    progressPercentage: number;
    timeRemaining: number;
    isLastQuestion: boolean;
    hasNextQuestion: boolean;
  };
  navigation: {
    canGoNext: boolean;
    canGoPrevious: boolean;
    canSkip: boolean;
    canSubmitTest: boolean;
  };
}

export interface ActiveAssessmentInfo {
  hasActiveTest: boolean;
  test: {
    id: string;
    step: TestStep;
    totalQuestions: number;
    questionsAnswered: number;
    currentQuestionIndex: number;
    timeLimit: number;
    timeElapsed: number;
    timeRemaining: number;
    progressPercentage: number;
    startedAt: Date;
  } | null;
  autoCompleted?: boolean;
}

// ============================================================================
// FORM TYPES
// ============================================================================

export interface QuestionForm {
  competencyId: string;
  level: CompetencyLevel;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  difficulty?: number;
}
