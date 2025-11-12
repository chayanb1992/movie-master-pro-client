import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddMovie = () => {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    releaseYear: "",
    rating: "",
    posterUrl: "",
    section: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/add-movie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Movie added successfully!");
        setFormData({
          title: "",
          genre: "",
          releaseYear: "",
          rating: "",
          posterUrl: "",
          section: "",
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
      <div className="max-w-3xl mx-auto bg-gray-800 p-10 rounded-3xl shadow-2xl">
        <h2 className="text-4xl font-bold mb-6 text-center">Add New Movie</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Title */}
          <div>
            <label className="block mb-2 font-semibold">Movie Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          {/* Genre */}
          <div>
            <label className="block mb-2 font-semibold">Genre</label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              placeholder="Action, Drama, Comedy..."
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          {/* Release Year */}
          <div>
            <label className="block mb-2 font-semibold">Release Year</label>
            <input
              type="number"
              name="releaseYear"
              value={formData.releaseYear}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block mb-2 font-semibold">Rating</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              placeholder="0 to 10"
              min="0"
              max="10"
              step="0.1"
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          {/* Poster URL */}
          <div>
            <label className="block mb-2 font-semibold">Poster URL</label>
            <input
              type="url"
              name="posterUrl"
              value={formData.posterUrl}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            {formData.posterUrl && (
              <img
                src={formData.posterUrl}
                alt="Poster Preview"
                className="mt-3 w-40 h-56 object-cover rounded-lg border border-gray-600"
              />
            )}
          </div>

          {/* Section */}
          <div>
            <label className="block mb-2 font-semibold">Section</label>
            <select
              name="section"
              value={formData.section}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="">Select Section</option>
              <option value="hero">Hero</option>
              <option value="top-rated">Top Rated</option>
              <option value="recently-added">Recently Added</option>
              <option value="trending">Trending</option>
            </select>
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

export default AddMovie;
