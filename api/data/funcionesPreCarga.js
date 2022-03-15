const { User, Post, Review } = require("../src/db");

async function createPost(posteos) {
  try {
    const { title, description, email, type, size, price } = posteos;

    const user = await User.findOne({
      where: {
        email,
      },
      include: [
        {
          model: Post,
          as: "posteos",
        },
        {
          model: Review,
          as: "reviews",
        },
      ],
    });
    const newPost = await Post.create({
      title,
      description,
      author_id: user.id,
      type,
      size,
      price
    });
  } catch (error) {
    console.error(error);
  }
}

async function createReview(reviews) {
  const { message, rate, email1, email2 } = reviews;
  const user1 = await User.findOne({
    where: {
      email: email1,
    },
    include: [
      {
        model: Post,
        as: "posteos",
      },
      {
        model: Review,
        as: "reviews",
      },
    ],
  });
  const user2 = await User.findOne({
    where: {
      email: email2,
    },
    include: [
      {
        model: Post,
        as: "posteos",
      },
      {
        model: Review,
        as: "reviews",
      },
    ],
  });
  const newReview = await Review.create({
    from_id: user2.id,
    name: user2.name + " " + user2.last_name,
    message,
    rate,
    reviewedUser_id: user1.id,
  });
}
module.exports = {
  createPost,
  createReview,
};
