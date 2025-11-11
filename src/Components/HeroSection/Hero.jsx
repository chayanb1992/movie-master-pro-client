import React, { useEffect, useState } from "react";
import { Play, Star, Clock } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// ✅ Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Hero = () => {
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/allmovies")
      .then((res) => res.json())
      .then((data) => setMovieData(data))
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  const heroData = movieData.filter((data) => data.section === "hero");

  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      autoplay={{ delay: 10000 }}
      pagination={{ clickable: true }}
      loop
      className="w-full"
    >
      {heroData.map((slide, i) => (
        <SwiperSlide key={i}>
          <section
            className="relative bg-cover bg-center h-screen flex items-center text-white"
            style={{
              backgroundImage: `url(${slide.posterUrl})`, // ✅ fixed
            }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Container */}
            <div className="relative z-10 container mx-auto px-6">
              <div className="max-w-3xl">
                {/* Title */}
                <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
                  {slide.title}
                </h1>

                {/* Rating Row */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-gray-700 px-2 py-1 text-xs rounded-md">
                    {slide.ratingType || "PG-13"}
                  </span>

                  <div className="flex text-yellow-400">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                  </div>

                  <span className="bg-yellow-500 text-black font-semibold text-sm px-2 py-0.5 rounded">
                    IMDb
                  </span>

                  <div className="flex items-center text-sm opacity-80">
                    <Clock className="w-4 h-4 mr-1" />
                    {slide.duration || "2h 30m"}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-200 mb-4 leading-relaxed">
                  {slide.description ||
                    "An epic movie full of action, drama, and adventure."}
                </p>

                {/* Details */}
                <div className="text-sm space-y-1 mb-6">
                  <p>
                    <span className="text-red-500 font-semibold">Tags:</span>{" "}
                    {slide.tags || "Action, Adventure"}
                  </p>
                  <p>
                    <span className="text-red-500 font-semibold">Genres:</span>{" "}
                    {slide.genres || "Drama, Fantasy"}
                  </p>
                  <p>
                    <span className="text-red-500 font-semibold">
                      Starring:
                    </span>{" "}
                    {slide.cast || "Unknown"}
                  </p>

                  <button className="bg-red-600 hover:bg-red-700 transition text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2">
                    <Play className="w-5 h-5 fill-white" /> Play Now
                  </button>
                </div>
              </div>
            </div>
          </section>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Hero;
