import React from "react";
import { Film, Star, Play } from "lucide-react";

const features = [
  {
    icon: <Film className="w-8 h-8 text-red-500" />,
    title: "Extensive Movie Library",
    description:
      "Access thousands of movies from all genres, with detailed information, trailers, and reviews.",
  },
  {
    icon: <Star className="w-8 h-8 text-red-500" />,
    title: "Top-Rated Content",
    description:
      "Discover the highest-rated films and trending favorites curated for movie enthusiasts.",
  },
  {
    icon: <Play className="w-8 h-8 text-red-500" />,
    title: "Seamless Streaming",
    description:
      "Watch trailers and previews with a smooth and immersive cinematic experience.",
  },
];

const AboutPlatform = () => {
  return (
    <section className="bg-black text-white py-24 px-6 md:px-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
          About MovieMaster Pro
        </h2>
        <p className="text-lg text-red-500 font-light tracking-wide">
          Discover the ultimate movie platform
        </p>
        <div className="w-24 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-2xl p-8 shadow-2xl hover:scale-[1.03] transition-transform duration-500"
          >
            <div className="mb-6">{feature.icon}</div>
            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
            <p className="text-gray-300 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Optional Call-to-Action */}
      <div className="text-center mt-16">
        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition">
          Explore the Library
        </button>
      </div>
    </section>
  );
};

export default AboutPlatform;
