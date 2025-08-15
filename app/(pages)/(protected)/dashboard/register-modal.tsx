"use client";

import React, { useState, useRef } from "react";
import { X } from "lucide-react";
import { validateRegisterForm } from "@/app/lib/validation";
import FormField from "@/app/components/FormField";
import LoadingSpinner from "@/app/components/LoadingSpinner";

interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const [registerFormErrors, setRegisterFormErrors] = useState<
    Record<string, string>
  >({});
  const [registerTouched, setRegisterTouched] = useState<
    Record<string, boolean>
  >({});
  const [registerFormData, setRegisterFormData] = useState<RegisterCredentials>(
    {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    }
  );
  const registerFormRef = useRef<HTMLFormElement>(null);

  const handleRegisterBlur = (field: string) => {
    setRegisterTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleRegisterInputChange = (
    field: keyof RegisterCredentials,
    value: string
  ) => {
    setRegisterFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (registerFormErrors[field]) {
      setRegisterFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRegisterFormErrors({});
    setIsRegisterLoading(true);
    setRegisterError("");
    setRegisterSuccess("");

    const credentials = registerFormData;

    // Client-side validation
    const validation = validateRegisterForm(
      credentials.username,
      credentials.email,
      credentials.password,
      credentials.confirmPassword,
      credentials.role
    );

    if (!validation.isValid) {
      const errors: Record<string, string> = {};
      validation.errors.forEach((error) => {
        errors[error.field] = error.message;
      });
      setRegisterFormErrors(errors);
      setRegisterTouched({
        username: true,
        email: true,
        password: true,
        confirmPassword: true,
        role: true,
      });
      setIsRegisterLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: credentials.username,
          email: credentials.email,
          password: credentials.password,
          role: credentials.role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setRegisterError(
          data.message || "Registration failed. Please try again."
        );
      } else {
        setRegisterSuccess("User registered successfully!");
        setRegisterFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "",
        });
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (error) {
      setRegisterError("An error occurred. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setIsRegisterLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* Register Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Create New User
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {registerError && (
            <div
              className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
              role="alert"
              aria-live="polite"
            >
              {registerError}
            </div>
          )}

          {registerSuccess && (
            <div
              className="mb-4 rounded border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700"
              role="status"
              aria-live="polite"
            >
              {registerSuccess}
            </div>
          )}

          <form
            ref={registerFormRef}
            onSubmit={handleRegisterSubmit}
            className="space-y-4"
            noValidate
          >
            <FormField
              id="username"
              label="Username"
              type="text"
              placeholder="Enter username"
              name="username"
              value={registerFormData.username}
              onChange={(e) =>
                handleRegisterInputChange("username", e.target.value)
              }
              required
              error={
                registerTouched.username
                  ? registerFormErrors.username
                  : undefined
              }
              onBlur={() => handleRegisterBlur("username")}
              minLength={3}
              maxLength={50}
            />

            <FormField
              id="email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              name="email"
              value={registerFormData.email}
              onChange={(e) =>
                handleRegisterInputChange("email", e.target.value)
              }
              required
              autoComplete="email"
              error={
                registerTouched.email ? registerFormErrors.email : undefined
              }
              onBlur={() => handleRegisterBlur("email")}
            />

            <div className="space-y-1">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                value={registerFormData.role}
                onChange={(e) =>
                  handleRegisterInputChange("role", e.target.value)
                }
                onBlur={() => handleRegisterBlur("role")}
                className={`w-full rounded-lg border px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  registerTouched.role && registerFormErrors.role
                    ? "border-red-300 focus:ring-red-500"
                    : "border-gray-300"
                }`}
                required
                aria-invalid={
                  registerTouched.role && registerFormErrors.role
                    ? "true"
                    : "false"
                }
                aria-describedby={
                  registerTouched.role && registerFormErrors.role
                    ? "role-error"
                    : undefined
                }
              >
                <option value="">Select a role</option>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
              {registerTouched.role && registerFormErrors.role && (
                <p
                  id="role-error"
                  className="text-sm text-red-600"
                  role="alert"
                  aria-live="polite"
                >
                  {registerFormErrors.role}
                </p>
              )}
            </div>

            <FormField
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              name="password"
              value={registerFormData.password}
              onChange={(e) =>
                handleRegisterInputChange("password", e.target.value)
              }
              required
              autoComplete="new-password"
              error={
                registerTouched.password
                  ? registerFormErrors.password
                  : undefined
              }
              onBlur={() => handleRegisterBlur("password")}
              minLength={6}
            />

            <FormField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              name="confirmPassword"
              value={registerFormData.confirmPassword}
              onChange={(e) =>
                handleRegisterInputChange("confirmPassword", e.target.value)
              }
              required
              autoComplete="new-password"
              error={
                registerTouched.confirmPassword
                  ? registerFormErrors.confirmPassword
                  : undefined
              }
              onBlur={() => handleRegisterBlur("confirmPassword")}
            />

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isRegisterLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-describedby={
                  isRegisterLoading ? "loading-description" : undefined
                }
              >
                {isRegisterLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <LoadingSpinner size="sm" color="white" />
                    <span>Creating User...</span>
                  </div>
                ) : (
                  "Create User"
                )}
              </button>
              {isRegisterLoading && (
                <div id="loading-description" className="sr-only">
                  Please wait while we create the user account
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterModal;
