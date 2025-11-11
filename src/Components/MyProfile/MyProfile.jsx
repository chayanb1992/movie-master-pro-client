import React, { createContext, useContext, useState, use } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AuthContex } from "../../AuthContex/AuthContex";
// NOTE: The external import below caused a file resolution error.
// import { AuthContex } from "../../AuthContex/AuthContex";
// We will use a mock context created directly in this file for demonstration purposes.

// --- MOCK AUTH CONTEXT SETUP (Replaces external import) ---

// 1. Create a dummy AuthContext
// 2. Custom hook to handle potential 'use' hook issue if environment doesn't support it (defaulting to useContext)
// -----------------------------------------------------------

// Define accent colors for consistency with the dark theme and new logo color
const ACCENT_COLOR_CLASS = "bg-primary hover:bg-red-500";
const TEXT_ACCENT_CLASS = "text-white";
const RING_ACCENT_CLASS = "focus:ring-red-500";

const MyProfile = () => {
  // Access context data using the custom hook
  const { user, logOut, loading, updateUserProfile } = useContext(AuthContex);

  const [isEditing, setIsEditing] = useState(false);

  // Initialize state with current user data
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  const [message, setMessage] = useState("");

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <p className="text-lg font-semibold text-gray-400">Loading...</p>
      </div>
    );
  }

  const handleSave = (e) => {
    e.preventDefault();

    // Assuming updateUserProfile returns a Promise
    updateUserProfile(name, photoURL)
      .then(() => {
        setIsEditing(false);
        // Success Toast
        toast.success("Profile Updated Successfully! ❤️", {
          position: "bottom-right",
          autoClose: 3000,
          theme: "dark",
        });
        // Clear local message after delay
        setMessage("Profile updated successfully!");
        setTimeout(() => setMessage(""), 3000);
      })
      .catch((error) => {
        console.error("Profile update failed:", error);
        toast.error("Failed to update profile. Please try again.");
      });
  };

  return (
    // Background: Solid Black
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      {/* Dark Profile Card with Red Accent Shadow */}
      <div className="bg-gray-900 rounded-2xl shadow-2xl shadow-red-500/30 p-8 w-full max-w-md border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-[#a7988b] mb-6">
          My Profile
        </h2>

        <div className="flex flex-col items-center mb-6">
          <img
            // Fallback placeholder uses a dark background
            src={user && user.photoURL}
            alt="Profile"
            // Red border for visual pop
            className="w-24 h-24 rounded-full border-2 border-grey-300 object-cover mb-3 shadow-lg"
          />
          <h3 className="text-xl font-semibold text-white">
            {user && user.displayName}
          </h3>
          <p className={`text-sm ${TEXT_ACCENT_CLASS}`}>{user?.email}</p>
        </div>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            // Primary button with Red accent
            className={`w-full py-3 rounded-lg font-semibold text-white transition duration-300 shadow-md ${ACCENT_COLOR_CLASS}`}
          >
            Edit Profile
          </button>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              {/* Label Text Color */}
              <label className="block text-gray-300 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                defaultValue={user.displayName}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                // Dark input field, light text, Red focus ring
                className={`w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 ${RING_ACCENT_CLASS} focus:border-transparent`}
              />
            </div>

            <div>
              {/* Label Text Color */}
              <label className="block text-gray-300 font-medium mb-1">
                Profile Image URL
              </label>
              <input
                type="text"
                name="url"
                defaultValue={user.photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="Enter image URL"
                // Dark input field, light text, Red focus ring
                className={`w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 ${RING_ACCENT_CLASS} focus:border-transparent`}
              />
            </div>

            <div className="flex justify-between gap-3 pt-4">
              {/* Save Button with Red accent */}
              <button
                type="submit"
                className={`flex-1 py-3 font-semibold text-white rounded-lg transition duration-300 shadow-md ${ACCENT_COLOR_CLASS}`}
              >
                Save Changes
              </button>
              {/* Cancel Button (Dark outline) */}
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 py-3 border border-gray-600 text-gray-300 hover:bg-gray-700 font-semibold rounded-lg transition duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Success Message Text Color */}
        {message && <p className="text-red-400 text-center mt-4">{message}</p>}
      </div>

      {/* ToastContainer for notifications */}
      <ToastContainer theme="dark" position="bottom-right" />
    </div>
  );
};

export default MyProfile;
