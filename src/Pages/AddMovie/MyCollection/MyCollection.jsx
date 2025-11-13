import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { Trash2, Pencil, Loader2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router";

const MyCollection = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/my-collection?email=${user.email}`
        );
        const data = await res.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
        toast.error("Failed to load your collection.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [user]);
  console.log(movies);

  // 🗑️ Delete Movie
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;

    setDeleting(id);
    try {
      const res = await fetch(`http://localhost:3000/delete-movie/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMovies((prev) => prev.filter((movie) => movie._id !== id));
        toast.success("🎬 Movie deleted successfully!");
      } else {
        toast.error("Failed to delete movie.");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Error deleting movie.");
    } finally {
      setDeleting(null);
    }
  };

  // ✏️ Edit Movie (navigate to edit page)
  //   const handleEdit = (id) => {
  //     window.location.href = `/edit-movie/${id}`;
  //   };

  return (
    <section className="bg-gray-950 text-white min-h-screen py-16 px-6 md:px-16">
      <ToastContainer />
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold mb-12 text-center text-white tracking-tight">
          🎞️ My Collection
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="animate-spin w-12 h-12 text-red-600" />
          </div>
        ) : movies.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">
            You haven’t added any movies yet.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {movies.map((movie) => (
              <div
                key={movie._id}
                className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl border border-gray-800 hover:shadow-red-900/20 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative group">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-80 object-cover group-hover:opacity-80 transition-all duration-300"
                  />

                  {/* Overlay actions */}
                  <div className="absolute bottom-4 left-0 w-full flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <Link to={`/update/${movie._id}`}>
                      <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg transition">
                        <Pencil size={18} /> Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(movie._id)}
                      disabled={deleting === movie._id}
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg transition"
                    >
                      {deleting === movie._id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 size={18} />
                      )}
                      Delete
                    </button>
                  </div>
                </div>

                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-white mb-2 line-clamp-1">
                    {movie.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {movie.plotSummary}
                  </p>
                  <div className="flex justify-center gap-4 text-sm text-gray-400">
                    <span className="bg-gray-800 px-3 py-1 rounded-full">
                      ⭐ {movie.rating.toFixed(1)}
                    </span>
                    <span className="bg-gray-800 px-3 py-1 rounded-full">
                      🎬 {movie.genre}
                    </span>
                    <span className="bg-gray-800 px-3 py-1 rounded-full">
                      📅 {movie.releaseYear}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyCollection;
