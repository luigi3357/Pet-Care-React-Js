const { user, post, feedback } = require("./data/petCareUsersFake.js");
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { User } = require("./src/db");
const { createPost, createReview } = require("./data/funcionesPreCarga.js");
const {hash} =require("./src/services/login")

conn.sync({ force: true }).then(async () => {
  try {
    const users = await user.forEach(async (element) => {
      
     await User.findOrCreate({
        where: {
          email: element.email,
          name: element.name,
          last_name: element.last_name,
          keeper: element.keeper,
          bio: element.bio,
          location: element.location,
          password: element.password,
          rating: element.rating,
          bookings: element.bookings,
          profileImgURL: element.profileImgURL,
          myImages: element.myImages,
          Admin: element.Admin? element.Admin: false,
        },
      });
    });
    
  } catch (error) {
    console.log(error);
  }
  try {
    const posts = await post.map((e) => createPost(e));

    const reviews = await feedback.map((el) => createReview(el));
  } catch (error) {
  console.error(error)    
  }
  server.listen(3001, () => {
    console.log("%s listening at 3001");
  });
});
