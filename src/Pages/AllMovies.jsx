import React, { useEffect, useState } from "react";
import {
  Star,
  Tag,
  Film,
  Globe,
  Clock,
  Monitor,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

// Helper function to get the appropriate grid span for a cinematic look
const getGridSpan = (index) => {
  // Makes the first card and every 7th card wider for a dynamic layout
  if (index === 0 || (index + 1) % 7 === 0) {
    return "md:col-span-2 md:row-span-2";
  }
  return "md:col-span-1 md:row-span-1";
};

const AllMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Mock Data Fetch to ensure the design works with structured data
    fetch("http://localhost:3000/allmovies")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  // --- Enhanced Mock Movie Structure for Metadata Display ---
  const enhancedMovies = movies.map((movie) => ({
    ...movie,
    rating: movie.rating || (Math.random() * 2 + 7).toFixed(1),
    genre: movie.genre || "Sci-Fi, Thriller",
    runtime: movie.runtime || "142 min",
    resolution: movie.resolution || "4K UHD",
    language: movie.language || "EN/Sub",
    releaseYear: movie.releaseYear || "2023",
  }));

  return (
    <div className="min-h-screen bg-gray-950 text-white py-24 px-6 md:px-16 lg:px-24">
      {/* Cinematic Header */}
      <div className="mb-16">
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none uppercase">
          Digital Library
        </h1>
        <p className="text-xl md:text-2xl text-red-500 font-extralight mt-2 border-l-4 pl-4 border-red-600">
          The full collection of films.
        </p>
      </div>

      {/* Loading State */}
      {movies.length === 0 ? (
        <p className="text-center text-gray-600 text-xl animate-pulse">
          Loading the archive...
        </p>
      ) : (
        /* Dynamic Grid Layout */
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-min gap-6 md:gap-8">
          {enhancedMovies.map((movie, i) => (
            <div
              key={i}
              className={`${getGridSpan(
                i
              )} bg-gray-900 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-red-800/60 border border-transparent`}
            >
              <Link
                to={`/movies/${movie._id}`}
                className="group block h-full relative" // Added relative for button positioning
              >
                {/* Poster Container */}
                <div className="relative w-full aspect-video md:aspect-[2/3] overflow-hidden">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-30" // Increased opacity reduction for better button contrast
                  />

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-red-600/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center text-sm font-bold shadow-lg">
                    <Star
                      size={14}
                      fill="currentColor"
                      className="text-yellow-300 mr-1"
                    />
                    {movie.rating}
                  </div>

                  {/* --- VIEW DETAILS BUTTON --- */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <button
                      type="button"
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 flex items-center space-x-2 border-2 border-red-600 hover:border-white transform translate-y-4 group-hover:translate-y-0"
                    >
                      <span>View Details</span>
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>

                {/* Details Section (Below Poster) */}
                <div className="p-4 md:p-5">
                  <h2 className="text-xl font-bold mb-2 truncate text-gray-100 group-hover:text-red-500 transition-colors duration-300">
                    {movie.title}
                  </h2>

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs font-medium text-gray-400">
                    <p className="flex items-center">
                      <Film size={14} className="mr-2 text-red-400" />
                      {movie.releaseYear}
                    </p>
                    <p className="flex items-center">
                      <Clock size={14} className="mr-2 text-red-400" />
                      {movie.runtime}
                    </p>
                    <p className="flex items-center">
                      <Monitor size={14} className="mr-2 text-red-400" />
                      {movie.resolution}
                    </p>
                    <p className="flex items-center">
                      <Globe size={14} className="mr-2 text-red-400" />
                      {movie.language}
                    </p>
                  </div>

                  {/* Genre Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {movie.genre.split(", ").map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded-full flex items-center"
                      >
                        <Tag size={10} className="mr-1 text-red-600" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllMovies;
