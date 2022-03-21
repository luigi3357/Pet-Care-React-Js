import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavBar } from "../Components/NavBar";
import PostCard from "../Components/PostCard";
import Filters from "../Components/Filters";
import { fetchAllPosts } from "../REDUX/actions/action";
import style from "./global.module.css";
import Footer from "../Components/Footer/Footer";

export const Home = () => {
  const filtered_posts = useSelector((state) => state.filtered_posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, []);

  console.log(filtered_posts);
  return (
    <div>
      <NavBar />
    
      <div className="flex flex-column align-items-center text-center justify-content-center w-full">
        <Filters />
        <div className={style.postContainer}>
          {filtered_posts.map((post) => {
            return <PostCard post={post} />;
          })}
        </div>
      </div>
      <Footer/>
    </div>
  );
};
