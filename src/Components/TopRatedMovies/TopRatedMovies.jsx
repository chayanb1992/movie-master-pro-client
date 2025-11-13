import React, { useEffect, useState } from "react";
import { Star, Play } from "lucide-react";

const TopRatedMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://movie-master-pro-client-server.vercel.app/top-rated")
      .then((res) => res.json())
      .then((data) => {
        // Sort by rating and get top 5
        // const topFive = data.sort((a, b) => b.rating - a.rating).slice(0, 5);
        setMovies(data);
      })
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  return (
    <section className="bg-black text-white py-20 px-6 md:px-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-5xl md:text-6xl font-extrabold uppercase tracking-tight mb-3">
          Top Rated Movies
        </h2>
        <p className="text-lg text-red-500 tracking-wider">
          Discover the audience’s most loved films
        </p>
        <div className="w-24 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Movie Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
        {movies.map((movie, i) => (
          <div
            key={i}
            className="relative group overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:scale-[1.05]"
          >
            {/* Poster */}
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-[420px] object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Movie Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-12 group-hover:translate-y-0 transition-all duration-500">
              <h3 className="text-xl font-bold mb-2">{movie.title}</h3>

              <div className="flex items-center gap-2 mb-3">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="text-gray-300 font-medium">
                  {movie.rating.toFixed(1)} / 10
                </span>
              </div>

              <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                {movie.genre} • {movie.releaseYear}
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

export default TopRatedMovies;
