"use client";

import type { Application } from "@/app/types";
import StatusCards from "./StatusCards";
import NoApplications from "./NoApplications";
import DesktopTable from "./DesktopTable";
import MobileTable from "./MobileTable";
import { formatDate } from "@/app/utils/formatters";
import { getProgressBadge } from "@/app/utils/badgeHelper";

const Dashboard = ({
  applications,
}: {
  applications: Application[] | null;
}) => {
  if (!applications || applications.length === 0) {
    return <NoApplications />;
  }

  return (
    <div>
      <StatusCards applications={applications} />

      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Applications Overview
            </h2>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              Add New Application
            </button>
          </div>
        </div>

        <DesktopTable
          applications={applications}
          formatDate={formatDate}
          getProgressBadge={getProgressBadge}
        />

        <MobileTable
          applications={applications}
          formatDate={formatDate}
          getProgressBadge={getProgressBadge}
        />
      </div>
    </div>
  );
};

export default Dashboard;
