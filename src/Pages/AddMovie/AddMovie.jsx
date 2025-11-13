import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth } from "firebase/auth";

const AddMovie = () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    releaseYear: "",
    director: "",
    cast: "",
    rating: "",
    duration: "",
    plotSummary: "",
    posterUrl: "",
    language: "",
    country: "",
    addedBy: currentUser?.email || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...formData,
      releaseYear: parseFloat(formData.releaseYear),
      rating: parseFloat(formData.rating),
      duration: parseFloat(formData.duration),
    };
    try {
      const res = await fetch("http://localhost:3000/movies/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Movie added successfully!");
        setFormData({
          title: "",
          genre: "",
          releaseYear: "",
          director: "",
          cast: "",
          rating: "",
          duration: "",
          plotSummary: "",
          posterUrl: "",
          language: "",
          country: "",
          addedBy: currentUser?.email || "",
        });
      } else {
        toast.error(data.message || "Failed to add movie.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-900 text-white py-16 px-6 md:px-16 min-h-screen">
      <ToastContainer />
      <div className="max-w-4xl mx-auto bg-gray-800 p-10 rounded-3xl shadow-2xl">
        <h2 className="text-4xl font-bold mb-6 text-center">Add New Movie</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <InputField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
              <InputField
                label="Genre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                placeholder="Action, Drama, Comedy..."
              />
              <InputField
                label="Release Year"
                name="releaseYear"
                type="number"
                value={formData.releaseYear}
                onChange={handleChange}
              />
              <InputField
                label="Director"
                name="director"
                value={formData.director}
                onChange={handleChange}
              />
              <InputField
                label="Cast"
                name="cast"
                value={formData.cast}
                onChange={handleChange}
                placeholder="Actor1, Actor2, Actor3"
              />
              <InputField
                label="Rating"
                name="rating"
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={formData.rating}
                onChange={handleChange}
              />
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <InputField
                label="Duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="148"
              />
              <InputField
                label="Language"
                name="language"
                value={formData.language}
                onChange={handleChange}
              />
              <InputField
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
              <InputField
                label="Poster URL"
                name="posterUrl"
                value={formData.posterUrl}
                onChange={handleChange}
              />
              <TextareaField
                label="Plot Summary"
                name="plotSummary"
                value={formData.plotSummary}
                onChange={handleChange}
                rows={5}
              />
              <InputField
                label="Added By"
                name="addedBy"
                value={formData.addedBy}
                disabled
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-lg font-bold text-white flex justify-center items-center gap-2"
          >
            {loading ? "Adding..." : "Add Movie"}
          </button>
        </form>
      </div>
    </section>
  );
};

// Reusable Input Field
const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  disabled = false,
  ...rest
}) => (
  <div>
    <label className="block mb-2 font-semibold">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      required={!disabled}
      className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
      {...rest}
    />
  </div>
);

// Reusable Textarea Field
const TextareaField = ({ label, name, value, onChange, rows = 3 }) => (
  <div>
    <label className="block mb-2 font-semibold">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      required
      className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600 resize-none"
    ></textarea>
  </div>
);

export default AddMovie;
