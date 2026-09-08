import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const linkClass = (path) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition ${
      isActive(path)
        ? "text-white bg-gray-900"
        : "text-gray-400 hover:text-white hover:bg-gray-900"
    }`;

  return (
    <nav className="w-full bg-gray-950 border-b border-gray-800 text-white">
      {/* Navbar */}
      <div className="max-w-7xl mx-auto h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 text-white no-underline font-bold text-xl sm:text-2xl"
        >
          CineTrack
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          <Link to="/" className={linkClass("/")}>
            Home
          </Link>

          <Link to="/movies" className={linkClass("/movies")}>
            Movies
          </Link>

          <Link to="/series" className={linkClass("/series")}>
            Series
          </Link>

          <Link
            to="/currently-watching"
            className={linkClass("/currently-watching")}
          >
            Currently Watching
          </Link>

          <Link to="/favorites" className={linkClass("/favorites")}>
            Favorites
          </Link>

          <Link to="/watchlist" className={linkClass("/watchlist")}>
            Watchlist
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Login */}
          <Link
            to="/login"
            className="hidden sm:flex px-5 py-2.5 rounded-lg bg-red-600 text-white text-sm font-semibold no-underline hover:bg-red-700 transition"
          >
            Login
          </Link>

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(!open)}
            className="flex md:hidden w-10 h-10 items-center justify-center rounded-lg bg-gray-900 text-gray-300 hover:bg-gray-800"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-gray-800 px-5 py-4">
          <div className="flex flex-col gap-1">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className={linkClass("/")}
            >
              Home
            </Link>

            <Link
              to="/movies"
              onClick={() => setOpen(false)}
              className={linkClass("/movies")}
            >
              Movies
            </Link>

            <Link
              to="/series"
              onClick={() => setOpen(false)}
              className={linkClass("/series")}
            >
              Series
            </Link>

            <Link
              to="/currently-watching"
              onClick={() => setOpen(false)}
              className={linkClass("/currently-watching")}
            >
              Currently Watching
            </Link>

            <Link
              to="/favorites"
              onClick={() => setOpen(false)}
              className={linkClass("/favorites")}
            >
              Favorites
            </Link>

            <Link
              to="/watchlist"
              onClick={() => setOpen(false)}
              className={linkClass("/watchlist")}
            >
              Watchlist
            </Link>

            <Link
              to="/profile"
              onClick={() => setOpen(false)}
              className={linkClass("/profile")}
            >
              Profile
            </Link>

            {/* Mobile Login */}
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="mt-2 px-4 py-3 rounded-lg bg-red-600 text-white text-sm font-semibold text-center no-underline hover:bg-red-700"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
