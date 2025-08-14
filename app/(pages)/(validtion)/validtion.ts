export const validation = (email: string, password: string) => {
    if (!email || !password) {
      return { error: "Please fill in all fields" };
    }
  
    if (password.length < 6) {
      return { error: "Password must be at least 6 characters" };
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { error: "Please enter a valid email address" };
    }
  
    return { success: "Validation successful!" };
  }