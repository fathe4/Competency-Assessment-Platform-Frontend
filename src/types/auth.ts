/**
 * Test_School Assessment Platform - Authentication Types
 * Types related to authentication, authorization, and user management
 */

import type {
  UserRole,
  AssessmentStatus,
  CompetencyLevel,
  TestStep,
} from "./common";

// ============================================================================
// USER TYPES
// ============================================================================

export interface IUser {
  _id: string;
  email: string;
  fullName: string;
  role: "admin" | "student" | "supervisor";
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IAuthState {
  user: IUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  email: string;
  password: string;
  fullName: string;
}

export interface IAuthResponse {
  success: boolean;
  data: {
    user: IUser;
    accessToken: string;
    refreshToken: string;
  };
  message: string;
}

// OTP verification types
export interface IVerifyOTPRequest {
  email: string;
  otpCode: string;
}

export interface IVerifyOTPResponse {
  success: boolean;
  message: string;
  data?: {
    user: IUser;
    accessToken: string;
    refreshToken: string;
  };
}

export interface IResendOTPRequest {
  email: string;
}

export interface IResendOTPResponse {
  success: boolean;
  message: string;
}

// Forgot Password types
export interface IForgotPasswordRequest {
  email: string;
}

export interface IForgotPasswordResponse {
  success: boolean;
  message: string;
}

// Reset Password types
export interface IResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface IResetPasswordResponse {
  success: boolean;
  message: string;
}

// Frontend-specific user types
export interface IUserProfile {
  fullName: string;
  email: string;
  role: UserRole;
  emailVerified: boolean;
  assessmentStatus: AssessmentStatus;
  highestLevelAchieved?: CompetencyLevel;
  currentStep?: TestStep;
}

// ============================================================================
// FORM TYPES
// ============================================================================

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
}

export interface OTPForm {
  otp: string;
}

export interface ProfileUpdateForm {
  fullName: string;
}

export interface PasswordChangeForm {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ForgotPasswordForm {
  email: string;
}

export interface ResetPasswordForm {
  token: string;
  newPassword: string;
  confirmNewPassword: string;
}

// ============================================================================
// NAVIGATION TYPES
// ============================================================================

export interface INavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  roles: UserRole[];
  children?: INavigationItem[];
}
