"use client";

import { useState } from "react";
import { signup } from "@/app/services/authService";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <div>
      <h1 className="text-2xl text-blue-500">Welcome to JobJournal!</h1>
      <p>Please enter your credentials below to sign up.</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={formData.username}
          onChange={handleInputChange}
          name="username"
          placeholder="username"
          className="p-2 border border-gray-500"
          required
        />
        <input
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          name="password"
          placeholder="password"
          className="p-2 border border-gray-500"
          required
        />
        <input
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          name="confirmPassword"
          placeholder="password"
          className="p-2 border border-gray-500"
          required
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">
          Login
        </button>
      </form>
      <p>{message}</p>
      <p>Already have an account?</p>
    </div>
  );
};

export default SignupForm;
