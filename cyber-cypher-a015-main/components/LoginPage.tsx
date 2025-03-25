"use client";

import React, { useState } from "react";
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"mentee" | "mentor">("mentee");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (activeTab === "signup") {
      localStorage.setItem("userRole", role);
      router.push("/questionnaire");
    } else {
      const storedRole = localStorage.getItem("userRole") || "mentee";
      router.push(`/dashboard?role=${storedRole}`);
    }
  };

  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-primary-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-primary-500/[0.1] dark:bg-primary-900 dark:border-primary-500/[0.2] border-primary-300 w-auto sm:w-[30rem] h-auto rounded-xl p-6 border border-gray-400">
        
        {/* Tab Buttons */}
        <div className="flex mb-4">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 p-2 text-center transition-colors duration-200 ${
              activeTab === "login" ? "border-b-2 border-primary-500 text-primary-700 dark:text-primary-300" : "text-primary-400"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`flex-1 p-2 text-center transition-colors duration-200 ${
              activeTab === "signup" ? "border-b-2 border-primary-500 text-primary-700 dark:text-primary-300" : "text-primary-400"
            }`}
          >
            Sign Up
          </button>
        </div>

        <CardItem translateZ="50" className="text-xl font-bold text-primary-700 dark:text-primary-300">
          {activeTab === "login" ? "Login" : "Sign Up"}
        </CardItem>
        <CardItem as="p" translateZ="60" className="text-primary-600 text-sm max-w-sm mt-2 dark:text-primary-400">
          {activeTab === "login"
            ? "Enter your credentials to access your account."
            : "Create a new account by filling in your details."}
        </CardItem>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-primary-300 rounded bg-white text-black dark:bg-primary-800 dark:text-primary-200"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-primary-300 rounded bg-white text-black dark:bg-primary-800 dark:text-primary-200"
              required
            />
          </div>

          {/* Role Selection (Only for Signup) */}
          {activeTab === "signup" && (
            <div>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as "mentee" | "mentor")}
                className="w-full p-2 border border-primary-300 rounded bg-white text-black dark:bg-primary-800 dark:text-white appearance-none"
                required
              >
                <option value="mentee" className="text-black bg-white">Mentee</option>
                <option value="mentor" className="text-black bg-white">Mentor</option>
              </select>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 rounded-xl bg-primary-500 dark:bg-primary-400 text-white dark:text-black text-xs font-bold hover:bg-primary-600 dark:hover:bg-primary-300 transition-colors duration-200"
            >
              {activeTab === "login" ? "Login" : "Sign Up"}
            </button>
          </div>
        </form>
      </CardBody>
    </CardContainer>
  );
}