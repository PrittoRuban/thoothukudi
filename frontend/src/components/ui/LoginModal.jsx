"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Login = () => {
  // Use Next.js router instead of React Router
  const router = useRouter();

  // State to prevent hydration issues
  const [isClient, setIsClient] = useState(false);

  // Login form states
  const [role, setRole] = useState("user");
  const [credentials, setCredentials] = useState({
    emailOrPhone: "",
    policeIdNumber: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Ensure component only renders on client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate inputs before submission
  const validateInputs = () => {
    if (role === "user" && !credentials.emailOrPhone) {
      setError("Please enter email or phone number");
      return false;
    }

    if (role === "admin" && !credentials.policeIdNumber) {
      setError("Please enter Police ID Number");
      return false;
    }

    if (!credentials.password) {
      setError("Please enter password");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous errors
    setError("");

    // Validate inputs
    if (!validateInputs()) {
      return;
    }

    // Set loading state
    setLoading(true);

    try {
      // Determine endpoint and payload based on role
      const endpoint =
        role === "user" ? "/auth/login/user" : "/auth/login/admin";

      const payload =
        role === "user"
          ? {
              emailOrPhone: credentials.emailOrPhone,
              password: credentials.password,
            }
          : {
              policeIdNumber: credentials.policeIdNumber,
              password: credentials.password,
            };

      // Perform login request
      const { data } = await axios.post(endpoint, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Store token securely
      if (typeof window !== "undefined") {
        sessionStorage.setItem("token", data.token);
      }

      // Navigate to dashboard
      router.push("/dashboard");
    } catch (error) {
      // Handle different types of errors
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again.";

      setError(errorMessage);
    } finally {
      // Always reset loading state
      setLoading(false);
    }
  };

  // Prevent rendering on server-side
  if (!isClient) {
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>

        {/* Role Selection */}
        <div className="mb-4">
          <label
            htmlFor="role-select"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Login as:
          </label>
          <select
            id="role-select"
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              // Reset credentials when switching roles
              setCredentials({
                emailOrPhone: "",
                policeIdNumber: "",
                password: "",
              });
            }}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm"
            role="alert"
          >
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Conditional Input Based on Role */}
          {role === "user" ? (
            <input
              type="text"
              name="emailOrPhone"
              placeholder="Email or Phone"
              value={credentials.emailOrPhone}
              onChange={handleChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              autoComplete="email"
            />
          ) : (
            <input
              type="text"
              name="policeIdNumber"
              placeholder="Police ID Number"
              value={credentials.policeIdNumber}
              onChange={handleChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          )}

          {/* Password Input */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            autoComplete="current-password"
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
