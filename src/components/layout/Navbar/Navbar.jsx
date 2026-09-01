import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-gray-950 border-b border-gray-800 text-white">
      {/* Navbar */}
      <div className="max-w-7xl mx-auto h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 text-white no-underline font-bold text-xl sm:text-2xl"
        >
          <span>CineTrack</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          <Link
            to="/"
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-900"
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-900"
          >
            Favorites
          </Link>
          <Link
            to="/watchlist"
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-900"
          >
            Watchlist
          </Link>
          <Link
            to="/profile"
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-900"
          >
            Profile
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Login */}
          <Link
            to="/login"
            className="hidden sm:flex px-5 py-2.5 rounded-lg bg-red-600 text-white text-sm font-semibold no-underline hover:bg-red-700"
          >
            Login
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="flex md:hidden w-10 h-10 items-center justify-center rounded-lg bg-gray-900 text-gray-300"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden flex flex-col gap-2 px-5 pb-5">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="text-gray-300 hover:text-white py-2"
          >
            Home
          </Link>

          <Link
            to="/favorites"
            onClick={() => setOpen(false)}
            className="text-gray-300 hover:text-white py-2"
          >
            Favorites
          </Link>

          <Link
            to="/watchlist"
            onClick={() => setOpen(false)}
            className="text-gray-300 hover:text-white py-2"
          >
            Watchlist
          </Link>

          <Link
            to="/profile"
            onClick={() => setOpen(false)}
            className="text-gray-300 hover:text-white py-2"
          >
            Profile
          </Link>

          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="text-gray-300 hover:text-white py-2"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
