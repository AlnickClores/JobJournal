"use client";

import Dashboard from "@/app/components/features/dashboard/Dashboard";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { validateToken } from "../services/authService";
import { getApplications } from "../services/applicationService";
import { Application } from "../types";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-purple-600 mb-5">
          Hi, {data?.user.username}!
        </h1>
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
