import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../redux/slices/authSlice";

const AdminProfile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        name: user?.name || "CineTrack Admin",
        email: user?.email || "admin@cinetrack.com",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleEdit = () => {
        setFormData({
            name: user?.name || "",
            email: user?.email || "",
        });

        setIsEditing(true);
    };

    const handleCancel = () => {
        setFormData({
            name: user?.name || "",
            email: user?.email || "",
        });

        setIsEditing(false);
    };

    const handleSave = () => {
        dispatch(
            updateUser({
                name: formData.name,
                email: formData.email,
            }),
        );

        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white p-5 sm:p-8">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <p className="text-red-500 text-sm font-semibold uppercase tracking-wider">
                        CineTrack Admin
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold mt-2">
                                Admin Profile
                            </h1>

                            <p className="text-gray-500 mt-2">
                                Manage your administrator profile information.
                            </p>
                        </div>

                        {!isEditing && (
                            <button
                                onClick={handleEdit}
                                className="px-5 py-2.5 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>

                {/* Profile Card */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">

                    {/* Profile Header */}
                    <div className="p-6 sm:p-8 border-b border-gray-800">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-5">

                            {/* Avatar */}
                            <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center text-3xl font-bold text-white shrink-0">
                                {formData.name?.charAt(0)?.toUpperCase() || "A"}
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-white">
                                    {formData.name}
                                </h2>

                                <p className="text-gray-500 mt-1">
                                    {formData.email}
                                </p>

                                <span className="inline-flex mt-3 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-medium">
                                    Administrator
                                </span>
                            </div>

                        </div>
                    </div>

                    {/* Account Information */}
                    <div className="p-6 sm:p-8">

                        <h3 className="text-lg font-semibold mb-6">
                            Account Information
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                            {/* Name */}
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                                    Name
                                </label>

                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg bg-gray-950 border border-gray-700 text-white outline-none focus:border-red-500"
                                    />
                                ) : (
                                    <div className="px-4 py-3 rounded-lg bg-gray-950 border border-gray-800 text-gray-300">
                                        {formData.name}
                                    </div>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                                    Email
                                </label>

                                {isEditing ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg bg-gray-950 border border-gray-700 text-white outline-none focus:border-red-500"
                                    />
                                ) : (
                                    <div className="px-4 py-3 rounded-lg bg-gray-950 border border-gray-800 text-gray-300">
                                        {formData.email}
                                    </div>
                                )}
                            </div>

                            {/* Role */}
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                                    Role
                                </label>

                                <div className="px-4 py-3 rounded-lg bg-gray-950 border border-gray-800 text-gray-300 capitalize">
                                    {user?.role || "admin"}
                                </div>
                            </div>

                            {/* Account Type */}
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                                    Account Type
                                </label>

                                <div className="px-4 py-3 rounded-lg bg-gray-950 border border-gray-800 text-gray-300">
                                    Administrator
                                </div>
                            </div>

                        </div>

                        {/* Edit Actions */}
                        {isEditing && (
                            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-800">

                                <button
                                    onClick={handleCancel}
                                    className="px-5 py-2.5 rounded-lg bg-gray-800 text-gray-300 text-sm font-semibold hover:bg-gray-700 transition"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleSave}
                                    className="px-5 py-2.5 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition"
                                >
                                    Save Changes
                                </button>

                            </div>
                        )}

                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminProfile;