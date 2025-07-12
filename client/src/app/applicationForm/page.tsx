"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import InsertApplicationForm from "../components/features/dashboard/InsertApplicationForm";
import { validateToken } from "../services/authService";

interface UserData {
  message: string;
  user: {
    id: number;
    username: string;
  };
}

const InsertApplicationPage = () => {
  const router = useRouter();
  const [userData, setuserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await validateToken();
        setuserData(res);
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
      <div className="bg-white/60 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push("/dashboard")}
              className="flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="font-medium">Back to Dashboard</span>
            </button>
          </div>
        </div>
      </div>

      <InsertApplicationForm userData={userData} />
    </div>
  );
};

export default InsertApplicationPage;
