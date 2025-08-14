export interface ValidationError {
  field: string;
  message: string;
}

export interface FormValidation {
  isValid: boolean;
  errors: ValidationError[];
}

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password strength requirements
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

export const validateEmail = (email: string): string | null => {
  if (!email.trim()) {
    return "Email is required";
  }
  if (!EMAIL_REGEX.test(email)) {
    return "Please enter a valid email address";
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) {
    return "Password is required";
  }
  if (password.length < PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`;
  }
  if (!PASSWORD_REGEX.test(password)) {
    return "Password must contain at least one uppercase letter, one lowercase letter, and one number";
  }
  return null;
};

export const validateUsername = (username: string): string | null => {
  if (!username.trim()) {
    return "Username is required";
  }
  if (username.length < 3) {
    return "Username must be at least 3 characters long";
  }
  if (username.length > 50) {
    return "Username must be less than 50 characters";
  }
  return null;
};

export const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
  if (!confirmPassword) {
    return "Please confirm your password";
  }
  if (password !== confirmPassword) {
    return "Passwords do not match";
  }
  return null;
};

export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value.trim()) {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateLoginForm = (email: string, password: string): FormValidation => {
  const errors: ValidationError[] = [];
  
  const emailError = validateEmail(email);
  if (emailError) {
    errors.push({ field: "email", message: emailError });
  }
  
//   const passwordError = validatePassword(password);
//   if (passwordError) {
//     errors.push({ field: "password", message: passwordError });
//   }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateRegisterForm = (
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
  role: string
): FormValidation => {
  const errors: ValidationError[] = [];
  
  const usernameError = validateUsername(username);
  if (usernameError) {
    errors.push({ field: "username", message: usernameError });
  }
  
  const emailError = validateEmail(email);
  if (emailError) {
    errors.push({ field: "email", message: emailError });
  }
  
  const passwordError = validatePassword(password);
  if (passwordError) {
    errors.push({ field: "password", message: passwordError });
  }
  
  const confirmPasswordError = validateConfirmPassword(password, confirmPassword);
  if (confirmPasswordError) {
    errors.push({ field: "confirmPassword", message: confirmPasswordError });
  }
  
  const roleError = validateRequired(role, "Role");
  if (roleError) {
    errors.push({ field: "role", message: roleError });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
