import React, { useEffect, useState } from "react";
import { Film } from "lucide-react";

const Genres = () => {
  const [genreData, setGenreData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/genres")
      .then((res) => res.json())
      .then((data) => {
        setGenreData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching genres:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="bg-black text-white py-24 flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-t-transparent border-red-600 rounded-full animate-spin"></div>
          <p className="text-gray-400">Loading genres...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-black text-white py-24 px-6 md:px-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-5xl md:text-6xl font-extrabold uppercase tracking-tight mb-3">
          Explore Genres
        </h2>
        <p className="text-lg text-red-500 tracking-wider">
          Find movies by your favorite genre
        </p>
        <div className="w-24 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Genre Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {genreData.map((genre, i) => (
          <div
            key={i}
            className="relative group rounded-xl overflow-hidden shadow-lg transition-transform duration-500 hover:scale-[1.05] cursor-pointer"
          >
            {/* Card Background */}
            <img
              src={genre.posterUrl || "https://via.placeholder.com/300x200"}
              alt={genre.name}
              className="h-40 w-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center">
              <h3 className="text-white text-2xl font-bold">{genre.name}</h3>
              <p className="text-gray-300 mt-2">{genre.count} Movies</p>
            </div>

            {/* Bottom label */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-sm font-semibold px-3 py-1 flex items-center justify-between">
              <span>{genre.name}</span>
              <Film className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Genres;
