"use client";
import { useParams } from "next/navigation";

const Dashboard = () => {
  const { username } = useParams();
  return (
    <div>
      <h1 className="text-2xl text-blue-500">Welcome, {username}</h1>
    </div>
  );
};

export default Dashboard;
