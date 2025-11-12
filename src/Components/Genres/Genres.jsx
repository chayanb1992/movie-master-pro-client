import React, { useEffect, useState } from "react";
import { Film } from "lucide-react";

const Genres = () => {
  const [movies, setMovies] = useState([]);
  const [genreData, setGenreData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/allmovies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);

        // Extract unique genres
        const genreMap = {};
        data.forEach((movie) => {
          movie.genre.split(",").forEach((g) => {
            const genre = g.trim();
            if (!genreMap[genre]) {
              genreMap[genre] = { count: 1, posterUrl: movie.posterUrl };
            } else {
              genreMap[genre].count += 1;
            }
          });
        });

        // Convert object to array
        const genreArray = Object.keys(genreMap).map((key) => ({
          name: key,
          count: genreMap[key].count,
          posterUrl: genreMap[key].posterUrl,
        }));

        setGenreData(genreArray);
      })
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

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
            {/* Card Background from movie poster */}
            <img
              src={genre.posterUrl}
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
