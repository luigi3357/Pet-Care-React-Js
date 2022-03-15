const { Post, Op, User, Review } = require("../db");

const types = ["perro", "gato", "aves", "roedores"];
const sizes = ["pequeño", "mediano", "grande"];

function queryToKeywordArray(queryString) {
  return queryString.keyword.split(" ");
}

async function searchingMachine(keywords) {
  try {
    let foundPosts = [];
    for (const keyword of keywords) {
      const keywordSearch = await Post.findAll({
        where: {
          [Op.or]: [
            { title: { [Op.iLike]: `%${keyword}%` } },
            { description: { [Op.iLike]: `%${keyword}%` } },
            types.includes(keyword.toLowerCase())
              ? { type: `${keyword.toLowerCase()}` }
              : null,
            sizes.includes(keyword.toLowerCase())
              ? { size: `${keyword.toLowerCase()}` }
              : null,
          ],
        },
        include: {
          model: User,
          as: "author",
          include: {
            model: Review,
            as: "reviews",
            order: [["createdAt", "DESC"]],
            attributes: ["id", "rate", "message", "from_id", "updatedAt"],
          },
          attributes: ["name", "last_name", "rating", "bookings"],
        },
        attributes: ["id", "title", "description", "updatedAt"],
      });
      foundPosts.push(keywordSearch);
    }
    return foundPosts;
  } catch (error) {
    throw new Error("Error en la searchMachine");
  }
}

function foundPostsSelector(foundPosts) {
  let allPost = foundPosts;
  let filteredPosts = [];
  let filteredId = [];
  while (allPost.length > 0) {
    const arrayResults = allPost.shift();
    if (arrayResults.length > 0) {
      for (const post of arrayResults) {
        if (!filteredId.includes(post.id)) {
          filteredPosts.push(post);
          filteredId.push(post.id);
        }
      }
    }
  }
  sortDescDate(filteredPosts);
  return filteredPosts;
}

function sortDescDate(posts) {
  return posts.sort((a, b) => {
    const dateA = a.createdAt;
    const dateB = b.createdAt;
    if (dateA < dateB) {
      return 1;
    }
    if (dateA > dateB) {
      return -1;
    }
    return 0;
  });
}

function findPostsForHomeScreen() {
  return Post.findAll({
    include: {
      model: User,
      as: "author",
      include: {
        model: Review,
        as: "reviews",
        order: [["createdAt", "DESC"]],
        attributes: ["id", "rate", "message", "from_id", "updatedAt"],
      },
      attributes: ["name", "last_name", "rating", "bookings", "id"],
    },
    order: [["createdAt", "DESC"]],
    attributes: ["id", "title", "description", "type", "size", "updatedAt"],
  });
}

module.exports = {
  queryToKeywordArray,
  searchingMachine,
  foundPostsSelector,
  findPostsForHomeScreen,
};
