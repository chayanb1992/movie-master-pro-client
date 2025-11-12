import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
} from "react-icons/fa";

const genres = [
  "Action",
  "Drama",
  "Comedy",
  "Horror",
  "Sci-Fi",
  "Romance",
  "Thriller",
  "Fantasy",
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 px-6 md:px-16">
      {/* Top Section: Logo & Newsletter */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            MovieMaster Pro
          </h2>
          <p className="text-gray-400">
            Your ultimate destination for movies. Discover, explore, and stream
            your favorite films all in one place.
          </p>
          <div className="mt-4 flex items-center space-x-2">
            <FaEnvelope className="text-red-500" />
            <input
              type="email"
              placeholder="Subscribe for updates"
              className="bg-gray-800 text-white px-3 py-2 rounded-lg outline-none w-full"
            />
            <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white font-semibold transition">
              Subscribe
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-red-500 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/movies" className="hover:text-red-500 transition">
                All Movies
              </a>
            </li>
            <li>
              <a href="/genres" className="hover:text-red-500 transition">
                Genres
              </a>
            </li>
            <li>
              <a href="/top-rated" className="hover:text-red-500 transition">
                Top Rated
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-red-500 transition">
                About Us
              </a>
            </li>
          </ul>
        </div>

        {/* Genres & Social */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Genres</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {genres.map((genre, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-800 rounded-full text-sm hover:bg-red-600 cursor-pointer transition"
              >
                {genre}
              </span>
            ))}
          </div>

          <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-red-500 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-red-500 transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-red-500 transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-red-500 transition">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} MovieMaster Pro. All rights reserved.
        Designed with ❤️ for movie enthusiasts.
      </div>
    </footer>
  );
};

export default Footer;
