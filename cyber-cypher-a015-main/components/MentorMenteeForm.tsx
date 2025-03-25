"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "../source/firebase";
import { collection, addDoc } from "firebase/firestore";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";

const words = [
  { text: "Your" },
  { text: "response" },
  { text: "has" },
  { text: "been" },
  { text: "recorded.", className: "bg-green-500 dark:bg-green-600" },
];

interface FormData {
  name: string;
  email: string;
  expertise?: string;
  yearsExperience?: string;
  interest?: string;
  experienceLevel?: string;
  availability: string;
  communication: string;
  skills: string;
  expectations: string;
  previousMentoring?: string;
}

const MentorMenteeForm: React.FC<{ userRole?: "mentee" | "mentor" }> = ({ userRole }) => {
  const [role, setRole] = useState<"mentee" | "mentor">(userRole || "mentee");

  useEffect(() => {
    if (!userRole) {
      const storedRole = localStorage.getItem("userRole") as "mentee" | "mentor";
      if (storedRole) {
        setRole(storedRole);
      }
    }
  }, [userRole]);

  console.log("User Role:", role);
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    availability: "",
    communication: "",
    skills: "",
    expectations: "",
    ...(role === "mentee"
      ? { interest: "", experienceLevel: "" }
      : { expertise: "", yearsExperience: "", previousMentoring: "" }),
  });

  const [showTypewriter, setShowTypewriter] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "mentor_mentee"), { ...formData, role });
      console.log("Document successfully written!");
      setShowTypewriter(true);
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          availability: "",
          communication: "",
          skills: "",
          expectations: "",
          ...(role === "mentee" ? { interest: "", experienceLevel: "" } : { expertise: "", yearsExperience: "", previousMentoring: "" }),
        });
        setTimeout(() => {
          setShowTypewriter(false);
          router.push("/dashboard/");
        }, 2400);
      }, 2400);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-white text-center">
        {role === "mentee" ? "Mentee Registration" : "Mentor Registration"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded bg-white text-gray-900" required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded bg-white text-gray-900" required />

        {role === "mentee" ? (
          <>
            <input type="text" name="interest" placeholder="Field of Interest" value={formData.interest} onChange={handleChange} className="w-full p-2 border rounded bg-white text-gray-900" required />
            <label htmlFor="experienceLevel" className="text-white">Current Experience Level</label>
            <select id="experienceLevel" name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} className="w-full p-2 border rounded bg-white text-gray-900" required>
              <option value="">Select an option</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </>
        ) : (
          <>
            <input type="text" name="expertise" placeholder="Area of Expertise" value={formData.expertise} onChange={handleChange} className="w-full p-2 border rounded bg-white text-gray-900" required />
            <input type="number" name="yearsExperience" placeholder="Years of Experience" value={formData.yearsExperience} onChange={handleChange} className="w-full p-2 border rounded bg-white text-gray-900" required />
            <label htmlFor="previousMentoring" className="text-white">Previous Mentoring Experience</label>
            <select id="previousMentoring" name="previousMentoring" value={formData.previousMentoring} onChange={handleChange} className="w-full p-2 border rounded bg-white text-gray-900" required>
              <option value="">Select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </>
        )}

        <input type="number" name="availability" placeholder="Availability (hours per week)" value={formData.availability} onChange={handleChange} className="w-full p-2 border rounded bg-white text-gray-900" required />
        <label htmlFor="communication" className="text-white">Preferred Communication Mode</label>
        <select id="communication" name="communication" value={formData.communication} onChange={handleChange} className="w-full p-2 border rounded bg-white text-gray-900" required>
          <option value="">Select an option</option>
          <option value="Video Call">Video Call</option>
          <option value="Chat">Chat</option>
          <option value="Email">Email</option>
        </select>
        <input type="text" name="skills" placeholder={role === "mentee" ? "Skills You Want to Develop" : "Skills You Want to Teach"} value={formData.skills} onChange={handleChange} className="w-full p-2 border rounded bg-white text-gray-900" required />
        <textarea name="expectations" placeholder={role === "mentee" ? "What do you expect from this mentorship?" : "What do you expect from your mentees?"} value={formData.expectations} onChange={handleChange} className="w-full p-2 border rounded bg-white text-gray-900" required />

        {showTypewriter && <div className="mb-4"><TypewriterEffectSmooth words={words} /></div>}

        <button type="submit" className="bg-yellow-400 text-gray-900 p-2 rounded w-full font-bold hover:bg-yellow-500 transition">Submit</button>
      </form>
    </div>
  );
};

export default MentorMenteeForm;
