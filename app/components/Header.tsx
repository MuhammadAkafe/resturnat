"use client";

import Link from "next/link";
import {
  MapPin,
  Phone,
  Menu,
  X,
  LogInIcon,
  LogOutIcon,
  LayoutDashboard,
} from "lucide-react";
import Navigation from "./Navigation";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Restaurant Name */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-2"
              prefetch
              onClick={closeMobileMenu}
            >
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
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-green-600 transition-colors duration-200 p-2 rounded-lg focus:outline-none focus:ring-0 border-none"
              aria-label={
                isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"
              }
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden border-t border-gray-200 bg-white"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Navigation */}
              <div className="flex flex-col space-y-2">
                <Link
                  href="/"
                  className="text-gray-700 hover:text-green-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="text-gray-700 hover:text-green-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  onClick={closeMobileMenu}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-700 hover:text-green-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  onClick={closeMobileMenu}
                >
                  Contact
                </Link>
              </div>

              {/* Mobile Contact Info */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex flex-col space-y-3">
                  <a
                    href="tel:+1 (555) 123-4567"
                    className="flex items-center space-x-3 text-gray-700 hover:text-green-600 px-3 py-2 rounded-md transition-colors duration-200"
                    onClick={closeMobileMenu}
                  >
                    <Phone size={20} />
                    <span>Call us</span>
                  </a>

                  <Link
                    href="/dashboard"
                    className="flex items-center space-x-3 text-gray-700 hover:text-green-600 px-3 py-2 rounded-md transition-colors duration-200"
                    onClick={closeMobileMenu}
                  >
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                  </Link>

                  <a
                    href="https://maps.google.com/?q=123+Healthy+Street+Wellness+City+WC+12345"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-gray-700 hover:text-green-600 px-3 py-2 rounded-md transition-colors duration-200"
                    onClick={closeMobileMenu}
                  >
                    <MapPin size={20} />
                    <span>Find us</span>
                  </a>

                  {isAuthenticated ? (
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 text-gray-700 hover:text-red-600 px-3 py-2 rounded-md transition-colors duration-200 w-full text-left"
                    >
                      <LogOutIcon size={20} />
                      <span>Logout</span>
                    </button>
                  ) : (
                    <Link
                      href="/Login"
                      className="flex items-center space-x-3 text-gray-700 hover:text-green-600 px-3 py-2 rounded-md transition-colors duration-200"
                      onClick={closeMobileMenu}
                    >
                      <LogInIcon size={20} />
                      <span>Login</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
