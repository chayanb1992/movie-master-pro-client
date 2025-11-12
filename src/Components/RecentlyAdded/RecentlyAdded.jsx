import React, { useEffect, useState } from "react";
import { Play, Calendar } from "lucide-react";

const RecentlyAdded = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/recently-added")
      .then((res) => res.json())
      .then((data) => {
        // Sort by newest first and pick 6
        // const latestMovies = data
        //   .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        //   .slice(0, 6);
        setMovies(data);
      })
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  return (
    <section className="bg-black text-white py-24 px-6 md:px-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-5xl md:text-6xl font-extrabold uppercase tracking-tight mb-3">
          Recently Added
        </h2>
        <p className="text-lg text-red-500 tracking-wider">
          Fresh releases added to our cinematic library
        </p>
        <div className="w-24 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {movies.map((movie, i) => (
          <div
            key={i}
            className="relative group overflow-hidden rounded-2xl shadow-lg transition-transform duration-500 hover:scale-[1.03]"
          >
            {/* Poster */}
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-[400px] object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-12 group-hover:translate-y-0 transition-all duration-500">
              <h3 className="text-xl font-bold mb-2">{movie.title}</h3>

              <div className="flex items-center gap-2 mb-3 text-gray-300">
                <Calendar className="w-5 h-5" />
                <span>{movie.releaseYear}</span>
              </div>

              <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                {movie.genre}
              </p>

              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 text-sm mx-auto transition">
                <Play className="w-4 h-4 fill-white" /> Watch Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentlyAdded;
