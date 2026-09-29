import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";
import { removeCurrentUser } from "../../../utils/authStorage";

const AdminSidebar = () => {
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        removeCurrentUser();
        dispatch(logout());
        navigate("/login");
    };

    const navClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${isActive
            ? "bg-red-600 text-white"
            : "text-gray-400 hover:bg-gray-900 hover:text-white"
        }`;

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setOpen(!open)}
                className="lg:hidden fixed top-5 left-5 z-50 w-10 h-10 rounded-lg bg-gray-900 border border-gray-800 text-white"
            >
                {open ? "✕" : "☰"}
            </button>

            {/* Mobile Overlay */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="lg:hidden fixed inset-0 bg-black/60 z-40"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:sticky top-0 left-0 z-50 w-64 h-screen bg-gray-950 border-r border-gray-800 flex flex-col transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    }`}
            >
                {/* Logo */}
                <div className="h-20 px-6 flex items-center border-b border-gray-800">
                    <div>
                        <h1 className="text-xl font-bold text-white">
                            CineTrack
                        </h1>

                        <p className="text-xs text-red-500 mt-1">
                            ADMIN PANEL
                        </p>
                    </div>
                </div>

                {/* Admin */}
                <div className="px-4 py-5 border-b border-gray-800">
                    <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center font-bold text-white">
                            {user?.name?.charAt(0)?.toUpperCase() || "A"}
                        </div>

                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-white truncate">
                                {user?.name || "Admin"}
                            </p>

                            <p className="text-xs text-gray-500 truncate">
                                {user?.email || "admin@cinetrack.com"}
                            </p>
                        </div>

                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6">

                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider px-4 mb-3">
                        Menu
                    </p>

                    <div className="space-y-1">

                        <NavLink
                            to="/admin/dashboard"
                            onClick={() => setOpen(false)}
                            className={navClass}
                        >
                            <span>📊</span>
                            Dashboard
                        </NavLink>

                        <NavLink
                            to="/admin/profile"
                            onClick={() => setOpen(false)}
                            className={navClass}
                        >
                            <span>👤</span>
                            Profile
                        </NavLink>

                    </div>
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-gray-800">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition"
                    >
                        <span>↪</span>
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;