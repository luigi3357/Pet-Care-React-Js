import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavBar } from "../Components/NavBar";
import PostCard from "../Components/PostCard";
import Filters from "../Components/Filters";
import { fetchAllPosts } from "../REDUX/actions/action";

export const Home = () => {
  const filtered_posts = useSelector((state) => state.filtered_posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, []);

  return (
    <div>
      <NavBar />
      <div className="flex flex-column align-items-center text-center justify-content-center w-full">
        <Filters />

        {filtered_posts.map((post) => {
          return (
            <PostCard
              authorId={post.author.id}
              id={post.id}
              key={post.id}
              title={post.title}
              description={post.description}
              reviews={
                post.author.reviews.length > 0 ? post.author.reviews : null
              }
              rating={post.author.rating}
              bookings={post.author.bookings}
            />
          );
        })}
      </div>
    </div>
  );
};
