import React from "react";

const Profile = () => {
  return (
    <div className="min-h-screen overflow-y-auto bg-gray-950 text-white px-5 sm:px-8 lg:px-12 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">My Profile</h1>

          <p className="text-gray-500 mt-2">
            Manage your account and track your activity.
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-red-600 flex items-center justify-center shrink-0">
              <span className="text-3xl font-bold">U</span>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold">User Name</h2>

              <p className="text-gray-500 mt-1">user@example.com</p>

              <p className="text-gray-600 text-sm mt-2">CineTrack Member</p>
            </div>

            {/* Edit */}
            <button className="px-5 py-2.5 rounded-lg border border-gray-700 bg-gray-800 text-gray-200 text-sm font-semibold hover:bg-gray-700 transition">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-500 text-sm">Movies Watched</p>

            <p className="text-3xl font-bold mt-2">24</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-500 text-sm">Series Watched</p>

            <p className="text-3xl font-bold mt-2">12</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-500 text-sm">Watchlist</p>

            <p className="text-3xl font-bold mt-2">18</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-500 text-sm">Favorites</p>

            <p className="text-3xl font-bold mt-2">9</p>
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 mt-6">
          <h2 className="text-xl font-bold mb-6">Account Information</h2>

          <div className="space-y-5">
            {/* Name */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-gray-800 pb-5">
              <div>
                <p className="text-gray-500 text-sm">Full Name</p>

                <p className="text-gray-200 mt-1">User Name</p>
              </div>

              <button className="text-sm text-red-500 hover:text-red-400">
                Edit
              </button>
            </div>

            {/* Email */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-gray-800 pb-5">
              <div>
                <p className="text-gray-500 text-sm">Email Address</p>

                <p className="text-gray-200 mt-1">user@example.com</p>
              </div>

              <button className="text-sm text-red-500 hover:text-red-400">
                Edit
              </button>
            </div>

            {/* Password */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <p className="text-gray-500 text-sm">Password</p>

                <p className="text-gray-200 mt-1">••••••••••</p>
              </div>

              <button className="text-sm text-red-500 hover:text-red-400">
                Change
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-gray-900 border border-red-900/40 rounded-2xl p-6 sm:p-8 mt-6 mb-10">
          <h2 className="text-xl font-bold text-red-500">Account Actions</h2>

          <p className="text-gray-500 text-sm mt-2">
            Manage your account session.
          </p>

          <button className="mt-5 px-5 py-2.5 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
