import { useAppSelector } from "../store/hooks";
import {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useVerifyOTPMutation,
  useResendOTPMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} from "../store/authApi";
import {
  setCredentials,
  clearCredentials,
  clearError,
  updateUserVerification,
} from "../store/slices/authSlice";
import type {
  ILoginRequest,
  IRegisterRequest,
  IVerifyOTPRequest,
  IResendOTPRequest,
  IForgotPasswordRequest,
  IResetPasswordRequest,
} from "../types/auth";
import { useAppDispatch } from "../store/hooks";
import { showApiError, showSuccessMessage } from "../utils/toast";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  // API mutations
  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();
  const [registerMutation, { isLoading: isRegisterLoading }] =
    useRegisterMutation();
  const [logoutMutation, { isLoading: isLogoutLoading }] = useLogoutMutation();
  const [verifyOTPMutation, { isLoading: isVerifyingOTP }] =
    useVerifyOTPMutation();
  const [resendOTPMutation, { isLoading: isResendingOTP }] =
    useResendOTPMutation();
  const [forgotPasswordMutation, { isLoading: isForgotPasswordLoading }] =
    useForgotPasswordMutation();
  const [resetPasswordMutation, { isLoading: isResetPasswordLoading }] =
    useResetPasswordMutation();

  // Login function
  const login = async (credentials: ILoginRequest) => {
    try {
      const result = await loginMutation(credentials).unwrap();
      if (result.success) {
        // Update local state with user data and tokens
        dispatch(
          setCredentials({
            user: result.data.user,
            accessToken: result.data.accessToken,
            refreshToken: result.data.refreshToken,
          })
        );

        // Show success message
        showSuccessMessage("login");
      }
      return result;
    } catch (error) {
      console.error("Login failed:", error);
      // Show error toast
      showApiError(error);
      throw error;
    }
  };

  // Register function
  const register = async (userData: IRegisterRequest) => {
    try {
      const result = await registerMutation(userData).unwrap();
      if (result.success) {
        // Update local state with user data and tokens
        dispatch(
          setCredentials({
            user: result.data.user,
            accessToken: result.data.accessToken,
            refreshToken: result.data.refreshToken,
          })
        );

        // Show success message
        showSuccessMessage("register");
      }
      return result;
    } catch (error) {
      console.error("Registration failed:", error);
      // Show error toast
      showApiError(error);
      throw error;
    }
  };

  // Logout function
  const logoutUser = async () => {
    try {
      await logoutMutation().unwrap();
      // Clear local state
      dispatch(clearCredentials());
      // Show success message
      showSuccessMessage("logout");
    } catch (error) {
      console.error("Logout failed:", error);
      // Show error toast
      showApiError(error);
      // Still clear local state even if API call fails
      dispatch(clearCredentials());
    }
  };

  // Verify OTP function
  const verifyOTP = async (otpData: IVerifyOTPRequest) => {
    try {
      const result = await verifyOTPMutation(otpData).unwrap();
      if (result.success && result.data) {
        // Update local state with user data and tokens
        dispatch(
          setCredentials({
            user: result.data.user,
            accessToken: result.data.accessToken,
            refreshToken: result.data.refreshToken,
          })
        );
      } else if (result.success) {
        // If verification successful but no new tokens, just update verification status
        dispatch(updateUserVerification(true));
      }
      return result;
    } catch (error) {
      console.error("OTP verification failed:", error);
      showApiError(error);
      throw error;
    }
  };

  // Resend OTP function
  const resendOTP = async (emailData: IResendOTPRequest) => {
    try {
      const result = await resendOTPMutation(emailData).unwrap();
      return result;
    } catch (error) {
      console.error("Resend OTP failed:", error);
      showApiError(error);
      throw error;
    }
  };

  // Forgot Password function
  const forgotPassword = async (emailData: IForgotPasswordRequest) => {
    try {
      const result = await forgotPasswordMutation(emailData).unwrap();
      if (result.success) {
        showSuccessMessage("forgotPassword");
      }
      return result;
    } catch (error) {
      console.error("Forgot password failed:", error);
      showApiError(error);
      throw error;
    }
  };

  // Reset Password function
  const resetPassword = async (resetData: IResetPasswordRequest) => {
    try {
      const result = await resetPasswordMutation(resetData).unwrap();
      if (result.success) {
        showSuccessMessage("resetPassword");
      }
      return result;
    } catch (error) {
      console.error("Reset password failed:", error);
      showApiError(error);
      throw error;
    }
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  return {
    // State from authSlice
    user: auth.user,
    accessToken: auth.accessToken,
    refreshToken: auth.refreshToken,
    isAuthenticated: auth.isAuthenticated && !!auth.accessToken,
    isLoading: auth.isLoading,
    error: auth.error,

    // Loading states from API calls
    isLoginLoading,
    isRegisterLoading,
    isLogoutLoading,
    isVerifyingOTP,
    isResendingOTP,
    isForgotPasswordLoading,
    isResetPasswordLoading,

    // Actions
    login,
    register,
    logout: logoutUser,
    verifyOTP,
    resendOTP,
    forgotPassword,
    resetPassword,
    clearAuthError,
  };
};
