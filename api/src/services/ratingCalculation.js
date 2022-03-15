const { User, Review } = require("../db");

async function searchUserIncludingReview(email) {
  let user = await User.findOne({
    include: { model: Review, as: "reviews" },
    where: {email}
  });
  return user
}

function ratingAverage(user){
    const review_quantity = user.reviews.length;
    const rates = user.reviews.map((review)=>review.rate)
    const rate_sum = rates.reduce((a,b)=>a + b);
    return rate_sum/review_quantity;
}

 
module.exports = {
    searchUserIncludingReview,
    ratingAverage,
    
};
