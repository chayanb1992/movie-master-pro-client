import React from "react";
import { useLoaderData } from "react-router-dom";
import { Star, Play } from "lucide-react";

const AllMovies = () => {
  const allMovies = useLoaderData(); // ✅ get data from loader

  if (!allMovies || allMovies.length === 0) {
    // show loading skeleton if empty or error
    return (
      <section className="bg-black text-white py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="bg-gray-800 rounded-2xl overflow-hidden animate-pulse h-72 sm:h-80 md:h-96"
              ></div>
            ))}
        </div>
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
                <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 w-full justify-center transition">
                  <Play className="w-4 h-4 fill-white" /> Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllMovies;
