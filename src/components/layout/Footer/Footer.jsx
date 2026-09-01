import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 text-gray-400">
      <div className="max-w-7xl mx-auto px-5 py-10">
        {/* Top */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Logo */}
          <div>
            <h2 className="text-xl font-bold text-white">CineTrack</h2>

            <p className="text-sm mt-2">Track. Discover. Enjoy.</p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-5 text-sm">
            <Link to="/" className="hover:text-white">
              Home
            </Link>

            <Link to="/favorites" className="hover:text-white">
              Favorites
            </Link>

            <Link to="/watchlist" className="hover:text-white">
              Watchlist
            </Link>

            <Link to="/profile" className="hover:text-white">
              Profile
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-xs sm:text-sm">
            © 2026 CineTrack. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
