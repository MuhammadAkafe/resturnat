"use client";
import { Loader2 } from "lucide-react";

export default function PagesLoading({
  message = "Loading...",
}: {
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Loader2 className="w-10 h-10 animate-spin" />
      <h1 className="text-2xl font-bold text-black">{message}</h1>
    </div>
  );
}
