"use client";

import { useState } from "react";
import { login } from "@/app/services/authService";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(formData.username, formData.password);
      router.push(`/dashboard/${formData.username}`);
    } catch (err: any) {
      console.error("Login failed:", err);
      setMessage(err.response?.data.error || "An error occurred during login.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl text-blue-500">Welcome to JobJournal</h1>
      <p>Please enter your credentials below.</p>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="text"
          name="username"
          onChange={handleInputChange}
          value={formData.username}
          placeholder="username"
          className="p-2 border border-gray-500"
          required
        />
        <input
          type="password"
          name="password"
          onChange={handleInputChange}
          value={formData.password}
          placeholder="password"
          className="p-2 border border-gray-500"
          required
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">
          Login
        </button>
      </form>
      <p>{message}</p>
      <p>Create an account?</p>
    </div>
  );
};

export default LoginForm;
