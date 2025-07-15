"use client";

import { useState } from "react";
import { signup } from "@/app/services/authService";
import { useRouter } from "next/navigation";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { validatePassword } from "@/app/utils/validatePassword";

const SignupForm = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    isValid: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password" || name === "confirmPassword") {
      const validation = validatePassword(value);
      setPasswordValidation(validation);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePassword(formData.password).isValid) {
      alert("Password does not meet all requirements.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await signup(formData.username, formData.password);
      setMessage(res.message);
      router.push(`/dashboard/${formData.username}`);
    } catch (err: any) {
      setMessage(
        err.response?.data.error || "An error occurred during signup."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="register-name"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            id="register-username"
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
          htmlFor="register-password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            id="register-password"
            name="password"
            type={showPassword ? "text" : "password"}
            onChange={handleInputChange}
            value={formData.password}
            placeholder="Create a password"
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

      <div className="space-y-2">
        <label
          htmlFor="confirm-password"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            id="confirm-password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            onChange={handleInputChange}
            value={formData.confirmPassword}
            placeholder="Confirm your password"
            className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-colors"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <ul className="text-xs text-gray-600 mt-2 space-y-1">
        <li
          className={
            passwordValidation.minLength ? "text-green-600" : "text-red-500"
          }
        >
          • At least 8 characters
        </li>
        <li
          className={
            passwordValidation.hasUppercase ? "text-green-600" : "text-red-500"
          }
        >
          • Contains an uppercase letter
        </li>
        <li
          className={
            passwordValidation.hasNumber ? "text-green-600" : "text-red-500"
          }
        >
          • Contains a number
        </li>
        <li
          className={
            passwordValidation.hasSpecialChar
              ? "text-green-600"
              : "text-red-500"
          }
        >
          • Contains a special character
        </li>
      </ul>

      <p className="text-center font-semibold text-red-500">{message}</p>

      <button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 px-4 rounded-md font-medium transition-colors duration-200"
      >
        Create Account
      </button>
    </form>
  );
};

export default SignupForm;
