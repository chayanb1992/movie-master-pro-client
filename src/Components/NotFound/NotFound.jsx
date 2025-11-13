// src/components/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Film } from "lucide-react"; // ✅ Changed from Movie to Film

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-950 text-white px-6">
      <Film className="w-20 h-20 text-red-500 mb-6" />
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg text-gray-400 mb-6">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
