import React, { useEffect, useState } from "react";
import { Film, Users, Zap } from "lucide-react";
import useAnimatedCounter from "../hooks/useAnimatedCounter";

const Statistics = () => {
  const [data, setData] = useState({ totalMovies: 0, totalUsers: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [moviesRes, usersRes] = await Promise.all([
          fetch("http://localhost:3000/allmovies"),
          fetch("http://localhost:3000/total-users"),
        ]);

        const moviesData = await moviesRes.json();
        const usersData = await usersRes.json();

        setData({
          totalMovies: moviesData.length || 0,
          totalUsers: usersData.totalUsers || 0,
        });
      } catch (err) {
        console.error("Error fetching statistics:", err);
      }
    };

    fetchStats();
  }, []);

  const animatedMovies = useAnimatedCounter(data.totalMovies, 1500);
  const animatedUsers = useAnimatedCounter(data.totalUsers, 1500);

  return (
    <section className="bg-black text-white py-24 px-6 md:px-16 text-center overflow-hidden">
      <div className="mb-16">
        <h2 className="text-5xl md:text-6xl font-black mb-3 tracking-tight uppercase">
          Platform Impact
        </h2>
        <p className="text-xl text-red-500 font-light tracking-wide">
          Data speaks louder than words.
        </p>
        <div className="w-24 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="bg-gray-900 border-t-4 border-red-600 p-10 rounded-xl shadow-xl transition-transform duration-300 hover:scale-[1.03] hover:bg-gray-800/70 relative overflow-hidden">
          <Zap className="w-24 h-24 text-red-900/10 absolute -top-4 -left-4 rotate-45" />
          <div className="flex items-center justify-center gap-4 mb-4">
            <Film className="w-14 h-14 text-red-500" />
            <h3 className="text-6xl font-extrabold">{animatedMovies}</h3>
          </div>
          <p className="text-gray-400 text-lg uppercase tracking-widest font-medium border-t border-gray-700 pt-4 mt-4">
            Total Cinematic Vault
          </p>
        </div>

        <div className="bg-gray-900 border-t-4 border-red-600 p-10 rounded-xl shadow-xl transition-transform duration-300 hover:scale-[1.03] hover:bg-gray-800/70 relative overflow-hidden">
          <Zap className="w-24 h-24 text-red-900/10 absolute -top-4 -left-4 rotate-45" />
          <div className="flex items-center justify-center gap-4 mb-4">
            <Users className="w-14 h-14 text-red-500" />
            <h3 className="text-6xl font-extrabold">{animatedUsers}</h3>
          </div>
          <p className="text-gray-400 text-lg uppercase tracking-widest font-medium border-t border-gray-700 pt-4 mt-4">
            Active Community Members
          </p>
        </div>
      </div>
    </section>
  );
};

export default Statistics; // ✅ make sure this line exists
