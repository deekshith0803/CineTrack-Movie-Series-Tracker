import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [movieCount, setMovieCount] = useState(0);
  const [seriesCount, setSeriesCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [movieResponse, seriesResponse] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&page=1`,
          ),
          fetch(
            `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&page=1`,
          ),
        ]);

        if (!movieResponse.ok || !seriesResponse.ok) {
          throw new Error("Failed to fetch TMDB data");
        }

        const movieData = await movieResponse.json();
        const seriesData = await seriesResponse.json();

        setMovieCount(movieData.total_results || 0);
        setSeriesCount(seriesData.total_results || 0);

        const savedUsers = JSON.parse(
          localStorage.getItem("users") || "[]",
        );

        setUsers(savedUsers);
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-950 text-white p-5 sm:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-red-500 text-sm font-semibold uppercase tracking-wider">
                CineTrack Admin
              </p>

              <h1 className="text-3xl sm:text-4xl font-bold mt-2">
                Dashboard
              </h1>

              <p className="text-gray-500 mt-2">
                Overview of your CineTrack platform.
              </p>
            </div>

            {/* TMDB Status */}
            <div className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-800">
              <span className="text-xs text-gray-500">
                TMDB Status
              </span>

              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`w-2 h-2 rounded-full ${loading ? "bg-yellow-500" : "bg-green-500"
                    }`}
                />

                <span className="text-sm text-gray-300">
                  {loading ? "Connecting..." : "Connected"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">

          {/* Total Users */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm">
                  Total Users
                </p>

                <h2 className="text-4xl font-bold mt-3">
                  {users.length.toLocaleString()}
                </h2>
              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 text-xl">
                👥
              </div>
            </div>

            <p className="text-xs text-gray-600 mt-5">
              Registered CineTrack users
            </p>
          </div>

          {/* Total Movies */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm">
                  Total Movies
                </p>

                <h2 className="text-4xl font-bold mt-3">
                  {loading ? "..." : movieCount.toLocaleString()}
                </h2>
              </div>

              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 text-xl">
                🎬
              </div>
            </div>

            <p className="text-xs text-gray-600 mt-5">
              Movies available through TMDB
            </p>
          </div>

          {/* Total Series */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm">
                  Total Series
                </p>

                <h2 className="text-4xl font-bold mt-3">
                  {loading ? "..." : seriesCount.toLocaleString()}
                </h2>
              </div>

              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 text-xl">
                📺
              </div>
            </div>

            <p className="text-xs text-gray-600 mt-5">
              TV series available through TMDB
            </p>
          </div>
        </div>

        {/* Registered Users */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">

          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-gray-800">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

              <div>
                <h2 className="text-xl font-bold">
                  Registered Users
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  Manage users registered on CineTrack.
                </p>
              </div>

              <div className="px-3 py-1.5 rounded-lg bg-gray-950 border border-gray-800">
                <span className="text-sm text-gray-400">
                  {users.length} users
                </span>
              </div>

            </div>
          </div>

          {/* Empty State */}
          {users.length === 0 ? (
            <div className="py-16 text-center">
              <div className="text-4xl mb-4">
                👤
              </div>

              <p className="text-gray-400 font-medium">
                No registered users
              </p>

              <p className="text-gray-600 text-sm mt-1">
                Users will appear here after registration.
              </p>
            </div>
          ) : (
            /* Users Table */
            <div className="overflow-x-auto">
              <table className="w-full text-left">

                <thead>
                  <tr className="bg-gray-950/70">

                    <th className="px-5 sm:px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      #
                    </th>

                    <th className="px-5 sm:px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      User
                    </th>

                    <th className="px-5 sm:px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Email
                    </th>

                    <th className="px-5 sm:px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Role
                    </th>

                  </tr>
                </thead>

                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={user.email}
                      className="border-t border-gray-800 hover:bg-gray-800/40 transition"
                    >

                      {/* Number */}
                      <td className="px-5 sm:px-6 py-4 text-gray-600 text-sm">
                        {String(index + 1).padStart(2, "0")}
                      </td>

                      {/* User */}
                      <td className="px-5 sm:px-6 py-4">
                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 shrink-0 rounded-full bg-gray-800 flex items-center justify-center text-sm font-semibold text-gray-300">
                            {user.name?.charAt(0)?.toUpperCase() || "U"}
                          </div>

                          <div className="min-w-0">
                            <p className="font-medium text-white truncate">
                              {user.name}
                            </p>

                            <p className="text-xs text-gray-600">
                              CineTrack User
                            </p>
                          </div>

                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-5 sm:px-6 py-4 text-gray-400 text-sm">
                        {user.email}
                      </td>

                      {/* Role */}
                      <td className="px-5 sm:px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${user.role === "admin"
                              ? "bg-red-500/10 text-red-400"
                              : "bg-gray-800 text-gray-400"
                            }`}
                        >
                          {user.role || "user"}
                        </span>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Dashboard;