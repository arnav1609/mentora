"use client";

import React, { useEffect, useState } from "react";
import ProfileDropdown from "./ProfileDropDown";
import { motion } from "framer-motion";
import { FaMedal, FaChartLine, FaUserGraduate } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

// Define Mentee/Mentor Type ✅
interface Person {
  id: string;
  name: string;
  progress: number;
  score: number;
  mentors: string[];
}

// Names for Mentees (Students) and Mentors (Teachers)
const menteeNames = ["Anokhi", "Baburao", "Airresh", "Shubh", "Arnav", "Aarush", "Siddhant", "Jason"];
const mentorNames = ["Dr. Smith", "Prof. Patel", "Ms. Lee", "Mr. Thompson", "Coach Carter", "Dr. Williams", "Mr. Kumar", "Ms. Davis"];

const convertProgressToScale = (progress: number): number => {
    return Math.round((progress / 100) * 5); // Convert 0-100 scale to 0-5 scale
  };

// Generate Random List Based on Role
const generatePeopleList = (role: "mentor" | "mentee"): Person[] => {
    const names = role === "mentee" ? mentorNames : menteeNames;
    return names.map((name, index) => ({
      id: index.toString(),
      name,
      progress: Math.floor(Math.random() * 100),
      score: Math.floor(Math.random() * 500),
      mentors: role === "mentee" ? ["John Doe"] : [], // Assign "John Doe" to mentees only
    }));
  };

const Profile = () => {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || localStorage.getItem("userRole") || "mentee"; // Default to mentee

  const [people, setPeople] = useState<Person[]>(generatePeopleList(role as "mentor" | "mentee"));
  const [leaderboard, setLeaderboard] = useState<Person[]>([]);

  useEffect(() => {
    // Sort by highest score
    setLeaderboard([...people].sort((a, b) => b.score - a.score));
  }, [people]);

  return (
    <div className="min-h-screen bg-black p-6">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center bg-orange-500 p-4 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-black flex items-center">
          <FaUserGraduate className="mr-2" /> {role === "mentor" ? "Mentor Dashboard" : "Mentee Dashboard"}
        </h1>
        <ProfileDropdown />
      </div>

      {/* People Section (Mentees for Mentors, Mentors for Mentees) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {people.map((person) => (
          <motion.div
            key={person.id}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-orange-500 p-4 rounded-lg shadow-xl flex flex-col items-center text-center"
          >
            {/* Profile Picture Placeholder */}
            <div className="w-12 h-12 bg-gray-300 rounded-full mb-2 flex items-center justify-center text-lg font-bold">
              {person.name.charAt(0)}
            </div>

            <h2 className="text-lg font-semibold text-black">{person.name}</h2>
            <p className="text-xs text-black">{role === "mentee" ? "Mentee" : "Mentor"}: {person.mentors.join(", ")}</p>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mt-2 overflow-hidden">
              <motion.div
                className="bg-black h-3 rounded-full"
                style={{ width: `${person.progress}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${person.progress}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
            {role === "mentee" ? (
                <p className="text-xs font-medium mt-1 text-black">
                    Rating: {"★".repeat(convertProgressToScale(person.progress))}
                </p>
                ) : (
                <p className="text-xs font-medium mt-1 text-black">
                    Progress: {person.progress}%
                </p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Leaderboard */}
      <div className="bg-orange-500 p-6 rounded-lg shadow-xl mt-6 w-full max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-black flex items-center">
          <FaChartLine className="mr-2" /> Leaderboard
        </h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-black text-orange-500">
              <th className="py-2 px-4">Rank</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.slice(0, 5).map((person, index) => ( // Showing Top 5 Only
              <tr key={person.id} className="border-b hover:bg-neutral-500 text-black">
                <td className="py-2 px-4 flex items-center">
                  <FaMedal
                    className={`mr-2 ${
                      index === 0 ? "text-yellow-500" : index === 1 ? "text-gray-400" : index === 2 ? "text-orange-700" : "text-white"
                    }`}
                  />
                  {index + 1}
                </td>
                <td className="py-2 px-4">{person.name}</td>
                <td className="py-2 px-4">{person.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
