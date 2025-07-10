"use client";

import { useState } from "react";
import LoginForm from "./components/features/auth/LoginForm";
import SignupForm from "./components/features/auth/SignupForm";
import Hero from "./components/ui/Hero";
import Footer from "./components/ui/Footer";

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        {/* Hero Section */}
        <Hero />
        {/* Auth Component */}
        <div className="max-w-md mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-xl border-0 overflow-hidden">
            {/* Header */}
            <div className="text-center p-6 pb-4">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Get Started
              </h2>
              <p className="text-gray-600 text-pretty">
                Start managing your job applications with structure and clarity.
              </p>
            </div>

            <div className="px-6 pb-6">
              {/* Tab Navigation */}
              <div className="flex bg-purple-50 rounded-lg p-1 mb-6">
                <button
                  onClick={() => setActiveTab("login")}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === "login"
                      ? "bg-purple-600 text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setActiveTab("register")}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === "register"
                      ? "bg-purple-600 text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Login Form */}
              {activeTab === "login" && <LoginForm />}

              {/* Registration Form */}
              {activeTab === "register" && <SignupForm />}
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
