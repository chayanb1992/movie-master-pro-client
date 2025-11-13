import React, { use, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { Star, Play } from "lucide-react";
import { AuthContex } from "../AuthContex/AuthContex";

const AllMovies = () => {
  const { loading } = use(AuthContex);
  const allMovies = useLoaderData(); // ✅ get data from loader

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Beautiful Realistic Loading Spinner
  if (isLoading || !allMovies || allMovies.length === 0) {
    return (
      <section className="bg-black text-white flex flex-col justify-center items-center h-screen">
        <div className="relative w-24 h-24">
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full border-4 border-gray-800 animate-pulse"></div>
          {/* Spinning gradient ring */}
          <div className="absolute inset-0 rounded-full border-4 border-t-red-600 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        </div>
        <p className="mt-8 text-gray-300 text-xl font-medium tracking-wide animate-pulse">
          Loading cinematic universe...
        </p>
      </section>
    );
  }
  return (
    <section className="bg-black text-white py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-3">
            All Movies
          </h2>
          <p className="text-gray-400 text-lg">
            Explore the entire cinematic universe.
          </p>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {allMovies.map((movie) => (
            <div
              key={movie._id}
              className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl group transition-transform duration-500 hover:scale-[1.03]"
            >
              <img
                src={movie.posterUrl || "https://via.placeholder.com/300x450"}
                alt={movie.title}
                className="w-full h-72 sm:h-80 md:h-96 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
                <h3 className="text-xl font-bold mb-1">{movie.title}</h3>
                <div className="flex items-center text-yellow-400 mb-2">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  {movie.genre || "Action"} | {movie.releaseYear || "2024"}
                </p>
                <Link to={`/movies/${movie._id}`}>
                  <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 w-full justify-center transition">
                    <Play className="w-4 h-4 fill-white" /> Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllMovies;
