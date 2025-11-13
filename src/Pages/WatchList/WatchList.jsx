import React, { useContext, useEffect, useState } from "react";
import { AuthContex } from "../../AuthContex/AuthContex";
import { useNavigate } from "react-router-dom";
import { Loader2, Trash2, Star, Clock } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Watchlist = () => {
  const { user, loading: authLoading } = useContext(AuthContex);
  const [watchlist, setWatchlist] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading) return;

    const fetchWatchlist = async () => {
      if (!user) {
        setWatchlist([]);
        setFetching(false);
        return;
      }

      try {
        // 1️⃣ Get watchlist IDs
        const res = await fetch(
          `http://localhost:3000/watchlist?email=${user.email}`
        );
        const data = await res.json();

        if (
          res.ok &&
          Array.isArray(data.watchList) &&
          data.watchList.length > 0
        ) {
          // 2️⃣ Fetch full movie data for each ID
          const moviePromises = data.watchList.map((id) =>
            fetch(`http://localhost:3000/movies/${id}`).then((res) =>
              res.json()
            )
          );
          const movies = await Promise.all(moviePromises);
          setWatchlist(movies);
        } else {
          setWatchlist([]);
        }
      } catch (err) {
        console.error("Error fetching watchlist:", err);
        toast.error("Failed to load watchlist");
      } finally {
        setFetching(false);
      }
    };

    fetchWatchlist();
  }, [user, authLoading]);

  const handleRemove = async (movieId) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3000/movies/removeFromWatchList`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email, id: movieId }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Removed from watchlist");
        setWatchlist((prev) => prev.filter((movie) => movie._id !== movieId));
      } else {
        toast.error(data.message || "Failed to remove from watchlist");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-screen text-white bg-gray-950">
        <Loader2 className="w-8 h-8 animate-spin" /> Loading watchlist...
      </div>
    );
  }

  if (!watchlist.length) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-400 bg-gray-950">
        Your watchlist is empty.
      </div>
    );
  }

  return (
    <section className="bg-gray-950 text-white min-h-screen py-16 px-6 md:px-16">
      <ToastContainer />
      <h1 className="text-4xl font-bold mb-8">My Watchlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {watchlist.map((movie) => (
          <div
            key={movie._id}
            className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-800"
          >
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-72 object-cover cursor-pointer"
              onClick={() => navigate(`/movie/${movie._id}`)}
            />
            <div className="p-4 flex flex-col gap-2">
              <h2 className="text-xl font-semibold">{movie.title}</h2>
              <div className="flex gap-4 text-gray-400 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>{movie.rating?.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{movie.duration} hrs</span>
                </div>
              </div>
              <button
                onClick={() => handleRemove(movie._id)}
                disabled={loading}
                className="mt-2 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Watchlist;
