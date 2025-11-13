import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  Loader2,
  Trash2,
  Pencil,
  Star,
  Clock,
  Play,
  BookmarkPlus,
  BookmarkCheck,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContex } from "../../AuthContex/AuthContex";

const MovieDetails = () => {
  const movie = useLoaderData();
  const navigate = useNavigate();
  const { user, loading, setLoading } = useContext(AuthContex); // ✅ also track auth loading

  const [deleting, setDeleting] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [checkedWatchlist, setCheckedWatchlist] = useState(false); // ✅ indicates check done

  const isOwner = user?.email === movie.addedBy;

  // ✅ Fetch watchlist only after user is loaded
  console.log(user?.email);
  useEffect(() => {
    if (loading) return; // wait until Firebase user is ready

    const fetchWatchlist = async () => {
      if (!user) {
        setIsWatchlisted(false);
        setCheckedWatchlist(true);
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:3000/watchlist?email=${user?.email}`
        );
        const data = await res.json();
        console.log(data);
        console.log("Fetched watchlist:", data);

        if (res.ok && Array.isArray(data.watchList)) {
          const match = data.watchList.some(
            (id) => String(id) === String(movie._id)
          );
          setIsWatchlisted(match);
        } else {
          setIsWatchlisted(false);
        }
      } catch (err) {
        console.error("Error fetching watchlist:", err);
        setIsWatchlisted(false);
      } finally {
        setCheckedWatchlist(true);
      }
    };

    fetchWatchlist();
  }, [user, loading, movie._id]);
  console.log(isWatchlisted);
  // ✅ Delete movie (owner only)
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;

    setDeleting(true);
    try {
      const res = await fetch(
        `http://localhost:3000/delete-movie/${movie._id}`,
        { method: "DELETE" }
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

  // ✅ Add to Watchlist
  const handleAddToWatchlist = async () => {
    if (!user) {
      toast.error("Please login to add to your watchlist.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/movies/addToWatchList", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          id: movie._id,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "✅ Added to watchlist!");
        setIsWatchlisted(true);
      } else {
        toast.error(data.message || "Failed to add to watchlist.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error adding to watchlist.");
    } finally {
      setLoading(false);
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
              <span>{movie.rating?.toFixed(1)}</span>
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

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition">
              <Play className="w-4 h-4 fill-white" /> Watch Now
            </button>

            <button
              onClick={handleAddToWatchlist}
              disabled={!checkedWatchlist || loading || isWatchlisted}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
                isWatchlisted
                  ? "bg-green-600 cursor-not-allowed"
                  : "bg-gray-700 hover:bg-gray-800"
              } ${!checkedWatchlist ? "opacity-70 cursor-wait" : ""}`}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : isWatchlisted ? (
                <BookmarkCheck className="w-5 h-5" />
              ) : (
                <BookmarkPlus className="w-5 h-5" />
              )}
              {!checkedWatchlist
                ? "Checking..."
                : isWatchlisted
                ? "Watchlisted ✓"
                : "Add to Watchlist"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieDetails;
