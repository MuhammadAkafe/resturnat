"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
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

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState<RegisterCredentials>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleInputChange = (
    field: keyof RegisterCredentials,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors({});
    setIsLoading(true);
    setError("");
    setSuccess("");

    const credentials = formData;

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
      setFormErrors(errors);
      setTouched({
        username: true,
        email: true,
        password: true,
        confirmPassword: true,
        role: true,
      });
      setIsLoading(false);
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
        setError(data.message || "Registration failed. Please try again.");
      } else {
        setSuccess("Registration successful! You can now log in.");
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "",
        });
        setTimeout(() => {
          router.push("/Login");
        }, 500);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1 text-center">
          Create Account
        </h1>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Join us and start your healthy journey today.
        </p>

        {error && (
          <div
            className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
            role="alert"
            aria-live="polite"
          >
            {error}
          </div>
        )}

        {success && (
          <div
            className="mb-4 rounded border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700"
            role="status"
            aria-live="polite"
          >
            {success}
          </div>
        )}

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-4"
          noValidate
        >
          <FormField
            id="username"
            label="Username"
            type="text"
            placeholder="Enter your username"
            name="username"
            value={formData.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            required
            error={touched.username ? formErrors.username : undefined}
            onBlur={() => handleBlur("username")}
            minLength={3}
            maxLength={50}
          />

          <FormField
            id="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            name="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            required
            autoComplete="email"
            error={touched.email ? formErrors.email : undefined}
            onBlur={() => handleBlur("email")}
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
              value={formData.role}
              onChange={(e) => handleInputChange("role", e.target.value)}
              onBlur={() => handleBlur("role")}
              className={`w-full rounded-lg border px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                touched.role && formErrors.role
                  ? "border-red-300 focus:ring-red-500"
                  : "border-gray-300"
              }`}
              required
              aria-invalid={touched.role && formErrors.role ? "true" : "false"}
              aria-describedby={
                touched.role && formErrors.role ? "role-error" : undefined
              }
            >
              <option value="">Select a role</option>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
            {touched.role && formErrors.role && (
              <p
                id="role-error"
                className="text-sm text-red-600"
                role="alert"
                aria-live="polite"
              >
                {formErrors.role}
              </p>
            )}
          </div>

          <FormField
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            name="password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            required
            autoComplete="new-password"
            error={touched.password ? formErrors.password : undefined}
            onBlur={() => handleBlur("password")}
            minLength={6}
          />

          <FormField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) =>
              handleInputChange("confirmPassword", e.target.value)
            }
            required
            autoComplete="new-password"
            error={
              touched.confirmPassword ? formErrors.confirmPassword : undefined
            }
            onBlur={() => handleBlur("confirmPassword")}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            aria-describedby={isLoading ? "loading-description" : undefined}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <LoadingSpinner size="sm" color="white" />
                <span>Creating Account...</span>
              </div>
            ) : (
              "Create Account"
            )}
          </button>
          {isLoading && (
            <div id="loading-description" className="sr-only">
              Please wait while we create your account
            </div>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/Login"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
