import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import EmailVerificationModal from "./EmailVerificationModal";
import type { IRegisterRequest } from "../../types/auth";
import {
  Layout,
  Card,
  Header,
  Input,
  Button,
  Footer,
  Alert,
  UserPlusIcon,
  EmailIcon,
  PasswordIcon,
  UserIcon,
  CheckCircleIcon,
} from "../shared";

interface LocalFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<LocalFormData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { register, isRegisterLoading } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear password error when user starts typing
    if (passwordError) {
      setPasswordError("");
    }
  };

  const validatePasswords = () => {
    if (formData.password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }
    if (formData.password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePasswords()) {
      return;
    }

    try {
      // Combine firstName and lastName into fullName for the API request
      const registerData: IRegisterRequest = {
        email: formData.email,
        password: formData.password,
        fullName:
          `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim(),
      };

      const result = await register(registerData);
      if (result.success) {
        // Show email verification modal after successful registration
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

  return (
    <>
      <Layout>
        <Card>
          <Header
            icon={<UserPlusIcon />}
            title="Join TestSchool"
            subtitle="Create your account to get started"
          />

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name fields */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                id="firstName"
                name="firstName"
                type="text"
                label="First Name"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("firstName")}
                onBlur={() => setFocusedField(null)}
                autoComplete="given-name"
                required
                icon={<UserIcon />}
                isFocused={focusedField === "firstName"}
                hasValue={!!formData.firstName}
              />

              <Input
                id="lastName"
                name="lastName"
                type="text"
                label="Last Name"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("lastName")}
                onBlur={() => setFocusedField(null)}
                autoComplete="family-name"
                required
                icon={<UserIcon />}
                isFocused={focusedField === "lastName"}
                hasValue={!!formData.lastName}
              />
            </div>

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
              placeholder="Create a password"
              value={formData.password}
              onChange={handleInputChange}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
              autoComplete="new-password"
              required
              icon={<PasswordIcon />}
              isFocused={focusedField === "password"}
              hasValue={!!formData.password}
            />

            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => setFocusedField("confirmPassword")}
              onBlur={() => setFocusedField(null)}
              autoComplete="new-password"
              required
              icon={<CheckCircleIcon />}
              isFocused={focusedField === "confirmPassword"}
              hasValue={!!confirmPassword}
            />

            {/* Password error */}
            {passwordError && <Alert message={passwordError} type="error" />}

            <Button
              isLoading={isRegisterLoading}
              loadingText="Creating account..."
            >
              Create account
            </Button>
          </form>

          <Footer
            text="Already have an account?"
            linkText="Sign in here"
            linkHref="/login"
          />
        </Card>
      </Layout>

      {/* Email Verification Modal */}
      <EmailVerificationModal
        isOpen={showEmailVerification}
        onClose={handleCloseEmailVerification}
        email={formData.email}
      />
    </>
  );
};

export default RegisterForm;
