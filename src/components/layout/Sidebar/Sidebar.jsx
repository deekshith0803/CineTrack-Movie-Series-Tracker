import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const linkClass = (path) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
      isActive(path)
        ? "bg-gray-900 text-white"
        : "text-gray-400 hover:bg-gray-900 hover:text-white"
    }`;

  return (
    <aside className="hidden md:block w-64 min-h-screen bg-gray-950 border-r border-gray-800 text-white">
      <div className="p-5">
        {/* Menu */}
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
          Menu
        </h2>

        <div className="flex flex-col gap-2">
          {/* Home */}
          <Link to="/" className={linkClass("/")}>
            <span>🏠</span>
            <span className="text-sm font-medium">Home</span>
          </Link>

          {/* Movies */}
          <Link to="/movies" className={linkClass("/movies")}>
            <span>🎬</span>
            <span className="text-sm font-medium">Movies</span>
          </Link>

          {/* Series */}
          <Link to="/series" className={linkClass("/series")}>
            <span>📺</span>
            <span className="text-sm font-medium">Series</span>
          </Link>

          {/* Currently Watching */}
          <Link
            to="/currently-watching"
            className={linkClass("/currently-watching")}
          >
            <span>▶️</span>
            <span className="text-sm font-medium">Currently Watching</span>
          </Link>

          {/* Favorites */}
          <Link to="/favorites" className={linkClass("/favorites")}>
            <span>❤️</span>
            <span className="text-sm font-medium">Favorites</span>
          </Link>

          {/* Watchlist */}
          <Link to="/watchlist" className={linkClass("/watchlist")}>
            <span>🔖</span>
            <span className="text-sm font-medium">Watchlist</span>
          </Link>
        </div>

        {/* Library */}
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mt-8 mb-4">
          Library
        </h2>

        <div className="flex flex-col gap-2">
          {/* Completed */}
          <Link to="/completed" className={linkClass("/completed")}>
            <span>✓</span>
            <span className="text-sm font-medium">Completed</span>
          </Link>

          {/* Profile */}
          <Link to="/profile" className={linkClass("/profile")}>
            <span>👤</span>
            <span className="text-sm font-medium">Profile</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
