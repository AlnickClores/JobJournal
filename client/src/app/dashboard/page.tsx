"use client";

import Dashboard from "@/app/components/features/dashboard/Dashboard";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { validateToken } from "../services/authService";
import { getApplications } from "../services/applicationService";
import { Application } from "../types";
import { LogOut } from "lucide-react";

interface DashboardData {
  message: string;
  user: {
    id: number;
    username: string;
  };
}

const DashboardPage = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [applications, setApplications] = useState<Application[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await validateToken();
        setData(res);

        const applications = await getApplications(res.user.id);
        setApplications(applications.application);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        sessionStorage.clear();
        router.push("/");
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    const logoutConfirmed = window.confirm("Are you sure you want to logout?");

    if (logoutConfirmed) {
      sessionStorage.clear();
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-purple-600 mb-5">
            Hi, {data?.user.username}!
          </h1>
          <div>
            <button
              onClick={handleLogout}
              className="flex gap-1 items-center w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Logout <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Job Applications
          </h1>
          <p className="text-gray-600">
            Track and manage your job application progress
          </p>
        </div>
        <Dashboard applications={applications} />
      </div>
    </div>
  );
};

export default DashboardPage;
