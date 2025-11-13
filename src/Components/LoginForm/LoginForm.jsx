import React, { use, useContext, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, useLocation } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContex } from "../../AuthContex/AuthContex";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../Firebase/Firebase.init";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login, signWithGoogle, passwordReset } = use(AuthContex);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);

  // Handle normal login
  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      await login(email, password);
      toast.success("Login successful!");
      const redirectPath = location.state?.from || "/";
      navigate(redirectPath);
    } catch (err) {
      toast.error(err.message || "Login failed!");
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    try {
      await signWithGoogle();
      toast.success("Logged in with Google!");
      const redirectPath = location.state?.from || "/";
      navigate(redirectPath);
    } catch (err) {
      toast.error(err.message || "Google login failed!");
    }
  };

  // Forgot password
  const handleForgotPassword = async () => {
    if (!email) {
      toast.warning("Please enter your email first!");
      return;
    }

    try {
      await passwordReset(email);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (err) {
      toast.error(err.message || "Failed to send reset email.");
    }
  };

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

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-secondary hover:underline"
            >
              Forgot Password?
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

      {/* Toast Container */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default LoginForm;
