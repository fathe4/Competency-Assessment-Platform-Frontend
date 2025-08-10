import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { showApiError, showSuccessMessage } from "../../utils/toast";

interface EmailVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

const EmailVerificationModal: React.FC<EmailVerificationModalProps> = ({
  isOpen,
  onClose,
  email,
}) => {
  const [otpCode, setOtpCode] = useState("");
  const { verifyOTP, resendOTP, isVerifyingOTP, isResendingOTP } = useAuth();

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode.trim()) {
      showApiError({ data: "Please enter the OTP code" });
      return;
    }

    try {
      const result = await verifyOTP({ email, otpCode: otpCode.trim() });
      if (result.success) {
        showSuccessMessage("email-verified");
        onClose();
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
    }
  };

  const handleResendOTP = async () => {
    try {
      const result = await resendOTP({ email });
      if (result.success) {
        showSuccessMessage("otp-resent");
      }
    } catch (error) {
      console.error("Resend OTP failed:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Verify Your Email
          </h2>
          <p className="text-gray-600">
            We've sent a verification code to{" "}
            <span className="font-semibold text-indigo-600">{email}</span>
          </p>
        </div>

        <form onSubmit={handleVerifyOTP} className="space-y-4">
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter OTP Code
            </label>
            <input
              type="text"
              id="otp"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              placeholder="Enter 6-digit code"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              maxLength={6}
              required
            />
          </div>

          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={isVerifyingOTP || !otpCode.trim()}
              className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isVerifyingOTP ? "Verifying..." : "Verify Email"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={handleResendOTP}
            disabled={isResendingOTP}
            className="text-indigo-600 hover:text-indigo-700 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isResendingOTP ? "Sending..." : "Resend OTP"}
          </button>
        </div>

        <div className="mt-4 text-xs text-gray-500 text-center">
          <p>Didn't receive the code? Check your spam folder.</p>
          <p>You can request a new code in 60 seconds.</p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationModal;
