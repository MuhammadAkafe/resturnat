"use client";
import React from "react";
import Modal from "./modal";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Welcome to your admin dashboard
            </p>
          </div>
        </div>
        <Modal />

        {/* Menu Items Management Section */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Menu Management
          </h2>
          <p className="text-gray-600 mb-4">
            Manage your restaurant menu items - add, edit, and delete menu
            items.
          </p>
          <a
            href="/dashboard/menu-items"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Manage Menu Items
          </a>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
