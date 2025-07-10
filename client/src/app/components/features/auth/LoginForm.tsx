"use client";

import { useState } from "react";
import { login } from "@/app/services/authService";
import { useRouter } from "next/navigation";
import { User, Lock, Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
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
      router.push("/dashboard/");
      console.log("Login successful:", res);
    } catch (err: any) {
      console.error("Login failed:", err);
      setMessage(err.response?.data.error || "An error occurred during login.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className=" space-y-2">
        <label
          htmlFor="login-username"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            id="login-username"
            name="username"
            type="text"
            onChange={handleInputChange}
            value={formData.username}
            placeholder="Enter your username"
            className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-colors"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="login-password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            id="login-password"
            name="password"
            type={showPassword ? "text" : "password"}
            onChange={handleInputChange}
            value={formData.password}
            placeholder="Enter your password"
            className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-colors"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center space-x-2 text-gray-600">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 focus:ring-2"
          />
          <span>Remember me</span>
        </label>
      </div>
      <p className="text-center font-semibold text-red-500">{message}</p>
      <button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 px-4 rounded-md font-medium transition-colors duration-200"
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
