import React from "react";
import Hero from "../HeroSection/Hero";
import AllMovies from "../../Pages/AllMovies";
import Statistics from "../Statistics/Statistics";

const HomeLayout = () => {
  return (
    <div className="">
      <Hero></Hero>
      <Statistics></Statistics>
    </div>
  );
};

export default HomeLayout;
