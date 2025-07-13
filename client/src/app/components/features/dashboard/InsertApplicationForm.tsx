"use client";

import { insertApplication } from "@/app/services/applicationService";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  Briefcase,
  Calendar,
  TrendingUp,
  Clock,
} from "lucide-react";

interface UserData {
  message: string;
  user: {
    id: number;
    username: string;
  };
}

interface InsertApplicationFormProps {
  userData: UserData | null;
}

const InsertApplicationForm = ({ userData }: InsertApplicationFormProps) => {
  const router = useRouter();
  const [applicationForm, setApplicationForm] = useState({
    companyName: "",
    positionApplied: "",
    dateApplied: "",
    progress: "submitted",
    interviewDate: "",
  });

  const progressOptions = ["submitted", "interview", "offer", "rejected"];

  const isInterviewDateRequired = ["interview"].includes(
    applicationForm.progress
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setApplicationForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form data: ", applicationForm);

    try {
      if (!userData) {
        console.error("User data not loaded");
        return;
      }
      const res = await insertApplication(userData.user.id, applicationForm);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error inserting application: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Add New Application
          </h1>
          <p className="text-gray-600">
            Track your job application progress and stay organized
          </p>
        </div>
        <div className="max-w-md mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
              <div className="flex items-center">
                <div className="p-2 bg-white/20 rounded-lg mr-3">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Application Details
                  </h2>
                  <p className="text-purple-100 text-sm">
                    Fill in the information below
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    name="companyName"
                    value={applicationForm.companyName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-colors bg-white/50 placeholder-gray-400"
                    placeholder="Enter company name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Position Applied <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    name="positionApplied"
                    value={applicationForm.positionApplied}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-colors bg-white/50 placeholder-gray-400"
                    placeholder="e.g. Software Engineer"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Date Applied <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="date"
                    name="dateApplied"
                    value={applicationForm.dateApplied}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-colors bg-white/50"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Progress <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <TrendingUp className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
                  <select
                    name="progress"
                    value={applicationForm.progress}
                    onChange={handleChange}
                    className="w-full pl-10 pr-8 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-colors bg-white/50 appearance-none cursor-pointer"
                    required
                  >
                    {progressOptions.map((option) => (
                      <option key={option} value={option} className="bg-white">
                        {option.charAt(0).toUpperCase() +
                          option.slice(1).replace("-", " ")}
                      </option>
                    ))}
                  </select>

                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Interview Date{" "}
                  {isInterviewDateRequired && (
                    <span className="text-red-500">*</span>
                  )}
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="date"
                    name="interviewDate"
                    value={applicationForm.interviewDate}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-colors bg-white/50"
                    required={isInterviewDateRequired}
                  />
                </div>
                {!isInterviewDateRequired && (
                  <p className="text-xs text-gray-500 flex items-center">
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Optional - Add when interview is scheduled
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center group mt-8"
              >
                <span>Submit Application</span>
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>

            <div className="bg-gray-50/50 px-6 py-3 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center flex items-center justify-center">
                <svg
                  className="w-3 h-3 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                All fields marked with{" "}
                <span className="text-red-500 mx-1">*</span> are required
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InsertApplicationForm;
