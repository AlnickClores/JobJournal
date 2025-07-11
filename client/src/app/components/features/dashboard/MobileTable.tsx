import { Application } from "@/app/types";
import { JSX } from "react";

interface Props {
  applications: Application[];
  formatDate: (date: string) => string;
  getProgressBadge: (progress: string) => JSX.Element;
}

const MobileTable = ({ applications, formatDate, getProgressBadge }: Props) => {
  return (
    <div className="lg:hidden">
      <div className="divide-y divide-gray-200">
        {applications.map((application) => (
          <div
            key={application.id}
            className="p-6 hover:bg-purple-50/50 transition-colors duration-150"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-gray-900">
                {application.company_name}
              </h3>
              {getProgressBadge(application.progress)}
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Position:</span>{" "}
                {application.position_applied}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Applied:</span>{" "}
                {formatDate(application.date_applied)}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Interview:</span>{" "}
                {application.interview_date
                  ? formatDate(application.interview_date)
                  : "Not scheduled"}
              </p>
            </div>

            <div className="flex space-x-3">
              <button className="text-purple-600 hover:text-purple-900 text-sm font-medium transition-colors duration-150">
                Edit
              </button>
              <button className="text-red-600 hover:text-red-900 text-sm font-medium transition-colors duration-150">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileTable;
