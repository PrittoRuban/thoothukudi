// app/auth/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AuthPage() {
  const router = useRouter();

  // State to prevent hydration issues
  const [isClient, setIsClient] = useState(false);

  // State to toggle between login and registration
  const [isLogin, setIsLogin] = useState(true);

  // Role and form states
  const [role, setRole] = useState("user");
  const [credentials, setCredentials] = useState({
    phoneNumber: "",
    email: "",
    policeIdNumber: "",
    policeIdImage: null,
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
    const { name, value, files } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Validate inputs before submission
  const validateInputs = () => {
    if (isLogin) {
      if (role === "user" && !credentials.email) {
        setError("Please enter email");
        return false;
      }
      if (role === "admin" && !credentials.policeIdNumber) {
        setError("Please enter Police ID Number");
        return false;
      }
    } else {
      if (!credentials.phoneNumber) {
        setError("Please enter phone number");
        return false;
      }
      if (role === "user" && !credentials.email) {
        setError("Please enter email");
        return false;
      }
      if (role === "admin" && !credentials.policeIdNumber) {
        setError("Please enter Police ID Number");
        return false;
      }
      if (role === "admin" && !credentials.policeIdImage) {
        setError("Please upload Police ID Image");
        return false;
      }
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
      if (isLogin) {
        // Handle login
        const endpoint =
          role === "user" ? "/api/auth/login/user" : "/api/auth/login/admin";
        const payload =
          role === "user"
            ? { email: credentials.email, password: credentials.password }
            : {
                policeIdNumber: credentials.policeIdNumber,
                password: credentials.password,
              };

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
      } else {
        // Handle registration
        const formData = new FormData();
        formData.append("role", role);
        formData.append("phoneNumber", credentials.phoneNumber);
        formData.append("password", credentials.password);
        if (role === "user") {
          formData.append("email", credentials.email);
        } else {
          formData.append("policeIdNumber", credentials.policeIdNumber);
          formData.append("policeIdImage", credentials.policeIdImage);
        }

        const { data } = await axios.post("/api/auth/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Registration successful! Please log in.");
        setIsLogin(true); // Switch to login form after successful registration
        setCredentials({
          phoneNumber: "",
          email: "",
          policeIdNumber: "",
          policeIdImage: null,
          password: "",
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        (isLogin
          ? "Login failed. Please try again."
          : "Registration failed. Please try again.");
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Prevent rendering on server-side
  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          {isLogin ? "Login" : "Register"}
        </h2>

        {/* Toggle between Login and Register */}
        <div className="mb-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            {isLogin
              ? "Need an account? Register"
              : "Already have an account? Login"}
          </button>
        </div>

        {/* Role Selection */}
        <div className="mb-6">
          <label
            htmlFor="role-select"
            className="block mb-2 text-sm font-medium text-gray-300"
          >
            {isLogin ? "Login as:" : "Register as:"}
          </label>
          <select
            id="role-select"
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              setCredentials({
                phoneNumber: "",
                email: "",
                policeIdNumber: "",
                policeIdImage: null,
                password: "",
              });
            }}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className="mb-6 p-3 bg-red-900 border border-red-700 text-red-200 rounded-md text-sm"
            role="alert"
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Phone Number (only for registration) */}
          {!isLogin && (
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={credentials.phoneNumber}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          )}

          {/* Conditional Input Based on Role */}
          {role === "user" ? (
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={credentials.email}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                autoComplete="email"
              />
            </div>
          ) : (
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Police ID Number
              </label>
              <input
                type="text"
                name="policeIdNumber"
                placeholder="Police ID Number"
                value={credentials.policeIdNumber}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          )}

          {/* Police ID Image (only for admin registration) */}
          {!isLogin && role === "admin" && (
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Police ID Image
              </label>
              <input
                type="file"
                name="policeIdImage"
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          )}

          {/* Password Input */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
              autoComplete="current-password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? isLogin
                ? "Logging in..."
                : "Registering..."
              : isLogin
              ? "Login"
              : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
