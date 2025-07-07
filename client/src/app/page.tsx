"use client";

import LoginForm from "./components/features/auth/LoginForm";
import SignupForm from "./components/features/auth/SignupForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div>
        <LoginForm />
        <SignupForm />
      </div>
    </div>
  );
}
