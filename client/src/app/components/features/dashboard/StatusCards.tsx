import type { Application } from "@/app/types";

const StatusCards = ({ applications }: { applications: Application[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <svg
              className="w-6 h-6 text-blue-600"
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
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">
              Total Applications
            </p>
            <p className="text-2xl font-semibold text-gray-900">
              {applications.length}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
        <div className="flex items-center">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <svg
              className="w-6 h-6 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">In Progress</p>
            <p className="text-2xl font-semibold text-gray-900">
              {
                applications.filter(
                  (app) =>
                    !["offer", "rejected", "withdrawn"].includes(app.progress)
                ).length
              }
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded-lg">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Offers</p>
            <p className="text-2xl font-semibold text-gray-900">
              {applications.filter((app) => app.progress === "offer").length}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
        <div className="flex items-center">
          <div className="p-2 bg-purple-100 rounded-lg">
            <svg
              className="w-6 h-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-2 2m8-2l2 2m-2-2v6a2 2 0 01-2 2H10a2 2 0 01-2-2v-6"
              />
            </svg>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Interviews</p>
            <p className="text-2xl font-semibold text-gray-900">
              {applications.filter((app) => app.interview_date).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCards;
