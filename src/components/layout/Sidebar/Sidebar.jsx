import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="hidden md:block w-64 min-h-screen bg-gray-950 border-r border-gray-800 text-white">
      <div className="p-5">
        {/* Menu Title */}
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
          Menu
        </h2>

        {/* Navigation */}
        <div className="flex flex-col gap-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-900 text-white"
          >
            <span>🏠</span>
            <span className="text-sm font-medium">Home</span>
          </Link>

          <Link
            to="/movies"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-900 hover:text-white"
          >
            <span>🎬</span>
            <span className="text-sm font-medium">Movies</span>
          </Link>

          <Link
            to="/series"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-900 hover:text-white"
          >
            <span>📺</span>
            <span className="text-sm font-medium">Series</span>
          </Link>

          <Link
            to="/favorites"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-900 hover:text-white"
          >
            <span>❤️</span>
            <span className="text-sm font-medium">Favorites</span>
          </Link>

          <Link
            to="/watchlist"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-900 hover:text-white"
          >
            <span>🔖</span>
            <span className="text-sm font-medium">Watchlist</span>
          </Link>
        </div>

        {/* Library */}
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mt-8 mb-4">
          Library
        </h2>

        <div className="flex flex-col gap-2">
          <Link
            to="/completed"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-900 hover:text-white"
          >
            <span>✓</span>
            <span className="text-sm font-medium">Completed</span>
          </Link>

          <Link
            to="/profile"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-900 hover:text-white"
          >
            <span>👤</span>
            <span className="text-sm font-medium">Profile</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
