import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLoaderData } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth } from "firebase/auth";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const loaderData = useLoaderData(); // ✅ movie data from loader
  const auth = getAuth();
  const user = auth.currentUser;

  const [movie, setMovie] = useState(loaderData || {});
  const [updating, setUpdating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentMovie, setCurrentMovie] = useState();
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `https://movie-master-pro-client-server.vercel.app/movies/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch movie");
        const data = await res.json();
        setMovie(data); // save movie data in state
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);
  //   console.log(currentMovie);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    const payload = {
      ...movie,
      releaseYear: parseFloat(movie.releaseYear),
      rating: parseFloat(movie.rating),
      duration: parseFloat(movie.duration),
    };
    try {
      const res = await fetch(
        `https://movie-master-pro-client-server.vercel.app/update/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        toast.success("🎬 Movie updated successfully!");
        setTimeout(() => navigate(`/my-collection`), 1500);
      } else {
        toast.error("Failed to update movie.");
      }
    } catch (err) {
      toast.error("Error updating movie.");
    } finally {
      setUpdating(false);
    }
  };

  if (!movie)
    return (
      <div className="flex justify-center items-center h-screen text-gray-400 bg-gray-950">
        Movie not found.
      </div>
    );

  return (
    <section className="bg-gray-950 text-white min-h-screen py-16 px-6 md:px-16">
      <ToastContainer />
      <div className="max-w-3xl mx-auto bg-gray-900 rounded-2xl shadow-xl border border-gray-800 p-8">
        <h1 className="text-4xl font-bold text-center text-white mb-10">
          ✏️ Edit Movie
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-semibold">Title</label>
              <input
                type="text"
                name="title"
                value={movie.title || ""}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 rounded-lg p-3 outline-none border border-gray-700 focus:border-red-600"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Genre</label>
              <input
                type="text"
                name="genre"
                value={movie.genre || ""}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 rounded-lg p-3 outline-none border border-gray-700 focus:border-red-600"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Release Year</label>
              <input
                type="number"
                name="releaseYear"
                value={movie.releaseYear || ""}
                onChange={handleChange}
                step="0.1"
                required
                className="w-full bg-gray-800 rounded-lg p-3 outline-none border border-gray-700 focus:border-red-600"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Rating</label>
              <input
                type="number"
                name="rating"
                value={movie.rating || ""}
                onChange={handleChange}
                step="0.1"
                min="0"
                max="10"
                required
                className="w-full bg-gray-800 rounded-lg p-3 outline-none border border-gray-700 focus:border-red-600"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Duration (hrs)</label>
              <input
                type="number"
                name="duration"
                value={movie.duration || ""}
                onChange={handleChange}
                step="0.1"
                required
                className="w-full bg-gray-800 rounded-lg p-3 outline-none border border-gray-700 focus:border-red-600"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Director</label>
              <input
                type="text"
                name="director"
                value={movie.director || ""}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 rounded-lg p-3 outline-none border border-gray-700 focus:border-red-600"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Cast</label>
              <input
                type="text"
                name="cast"
                value={movie.cast || ""}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 rounded-lg p-3 outline-none border border-gray-700 focus:border-red-600"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Language</label>
              <input
                type="text"
                name="language"
                value={movie.language || ""}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 rounded-lg p-3 outline-none border border-gray-700 focus:border-red-600"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Country</label>
              <input
                type="text"
                name="country"
                value={movie.country || ""}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 rounded-lg p-3 outline-none border border-gray-700 focus:border-red-600"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-semibold">Poster URL</label>
              <input
                type="text"
                name="posterUrl"
                value={movie.posterUrl || ""}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 rounded-lg p-3 outline-none border border-gray-700 focus:border-red-600"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-semibold">Plot Summary</label>
              <textarea
                name="plotSummary"
                value={movie.plotSummary || ""}
                onChange={handleChange}
                rows="4"
                required
                className="w-full bg-gray-800 rounded-lg p-3 outline-none border border-gray-700 focus:border-red-600 resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block mb-2 font-semibold">Added By</label>
              <input
                type="email"
                name="addedBy"
                value={user.email || ""}
                disabled
                className="w-full bg-gray-800 rounded-lg p-3 outline-none border border-gray-700 text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <button
              type="submit"
              disabled={updating}
              className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg text-lg font-semibold transition flex items-center gap-2"
            >
              {updating && <Loader2 className="w-5 h-5 animate-spin" />}
              {updating ? "Updating..." : "Update Movie"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Update;
