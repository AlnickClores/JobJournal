import React from "react";
import { useRouter } from "next/navigation";

const NoApplications = () => {
  const router = useRouter();
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-xl p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              No Applications Yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start tracking your job applications to see them here.
            </p>
            <button
              onClick={() => router.push("/applicationForm")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200"
            >
              Add Your First Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoApplications;
