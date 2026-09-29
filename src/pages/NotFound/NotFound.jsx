import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-5">
      <div className="text-center max-w-xl">
        <h1 className="text-[120px] sm:text-[160px] font-black leading-none text-red-600">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-bold mt-4">Page Not Found</h2>

        <p className="text-gray-500 mt-3 leading-relaxed">
          Looks like this movie disappeared from CineTrack. The page you're
          looking for doesn't exist or may have been moved.
        </p>

        <Link
          to="/"
          className="inline-block mt-7 px-6 py-3 rounded-lg bg-red-600 text-white font-semibold no-underline hover:bg-red-700 transition"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
