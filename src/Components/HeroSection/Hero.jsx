import React from "react";
import { Play, Star, Clock } from "lucide-react";

const Hero = () => {
  return (
    <div className="">
      <section
        className="relative bg-cover bg-center h-screen flex items-center text-white"
        style={{
          backgroundImage:
            "url('https://i.ibb.co.com/Q3YDwBsG/Mortal-Engines-Movie.jpg')", // <-- replace with your image path
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Container for text */}
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-3xl">
            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
              Game of Heros
            </h1>

            {/* Rating Row */}
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-gray-700 px-2 py-1 text-xs rounded-md">
                NC-17
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
                2h : 30m
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-200 mb-4 leading-relaxed">
              Game of Heros is an action-packed fantasy epic where the fate of
              the world is decided in a battle of legendary warriors. When an
              ancient prophecy foretells an all-out war between the greatest
              heroes of all realms, champions from different eras...
            </p>

            {/* Details */}
            <div className="text-sm space-y-1 mb-6">
              <p>
                <span className="text-red-500 font-semibold">Tags:</span>{" "}
                Action, Adventure, Drama
              </p>
              <p>
                <span className="text-red-500 font-semibold">Genres:</span>{" "}
                Action, Adventure, Crime
              </p>
              <p>
                <span className="text-red-500 font-semibold">Starring:</span>{" "}
                Olivia Foster, Leena Burton, Ryan Pierce
              </p>
              <button className=" bg-red-600 hover:bg-red-700 transition text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2">
                <Play className="w-5 h-5 fill-white" /> Play Now
              </button>
            </div>

            {/* Button */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
