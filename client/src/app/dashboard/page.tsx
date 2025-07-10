"use client";

import Dashboard from "@/app/components/features/dashboard/Dashboard";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface DashboardData {
  message: string;
  user: {
    id: number;
    username: string;
  };
}

const DashboardPage = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.error("No token found, redirecting to login page.");
      router.push("/");
      return;
    }
    axios
      .get("http://localhost:3030/api/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setData(res.data))
      .catch(() => {
        sessionStorage.clear();
        router.push("/");
      });
  }, []);

  return (
    <div>
      <h1 className="text-2xl text-blue-500">THIS IS THE DASHBOARD PAGE</h1>
      <h1>Hello, {data && data.user.username}</h1>
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
