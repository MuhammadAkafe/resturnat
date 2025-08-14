"use client";

import { useAuth } from "@/app/hooks/useAuth";

interface LogoutButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function LogoutButton({
  className = "text-red-600 hover:text-red-700 font-medium",
  children = "Logout",
}: LogoutButtonProps) {
  const { logout, isLoading } = useAuth();

  const handleLogout = async () => 
    {
    await logout();
  };


  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className={`${className} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {isLoading ? "Logging out..." : children}
    </button>
  );
}
