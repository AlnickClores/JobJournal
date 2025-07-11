import { Application } from "@/app/types";
import { JSX } from "react";

interface Props {
  applications: Application[];
  formatDate: (date: string) => string;
  getProgressBadge: (progress: string) => JSX.Element;
}

const DesktopTable = ({
  applications,
  formatDate,
  getProgressBadge,
}: Props) => {
  return (
    <div className="hidden lg:block overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50/50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Company & Position
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date Applied
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Progress
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Interview Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white/50 divide-y divide-gray-200">
          {applications.map((application, index) => (
            <tr
              key={application.id}
              className={`hover:bg-purple-50/50 transition-colors duration-150 ${
                index % 2 === 0 ? "bg-white/30" : "bg-gray-50/30"
              }`}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {application.company_name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {application.position_applied}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatDate(application.date_applied)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getProgressBadge(application.progress)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {application.interview_date
                  ? formatDate(application.interview_date)
                  : "Not scheduled"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <button className="text-purple-600 hover:text-purple-900 transition-colors duration-150">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-900 transition-colors duration-150">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DesktopTable;
