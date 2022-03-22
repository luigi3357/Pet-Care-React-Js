const { User, Review } = require("../db");

async function searchUserIncludingReview(id) {
  console.log(id)
  return User.findOne({
    include: { model: Review, as: "reviews" },
    where: {id: id}
  });
}

function ratingAverage(user){
    const review_quantity = user.reviews.length;
    if(review_quantity==0){
      return 0.00
    }else{
      const rates = user.reviews.map((review)=>review.rate)
      const rate_sum = rates.reduce((a,b)=>a + b);
      return rate_sum/review_quantity;
    }
}

 
module.exports = {
    searchUserIncludingReview,
    ratingAverage,
    
};
