import React from "react";
import Hero from "../HeroSection/Hero";
import AllMovies from "../../Pages/AllMovies";
import Statistics from "../Statistics/Statistics";
import TopRatedMovies from "../TopRatedMovies/TopRatedMovies";
import RecentlyAdded from "../RecentlyAdded/RecentlyAdded";

const HomeLayout = () => {
  return (
    <div className="">
      <Hero></Hero>
      <Statistics></Statistics>
      <TopRatedMovies></TopRatedMovies>
      <RecentlyAdded></RecentlyAdded>
    </div>
  );
};

export default HomeLayout;
