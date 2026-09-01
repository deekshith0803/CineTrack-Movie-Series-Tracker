import { useFormik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required")
        .email("Invalid email address"),

      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
          /[^\w]/,
          "Password must contain at least one special character",
        ),
    }),

    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold text-white no-underline">
            CineTrack
          </Link>

          <p className="text-gray-500 mt-2">
            Sign in to continue tracking your movies.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8">
          <h1 className="text-2xl font-bold">Welcome back</h1>

          <p className="text-gray-500 text-sm mt-2">
            Enter your account details below.
          </p>

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="mt-7 space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-3 rounded-lg bg-gray-950 border border-gray-800 text-white placeholder-gray-600 outline-none focus:border-red-600 transition"
              />

              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-300">
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs text-red-500 hover:text-red-400"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-3 pr-12 rounded-lg bg-gray-950 border border-gray-800 text-white placeholder-gray-600 outline-none focus:border-red-600 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Remember */}
            <div className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 accent-red-600" />

              <span className="text-sm text-gray-400">Remember me</span>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition active:scale-[0.98]"
            >
              Login
            </button>
          </form>

          {/* Register */}
          <div className="text-center mt-6 pt-6 border-t border-gray-800">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-red-500 hover:text-red-400 font-medium no-underline"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>

        {/* Back Home */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-sm text-gray-500 hover:text-white no-underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
