import React from "react";
import { NavBar } from "../Components/NavBar";
import PostCard from "../Components/PostCard";
import Filters from "../Components/Filters";

export const Home = () => {
  return (
    <div>
      <NavBar />
      <div>
        <Filters />
        <PostCard />
      </div>
    </div>
  );
};
