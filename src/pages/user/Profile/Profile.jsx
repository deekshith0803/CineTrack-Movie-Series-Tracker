import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { logout, updateUser } from "../../../redux/slices/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth?.user);
  const watchlist = useSelector((state) => state.watchlist?.items || []);
  const favorites = useSelector((state) => state.favorites?.items || []);
  const watching = useSelector((state) => state.watching?.items || []);

  const [isEditing, setIsEditing] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(3).max(30).required("Full name is required"),
      email: Yup.string().email().required("Email address is required"),
    }),
    onSubmit: (values) => {
      const updated = { name: values.name.trim(), email: values.email.trim() };
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = users.map((u) => (u.email === user?.email ? { ...u, ...updated } : u));
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      dispatch(updateUser(updated));
      setIsEditing(false);
    },
  });

  const moviesWatchedCount = watching.filter((i) => i.type === "Movie" || (!i.type && !i.first_air_date)).length;
  const seriesWatchedCount = watching.filter((i) => i.type === "Series" || i.first_air_date).length;

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="min-h-screen overflow-y-auto bg-gray-950 text-white px-5 sm:px-8 lg:px-12 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">My Profile</h1>
          <p className="text-gray-500 mt-2">Manage your account and track your activity.</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-red-600 flex items-center justify-center shrink-0">
              <span className="text-3xl font-bold">{initial}</span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{user?.name || "User Name"}</h2>
              <p className="text-gray-500 mt-1">{user?.email || "user@example.com"}</p>
              <p className="text-gray-600 text-sm mt-2">CineTrack Member</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-500 text-sm">Movies Watched</p>
            <p className="text-3xl font-bold mt-2">{moviesWatchedCount}</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-500 text-sm">Series Watched</p>
            <p className="text-3xl font-bold mt-2">{seriesWatchedCount}</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-500 text-sm">Watchlist</p>
            <p className="text-3xl font-bold mt-2">{watchlist.length}</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-500 text-sm">Favorites</p>
            <p className="text-3xl font-bold mt-2">{favorites.length}</p>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 mt-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Account Details</h2>
            {!isEditing && (
              <button
                onClick={() => {
                  formik.resetForm();
                  setIsEditing(true);
                }}
                className="text-sm px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-red-500 font-semibold cursor-pointer"
              >
                Edit
              </button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-2.5 rounded-lg bg-gray-950 border border-gray-800 text-white outline-none focus:border-red-600 text-sm"
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-2.5 rounded-lg bg-gray-950 border border-gray-800 text-white outline-none focus:border-red-600 text-sm"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold cursor-pointer"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    formik.resetForm();
                    setIsEditing(false);
                  }}
                  className="px-5 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-5">
              <div className="border-b border-gray-800 pb-4">
                <p className="text-gray-500 text-sm">Full Name</p>
                <p className="text-gray-200 mt-1 font-medium">{user?.name || "N/A"}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Email Address</p>
                <p className="text-gray-200 mt-1 font-medium">{user?.email || "N/A"}</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-900 border border-red-900/40 rounded-2xl p-6 sm:p-8 mt-6 mb-10">
          <h2 className="text-xl font-bold text-red-500">Account Actions</h2>
          <p className="text-gray-500 text-sm mt-2">Manage your account session.</p>

          <button
            onClick={() => {
              dispatch(logout());
              navigate("/login");
            }}
            className="mt-5 px-5 py-2.5 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
