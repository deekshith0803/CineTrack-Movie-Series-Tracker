import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getUsers, saveUser } from "../../../utils/authStorage";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .max(30, "Name must not exceed 30 characters")
        .required("Full name is required"),
      email: Yup.string()
        .email("Please enter a valid email address")
        .required("Email is required"),
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
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please confirm your password"),
      terms: Yup.boolean().oneOf(
        [true],
        "You must agree to the terms and conditions",
      ),
    }),
    onSubmit: (values, { setFieldError }) => {
      const users = getUsers();

      const userExists = users.some(
        (user) => user.email.toLowerCase() === values.email.toLowerCase(),
      );

      if (userExists) {
        setFieldError("email", "An account with this email already exists");
        return;
      }

      saveUser(values);

      console.log("User registered:", values);

      navigate("/login");
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
            Create your account and start tracking.
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8">
          <h1 className="text-2xl font-bold">Create account</h1>

          <p className="text-gray-500 text-sm mt-2">
            Enter your details to get started.
          </p>

          <form onSubmit={formik.handleSubmit} className="mt-7 space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-3 rounded-lg bg-gray-950 border border-gray-800 text-white placeholder-gray-600 outline-none focus:border-red-600 transition"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.name}
                </p>
              )}
            </div>

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
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-3 pr-16 rounded-lg bg-gray-950 border border-gray-800 text-white placeholder-gray-600 outline-none focus:border-red-600 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-sm"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.password}
                  </p>
                )}
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-3 pr-16 rounded-lg bg-gray-950 border border-gray-800 text-white placeholder-gray-600 outline-none focus:border-red-600 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-sm"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                name="terms"
                checked={formik.values.terms}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-4 h-4 mt-1 accent-red-600"
              />

              <p className="text-sm text-gray-500">
                I agree to the terms and conditions.
              </p>
            </div>
            {formik.touched.terms && formik.errors.terms && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.terms}</p>
            )}

            {/* Register */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition active:scale-[0.98]"
            >
              Create Account
            </button>
          </form>

          {/* Login */}
          <div className="text-center mt-6 pt-6 border-t border-gray-800">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-red-500 hover:text-red-400 font-medium no-underline"
              >
                Login
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

export default Register;
