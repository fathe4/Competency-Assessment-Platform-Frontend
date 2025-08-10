/**
 * Test_School Assessment Platform - Types Index
 * Re-exports all types for easy importing
 */

// Common types
export * from "./common";

// Auth types
export * from "./auth";

// Assessment types
export * from "./assessment";

// Store types - explicitly re-export to avoid IAuthState conflict
export type {
  RootState,
  IAssessmentState,
  IQuestionState,
  IUserState,
  IUiState,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  OTPPayload,
  PasswordResetPayload,
  PasswordChangePayload,
  StartAssessmentPayload,
  SubmitAnswerPayload,
  NavigateQuestionPayload,
  SkipQuestionPayload,
  CreateQuestionPayload,
  UpdateQuestionPayload,
  DeleteQuestionPayload,
  FilterQuestionsPayload,
  UpdateProfilePayload,
  ChangeRolePayload,
  GetUsersPayload,
  ShowModalPayload,
  ShowNotificationPayload,
  INotification,
  AsyncThunkConfig,
  AppDispatch,
  AppThunk,
  PersistConfig,
} from "./store";
