"use client";

import Link from "next/link";
import {
  MapPin,
  Phone,
  Menu,
  QrCode,
  LogInIcon,
  LogOutIcon,
  LayoutDashboard,
} from "lucide-react";
import Navigation from "./Navigation";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();

  // Remove debug logging for production
  // useEffect(() => {
  //   console.log("Header: Authentication state changed to:", isAuthenticated);
  // }, [isAuthenticated]);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Restaurant Name */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2" prefetch>
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">DA</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                Diet Art Restaurant
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Navigation />

            {/* Contact Info Icons */}
            <div className="flex items-center space-x-4">
              <a
                href="tel:+1 (555) 123-4567"
                className="text-gray-600 hover:text-green-600 transition-colors duration-200 p-2 rounded-lg focus:outline-none focus:ring-0 border-none"
                title="Call us"
                aria-label="Call us at +1 (555) 123-4567"
              >
                <Phone size={20} />
              </a>

              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-green-600 transition-colors duration-200 p-2 rounded-lg focus:outline-none focus:ring-0 border-none"
                prefetch
                aria-label="Go to dashboard"
              >
                <LayoutDashboard size={20} />
              </Link>

              <a
                href="https://maps.google.com/?q=123+Healthy+Street+Wellness+City+WC+12345"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-green-600 transition-colors duration-200 p-2 rounded-lg focus:outline-none focus:ring-0 border-none"
                title="Find us on Google Maps"
                aria-label="Find us on Google Maps (opens in new tab)"
              >
                <MapPin size={20} />
              </a>

              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-red-600 transition-colors duration-200 p-2 rounded-lg focus:outline-none focus:ring-0 border-none"
                  title="Logout"
                  aria-label="Logout from your account"
                >
                  <LogOutIcon size={20} />
                </button>
              ) : (
                <Link
                  href="/Login"
                  className="text-gray-600 hover:text-green-600 transition-colors duration-200 p-2 rounded-lg focus:outline-none focus:ring-0 border-none"
                  prefetch
                  aria-label="Sign in to your account"
                >
                  <LogInIcon size={20} />
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-gray-700 hover:text-green-600 transition-colors duration-200 p-2 rounded-lg focus:outline-none focus:ring-0 border-none"
              aria-label="Open mobile menu"
              aria-expanded="false"
              aria-controls="mobile-menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
