"use client";

import type { Application } from "@/app/types";
import StatusCards from "./StatusCards";
import NoApplications from "./NoApplications";
import DesktopTable from "./DesktopTable";
import MobileTable from "./MobileTable";
import { formatDate } from "@/app/utils/formatters";
import { getProgressBadge } from "@/app/utils/badgeHelper";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteApplication } from "@/app/services/applicationService";
import DeleteConfirmationModal from "../../ui/DeleteConfirmationModal";
import UpdateApplicationFormModal from "../../ui/UpdateApplicationFormModal";

const Dashboard = ({
  applications,
}: {
  applications: Application[] | null;
}) => {
  const router = useRouter();
  const [sortOrder, setSortOrder] = useState<
    "newest" | "oldest" | "company" | "progress"
  >("newest");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedProgress, setSelectedProgress] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  if (!applications || applications.length === 0) {
    return <NoApplications />;
  }

  const filteredAndSortedApplications = [...applications]
    .filter((app) => {
      const matchCompany = selectedCompany
        ? app.company_name.toLowerCase().includes(selectedCompany.toLowerCase())
        : true;
      const matchProgress = selectedProgress
        ? app.progress.toLowerCase() === selectedProgress.toLowerCase()
        : true;
      return matchCompany && matchProgress;
    })
    .sort((a, b) => {
      switch (sortOrder) {
        case "newest":
          return (
            new Date(b.date_applied).getTime() -
            new Date(a.date_applied).getTime()
          );
        case "oldest":
          return (
            new Date(a.date_applied).getTime() -
            new Date(b.date_applied).getTime()
          );
        case "company":
          return a.company_name.localeCompare(b.company_name);
        case "progress":
          return a.progress.localeCompare(b.progress);
        default:
          return 0;
      }
    });

  const handleOpenModal = (application: Application) => {
    setSelectedApp(application);
    setIsModalOpen(true);
  };

  const handleUpdateModal = (application: Application) => {
    setSelectedApp(application);
    setUpdateModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedApp) return;
    try {
      await deleteApplication(selectedApp.id);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting the application:", error);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <StatusCards applications={applications} />
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <h2 className="text-lg font-semibold text-gray-900">
              Applications Overview
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 sm:space-y-0">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className="w-full sm:w-auto border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
              >
                <option value="newest">Sort by Newest</option>
                <option value="oldest">Sort by Oldest</option>
                <option value="company">Sort by Company</option>
                <option value="progress">Sort by Progress</option>
              </select>

              <input
                type="text"
                placeholder="Filter by company..."
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="w-full sm:w-auto border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
              />

              <select
                value={selectedProgress}
                onChange={(e) => setSelectedProgress(e.target.value)}
                className="w-full sm:w-auto border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
              >
                <option value="">All Progress</option>
                <option value="submitted">Submitted</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>

              <button
                onClick={() => router.push("/applicationForm")}
                className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Add New Application
              </button>
            </div>
          </div>
        </div>

        <DesktopTable
          applications={applications}
          formatDate={formatDate}
          getProgressBadge={getProgressBadge}
          sortedApplications={filteredAndSortedApplications}
          onDeleteClick={handleOpenModal}
          onEditClick={handleUpdateModal}
        />

        <MobileTable
          applications={applications}
          formatDate={formatDate}
          getProgressBadge={getProgressBadge}
          sortedApplications={filteredAndSortedApplications}
          onDeleteClick={handleOpenModal}
          onEditClick={handleUpdateModal}
        />
      </div>

      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        applicationTitle={
          selectedApp
            ? `${selectedApp.position_applied} at ${selectedApp.company_name}`
            : undefined
        }
      />
      <UpdateApplicationFormModal
        isOpen={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        application={selectedApp}
      />
    </div>
  );
};

export default Dashboard;
