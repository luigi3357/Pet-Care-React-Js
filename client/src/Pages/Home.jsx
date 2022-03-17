import React from "react";
import { NavBar } from "../Components/NavBar";
import PostCard from "../Components/PostCard";
import Filters from "../Components/Filters";

export const Home = () => {
  return (
    <div>
      <NavBar />
      <div className="flex flex-column align-items-center text-center justify-content-center w-full">
        <Filters />
        <PostCard />
      </div>
    </div>
  );
};
