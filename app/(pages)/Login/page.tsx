"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import { validateLoginForm } from "@/app/lib/validation";
import FormField from "@/app/components/FormField";
import LoadingSpinner from "@/app/components/LoadingSpinner";

export default function LoginPage() {
  const { login, isLoading, error } = useAuth();
  const router = useRouter();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors({});

    // Prevent multiple submissions
    if (isLoading) {
      return;
    }

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Client-side validation
    const validation = validateLoginForm(email, password);
    if (!validation.isValid) {
      const errors: Record<string, string> = {};
      validation.errors.forEach((error) => {
        errors[error.field] = error.message;
      });
      setFormErrors(errors);
      setTouched({ email: true, password: true });
      return;
    }

    const result = await login({ email, password });
    if (result.success) {
      if (result.isAdmin) {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-200 p-8 mx-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-1 text-center">
          Sign in
        </h1>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Welcome back. Please enter your details.
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

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-4"
          noValidate
        >
          <FormField
            id="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            name="email"
            required
            autoComplete="email"
            error={touched.email ? formErrors.email : undefined}
            onBlur={() => handleBlur("email")}
            inputMode="email"
          />

          <FormField
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            name="password"
            required
            autoComplete="current-password"
            error={touched.password ? formErrors.password : undefined}
            onBlur={() => handleBlur("password")}
            inputMode="text"
          />

          <div className="flex items-center justify-between">
            <label className="inline-flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                name="rememberMe"
                defaultChecked={true}
              />
              Remember me
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 touch-manipulation"
            aria-describedby={isLoading ? "loading-description" : undefined}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <LoadingSpinner size="sm" color="white" />
                <span>Signing in...</span>
              </div>
            ) : (
              "Sign in"
            )}
          </button>
          {isLoading && (
            <div id="loading-description" className="sr-only">
              Please wait while we sign you in
            </div>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/Register"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
