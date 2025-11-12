import React from "react";
import Hero from "../HeroSection/Hero";
import AllMovies from "../../Pages/AllMovies";
import Statistics from "../Statistics/Statistics";
import TopRatedMovies from "../TopRatedMovies/TopRatedMovies";
import RecentlyAdded from "../RecentlyAdded/RecentlyAdded";
import Genres from "../Genres/Genres";
import AboutPlatform from "../AboutPlatform/AboutPlatform";
import SectionWrapper from "../../Animation/FrameAnimation";

const HomeLayout = () => {
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
