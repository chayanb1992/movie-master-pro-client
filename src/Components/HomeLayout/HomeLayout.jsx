import React, { useEffect, useState } from "react";
import Hero from "../HeroSection/Hero";
import AllMovies from "../../Pages/AllMovies";
import Statistics from "../Statistics/Statistics";
import TopRatedMovies from "../TopRatedMovies/TopRatedMovies";
import RecentlyAdded from "../RecentlyAdded/RecentlyAdded";
import Genres from "../Genres/Genres";
import AboutPlatform from "../AboutPlatform/AboutPlatform";
import SectionWrapper from "../../Animation/FrameAnimation";

const HomeLayout = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Beautiful Realistic Loading Spinner
  if (isLoading || "") {
    return (
      <section className="bg-black text-white flex flex-col justify-center items-center h-screen">
        <div className="relative w-24 h-24">
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full border-4 border-gray-800 animate-pulse"></div>
          {/* Spinning gradient ring */}
          <div className="absolute inset-0 rounded-full border-4 border-t-red-600 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        </div>
        <p className="mt-8 text-gray-300 text-xl font-medium tracking-wide animate-pulse">
          Loading cinematic universe...
        </p>
      </section>
    );
  }
  return (
    <div className="">
      <Hero></Hero>
      <Statistics></Statistics>
      <SectionWrapper>
        <TopRatedMovies></TopRatedMovies>
      </SectionWrapper>

      <SectionWrapper>
        <RecentlyAdded></RecentlyAdded>
      </SectionWrapper>
      <SectionWrapper>
        <Genres></Genres>
      </SectionWrapper>
      <SectionWrapper>
        <AboutPlatform></AboutPlatform>
      </SectionWrapper>
    </div>
  );
};

export default HomeLayout;
