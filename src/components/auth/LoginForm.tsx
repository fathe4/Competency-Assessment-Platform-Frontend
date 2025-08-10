import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import type { ILoginRequest } from "../../types";
import {
  Button,
  Card,
  EmailIcon,
  Footer,
  Header,
  Input,
  Layout,
  LockIcon,
  PasswordIcon,
} from "../shared";
import EmailVerificationModal from "./EmailVerificationModal";
import ForgotPasswordModal from "./ForgotPasswordModal";

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<ILoginRequest>({
    email: "",
    password: "",
  });
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { login, isLoginLoading } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await login(formData);

      if (!result.data.user.isVerified) {
        // Show email verification modal if user is not verified
        setShowEmailVerification(true);
      }
    } catch {
      // Error is already handled by the useAuth hook with toast
      // No need to do anything here
    }
  };

  const handleCloseEmailVerification = () => {
    setShowEmailVerification(false);
  };

  const handleCloseForgotPassword = () => {
    setShowForgotPassword(false);
  };

  return (
    <>
      <Layout>
        <Card>
          <Header
            icon={<LockIcon />}
            title="Welcome back"
            subtitle="Sign in to your TestSchool account"
          />

          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              id="email"
              name="email"
              type="email"
              label="Email address"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              autoComplete="email"
              required
              icon={<EmailIcon />}
              isFocused={focusedField === "email"}
              hasValue={!!formData.email}
            />

            <Input
              id="password"
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
              autoComplete="current-password"
              required
              icon={<PasswordIcon />}
              isFocused={focusedField === "password"}
              hasValue={!!formData.password}
            />

            {/* Remember me and forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors duration-200"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700 font-medium"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-200 focus:outline-none focus:underline"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            <Button isLoading={isLoginLoading} loadingText="Signing in...">
              Sign in
            </Button>
          </form>

          <Footer
            text="Don't have an account?"
            linkText="Create one now"
            linkHref="/register"
          />
        </Card>
      </Layout>

      {/* Email Verification Modal */}
      <EmailVerificationModal
        isOpen={showEmailVerification}
        onClose={handleCloseEmailVerification}
        email={formData.email}
      />

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={handleCloseForgotPassword}
      />
    </>
  );
};

export default LoginForm;
