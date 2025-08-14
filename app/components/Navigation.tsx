"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

function NavLink({ href, children, className = "" }: NavLinkProps) {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const isActive = pathname === href;

  const handleClick = () => {
    if (!isActive) {
      setIsNavigating(true);
      // Reset after a short delay to show loading state
      setTimeout(() => setIsNavigating(false), 100);
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`transition-colors duration-200 font-medium focus:outline-none focus:ring-0 border-none ${
        isActive ? "text-green-600" : "text-gray-700 hover:text-green-600"
      } ${isNavigating ? "opacity-75" : ""} ${className}`}
      prefetch
    >
      {children}
    </Link>
  );
}

export default function Navigation() {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      <NavLink href="/">Menu</NavLink>
      <NavLink href="/about">About Us</NavLink>
      <NavLink href="/contact">Contact Us</NavLink>
    </nav>
  );
}
