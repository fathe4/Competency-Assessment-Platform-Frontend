import { toast, type ToastOptions } from "react-toastify";

// Default toast options
const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

// Toast utility functions
export const toastUtils = {
  // Success toast
  success: (message: string, options?: ToastOptions) => {
    toast.success(message, { ...defaultOptions, ...options });
  },

  // Error toast
  error: (message: string, options?: ToastOptions) => {
    toast.error(message, { ...defaultOptions, ...options });
  },

  // Warning toast
  warning: (message: string, options?: ToastOptions) => {
    toast.warning(message, { ...defaultOptions, ...options });
  },

  // Info toast
  info: (message: string, options?: ToastOptions) => {
    toast.info(message, { ...defaultOptions, ...options });
  },

  // Custom toast
  custom: (message: string, options?: ToastOptions) => {
    toast(message, { ...defaultOptions, ...options });
  },

  // Dismiss all toasts
  dismiss: () => {
    toast.dismiss();
  },
};

// Define error type interface
interface ApiError {
  data?:
    | {
        message?: string;
        errors?: Record<string, string>;
      }
    | string;
  message?: string;
  status?: number;
}

// Helper function to extract error message from API response
export const getErrorMessage = (error: unknown): string => {
  const apiError = error as ApiError;

  // Check for RTK Query error format
  if (apiError?.data) {
    // If it's a structured API response
    if (typeof apiError.data === "object" && apiError.data.message) {
      return apiError.data.message;
    }

    // If it's a validation error with field-specific errors
    if (typeof apiError.data === "object" && apiError.data.errors) {
      const errors = apiError.data.errors;
      if (typeof errors === "object") {
        // Return the first error message
        const firstError = Object.values(errors)[0];
        return typeof firstError === "string"
          ? firstError
          : "Validation error occurred";
      }
    }

    // If it's a string message
    if (typeof apiError.data === "string") {
      return apiError.data;
    }
  }

  // Check for error message directly
  if (apiError?.message) {
    return apiError.message;
  }

  // Check for status-based messages
  if (apiError?.status) {
    switch (apiError.status) {
      case 400:
        return "Bad request. Please check your input.";
      case 401:
        return "Unauthorized. Please login again.";
      case 403:
        return "Access denied. You don't have permission to perform this action.";
      case 404:
        return "Resource not found.";
      case 409:
        return "Conflict. The resource already exists.";
      case 422:
        return "Validation error. Please check your input.";
      case 500:
        return "Internal server error. Please try again later.";
      case 503:
        return "Service unavailable. Please try again later.";
      default:
        return `An error occurred (${apiError.status}). Please try again.`;
    }
  }

  // Fallback message
  return "An unexpected error occurred. Please try again.";
};

// Function to show API error toast
export const showApiError = (error: unknown) => {
  const message = getErrorMessage(error);
  toastUtils.error(message);
};

// Function to show success message for common actions
export const showSuccessMessage = (action: string) => {
  const messages: Record<string, string> = {
    login: "Successfully logged in!",
    register: "Account created successfully!",
    logout: "Successfully logged out!",
    update: "Successfully updated!",
    delete: "Successfully deleted!",
    create: "Successfully created!",
    save: "Successfully saved!",
    "email-verified": "Email verified successfully!",
    "otp-resent": "OTP code resent successfully!",
    "forgot-password": "Password reset link sent to your email!",
    "reset-password":
      "Password reset successfully! You can now login with your new password.",
    forgotPassword: "Password reset link sent to your email!",
    resetPassword:
      "Password reset successfully! You can now login with your new password.",
  };

  const message = messages[action] || `${action} completed successfully!`;
  toastUtils.success(message);
};
