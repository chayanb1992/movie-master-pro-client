import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { Loader2, Trash2, Pencil, Star, Clock, Film } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MovieDetails = () => {
  const movie = useLoaderData(); // ✅ Directly use loader data
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const [deleting, setDeleting] = React.useState(false);
  console.log(movie);
  if (!movie)
    return (
      <div className="flex justify-center items-center h-screen text-gray-400 bg-gray-950">
        Movie not found.
      </div>
    );

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;

    setDeleting(true);
    try {
      const res = await fetch(
        `http://localhost:3000/delete-movie/${movie._id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        toast.success("🎬 Movie deleted successfully!");
        setTimeout(() => navigate("/my-collection"), 1500);
      } else {
        toast.error("Failed to delete movie.");
      }
    } catch {
      toast.error("Error deleting movie.");
    } finally {
      setDeleting(false);
    }
  };

  const isOwner = user?.email === movie.addedBy;

  return (
    <section className="bg-gray-950 text-white min-h-screen py-16 px-6 md:px-16">
      <ToastContainer />
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Poster */}
        <div className="relative">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full rounded-2xl shadow-2xl border border-gray-800 object-cover"
          />
          {isOwner && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
              <button
                onClick={() => navigate(`/edit-movie/${movie._id}`)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg font-medium"
              >
                <Pencil size={18} /> Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-lg font-medium"
              >
                {deleting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 size={18} />
                )}
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight text-white">
            {movie.title}
          </h1>
          <div className="flex items-center gap-4 mb-6 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>{movie.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{movie.duration} hrs</span>
            </div>
            <span>📅 {movie.releaseYear}</span>
          </div>

          <p className="text-gray-300 leading-relaxed mb-6">
            {movie.plotSummary}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-400">
            <p>
              <span className="text-red-500 font-semibold">Genre:</span>{" "}
              {movie.genre}
            </p>
            <p>
              <span className="text-red-500 font-semibold">Director:</span>{" "}
              {movie.director}
            </p>
            <p>
              <span className="text-red-500 font-semibold">Cast:</span>{" "}
              {movie.cast}
            </p>
            <p>
              <span className="text-red-500 font-semibold">Language:</span>{" "}
              {movie.language}
            </p>
            <p>
              <span className="text-red-500 font-semibold">Country:</span>{" "}
              {movie.country}
            </p>
            <p>
              <span className="text-red-500 font-semibold">Added By:</span>{" "}
              {movie.addedBy}
            </p>
          </div>

          <div className="mt-8">
            <button
              onClick={() => navigate("/all-movies")}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition"
            >
              <Film className="w-5 h-5" /> Back to Movies
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieDetails;
