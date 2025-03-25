"use client";

import React from "react";

const VideoCall = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-4 animate-fadeIn">
        🎥 Live Video Call
      </h1>
      
      {/* Meet Embed Box */}
      <div className="w-[90%] md:w-[90%] h-[50%] bg-black bg-opacity-30 border border-gray-700 rounded-lg shadow-2xl backdrop-blur-lg p-4 flex flex-col justify-center items-center">
        <MeetEmbed />
      </div>

      {/* Join Button */}
      <a
        href="https://meet.google.com/qfb-qjar-qhw"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 px-6 py-3 bg-orange-500 text-black font-semibold rounded-full shadow-lg hover:bg-orange-400 transition-all duration-300 transform hover:scale-105 animate-fadeIn"
      >
        🔗 Join Meeting
      </a>
    </div>
  );
};

const MeetEmbed = () => {
  return (
    <iframe
      src="https://meet.google.com/qfb-qjar-qhw"
      allow="camera; microphone; fullscreen"
      title="Google Meet Session"
      className="w-full h-full border rounded-lg shadow-lg"
    ></iframe>
  );
};

export default VideoCall;