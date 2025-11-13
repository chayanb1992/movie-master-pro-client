import React, { useContext, useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router";
import { AuthContex } from "../../AuthContex/AuthContex";
import { updateProfile, sendEmailVerification } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { user, createAccount, signWithGoogle } = useContext(AuthContex);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [error, setError] = useState("");

  // Handle registration
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;
    if (!regex.test(password)) {
      setError(
        "Password must include uppercase, lowercase, number, and special character."
      );
      return;
    }

    if (!terms) {
      setError("You must accept the Terms & Conditions.");
      return;
    }

    try {
      const result = await createAccount(email, password);
      await updateProfile(result.user, { displayName: name, photoURL: image });
      await sendEmailVerification(result.user);

      toast.success("Account created! Please verify your email.");
      setName("");
      setImage("");
      setEmail("");
      setPassword("");
      setTerms(false);
      navigate("/login");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  // Google registration
  const handleGoogleLogin = async () => {
    try {
      await signWithGoogle();
      navigate("/");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Create an Account
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        <form onSubmit={handleOnSubmit} className="space-y-4">
          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary"
          />

          {/* Profile Image */}
          <input
            type="text"
            placeholder="Profile Image URL (optional)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={passwordShow ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <button
              type="button"
              onClick={() => setPasswordShow(!passwordShow)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-200"
            >
              {passwordShow ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Terms */}
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <input
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              className="checkbox checkbox-sm border-gray-600"
            />
            <p>
              I accept the{" "}
              <a href="#" className="text-secondary hover:underline">
                Terms & Conditions
              </a>
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-secondary text-white py-2 rounded-lg hover:bg-secondary/80 transition"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="px-3 text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 bg-white text-black font-medium py-2 rounded-lg hover:bg-gray-200 transition"
        >
          <FcGoogle size={22} /> Register with Google
        </button>

        {/* Login Link */}
        <p className="text-center text-gray-400 mt-6 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-secondary hover:underline">
            Login
          </a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterForm;
