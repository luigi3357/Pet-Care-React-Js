import React, { useState, useEffect, useRef } from "react";
import { DataScroller } from "primereact/datascroller";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../../REDUX/actions/action";
import PostCard from "../PostCard";
import { Carousel } from 'primereact/carousel';
// import FeaturedCard from "./FeaturedCard";


export const DataScrollerLoaderDemo = () => {
  const [products, setProducts] = useState([]);
  const filtered_posts = useSelector((state) => state.filtered_posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, []);


function gettingFeatured(){
  const orderedListByRatingDesc = filtered_posts.sort((a, b) => {
          
    if (a.author.rating > b.author.rating) return 1;
      if (b.author.rating > a.author.rating) return -1;
      return 0;
    }
  )
  

}

  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: "600px",
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: "480px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const productTemplate = (product) => {
    return (
      <div >
        <div >
          {/* <FeaturedCard post={product}/> */}
           
        </div>
      </div>
    );
  };

  return (
    <div >
      <Carousel
        value={filtered_posts}
        numVisible={3}
        numScroll={1}
        responsiveOptions={responsiveOptions}
        circular
        //autoplayInterval={4000}
        itemTemplate={productTemplate}
        header={<h5></h5>}
      />
    </div>
  );
};

{/* <div className="card">
  <Carousel
    value={filtered_posts}
    numVisible={3}
    numScroll={3}
    responsiveOptions={responsiveOptions}
    itemTemplate={productTemplate}
    header={<h5>Basic</h5>}
  />
</div> */}


{/* <div className="card">
  <Carousel
    value={filtered_posts}
    numVisible={1}
    numScroll={1}
    orientation="vertical"
    verticalViewPortHeight="352px"
    itemTemplate={productTemplate}
    header={<h5>Vertical</h5>}
    style={{ maxWidth: "400px", marginTop: "2em" }}
  />
</div> */}