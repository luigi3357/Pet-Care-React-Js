import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavBar } from "../Components/NavBar";
import PostCard from "../Components/PostCard";
import Filters from "../Components/Filters";
import { fetchAllPosts } from "../REDUX/actions/action";
import style from "./global.module.css";
import Footer from "../Components/Footer/Footer";
import { Link } from "react-router-dom";
export const Home = () => {
  const filtered_posts = useSelector((state) => state.filtered_posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, []);

  return (
    <div className={style.homeContainer}>
      <NavBar />

      <div className="flex flex-column align-items-center text-center justify-content-center w-full">
        <Filters />
        <div className={style.postContainer}>
          <div className={style.postContainer}>
            {filtered_posts.map((post, idx) => {
              return <PostCard post={post} key={idx} />;
            })}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
