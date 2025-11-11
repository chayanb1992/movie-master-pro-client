// src/components/LoginForm.jsx
import React, { useContext, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, useLocation } from "react-router";
import { AuthContex } from "../../AuthContex/AuthContex";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login, signWithGoogle } = useContext(AuthContex);

  // Local states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);

  // Handle normal login
  const handleOnSubmit = (event) => {
    event.preventDefault();
    setError("");

    login(email, password)
      .then(() => {
        // Redirect if login successful
        const redirectPath = location.state?.from || "/";
        navigate(redirectPath);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  // Google login
  const handleGoogleLogin = () => {
    signWithGoogle()
      .then(() => {
        const redirectPath = location.state?.from || "/";
        navigate(redirectPath);
      })
      .catch((err) => setError(err.message));
  };
  console.log(user);

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        <form onSubmit={handleOnSubmit} className="space-y-4">
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={passwordShow ? "text" : "password"}
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <button
              type="button"
              onClick={() => setPasswordShow(!passwordShow)}
              className="absolute right-3 top-2 text-gray-400 hover:text-gray-200"
            >
              {passwordShow ? "Hide" : "Show"}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-secondary text-white py-2 rounded-lg hover:bg-secondary/80 transition"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="px-3 text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        {/* Google login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 bg-white text-black font-medium py-2 rounded-lg hover:bg-gray-200 transition"
        >
          <FcGoogle size={22} />
          Login with Google
        </button>

        {/* Register */}
        <p className="text-center text-gray-400 mt-6 text-sm">
          Don’t have an account?{" "}
          <a href="/register" className="text-secondary hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
