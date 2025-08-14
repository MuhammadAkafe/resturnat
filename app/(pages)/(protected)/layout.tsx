"use client";

import PagesLoading from "../loading";
import { useVerify } from "@/app/hooks/useVerfify";

export default function ProtectedRoutes({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdmin, isLoading } = useVerify();


  // Show loading while checking authentication
  if (isLoading) {
    return <PagesLoading />;
  }

  // If not admin, don't render anything (will redirect)
  if (!isAdmin) {
    return <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">You are not authorized to access this page</h1>
    </div>
  }

  // If admin, render the protected content
  return <>{children}</>;
}
