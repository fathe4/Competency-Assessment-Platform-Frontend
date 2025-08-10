/**
 * Test_School Assessment Platform - Redux Store Types
 * Type definitions for Redux store structure and actions
 */

import type { IUser } from "./auth";
import type {
  IQuestionDisplay,
  ITest,
  ITestResponse,
  ActiveAssessmentInfo,
  QuestionFilters,
  AssessmentCompletionStatus,
} from "./assessment";

// ============================================================================
// ROOT STATE INTERFACE
// ============================================================================

export interface RootState {
  auth: IAuthState;
  assessment: IAssessmentState;
  questions: IQuestionState;
  users: IUserState;
  ui: IUiState;
}

// ============================================================================
// AUTH SLICE TYPES
// ============================================================================

export interface IAuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isEmailVerified: boolean;
}

// Auth Actions
export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: IUser;
  token: string;
  message: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  fullName: string;
}

export interface OTPPayload {
  email: string;
  otp: string;
}

export interface PasswordResetPayload {
  email: string;
}

export interface PasswordChangePayload {
  currentPassword: string;
  newPassword: string;
}

// ============================================================================
// ASSESSMENT SLICE TYPES
// ============================================================================

export interface IAssessmentState {
  currentTest: ITest | null;
  currentQuestion: IQuestionDisplay | null;
  questions: IQuestionDisplay[];
  answers: Record<string, ITestResponse>;
  timeRemaining: number;
  isLoading: boolean;
  error: string | null;
  activeAssessment: ActiveAssessmentInfo | null;
}

// Assessment Actions
export interface StartAssessmentPayload {
  step: number;
}

export interface SubmitAnswerPayload {
  questionId: string;
  selectedOptionIndex: number;
  timeSpent: number;
}

export interface NavigateQuestionPayload {
  direction: "next" | "previous";
}

export interface SkipQuestionPayload {
  questionId: string;
}

// ============================================================================
// QUESTION SLICE TYPES
// ============================================================================

export interface IQuestionState {
  questions: IQuestionDisplay[];
  filters: QuestionFilters;
  completionStatus: AssessmentCompletionStatus | null;
  isLoading: boolean;
  error: string | null;
}

// Question Actions
export interface CreateQuestionPayload {
  competencyId: string;
  level: string;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  difficulty?: number;
}

export interface UpdateQuestionPayload {
  id: string;
  updates: Partial<CreateQuestionPayload>;
}

export interface DeleteQuestionPayload {
  id: string;
}

export interface FilterQuestionsPayload {
  filters: Partial<QuestionFilters>;
}

// ============================================================================
// USER SLICE TYPES
// ============================================================================

export interface IUserState {
  users: IUser[];
  currentUser: IUser | null;
  isLoading: boolean;
  error: string | null;
}

// User Actions
export interface UpdateProfilePayload {
  fullName: string;
}

export interface ChangeRolePayload {
  userId: string;
  newRole: string;
}

export interface GetUsersPayload {
  filters?: {
    role?: string;
    search?: string;
    page?: number;
    limit?: number;
  };
}

// ============================================================================
// UI SLICE TYPES
// ============================================================================

export interface IUiState {
  isLoading: boolean;
  error: string | null;
  success: string | null;
  modal: {
    isOpen: boolean;
    type: "login" | "register" | "otp" | "confirm" | "delete" | null;
    data?: Record<string, unknown>;
  };
  sidebar: {
    isOpen: boolean;
    activeTab: string;
  };
  notifications: INotification[];
}

// UI Actions
export interface ShowModalPayload {
  type: IUiState["modal"]["type"];
  data?: Record<string, unknown>;
}

export interface ShowNotificationPayload {
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration?: number;
}

export interface INotification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration: number;
  createdAt: Date;
}

// ============================================================================
// ASYNC THUNK TYPES
// ============================================================================

export interface AsyncThunkConfig {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
}

// ============================================================================
// STORE UTILITY TYPES
// ============================================================================

export type AppDispatch = import("@reduxjs/toolkit").ThunkDispatch<
  RootState,
  unknown,
  import("@reduxjs/toolkit").AnyAction
>;

export type AppThunk<ReturnType = void> =
  import("@reduxjs/toolkit").ThunkAction<
    ReturnType,
    RootState,
    unknown,
    import("@reduxjs/toolkit").AnyAction
  >;

// ============================================================================
// PERSIST CONFIG TYPES
// ============================================================================

export interface PersistConfig {
  key: string;
  storage: Storage;
  whitelist: (keyof RootState)[];
  blacklist?: (keyof RootState)[];
}
