const { user, post, feedback } = require("./data/petCareUsersFake.js");
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { User } = require("./src/db");
const { createPost, createReview } = require("./data/funcionesPreCarga.js");

conn.sync({ force: true }).then(async () => {
    const users = new Promise(()=>{user.forEach(async (element) => {
       await User.findOrCreate({
        where: {
          email: element.email,
          name: element.name,
          last_name: element.last_name,
          bio: element.bio,
          password: element.password,
          rating: element.rating,
          bookings: element.bookings,
          profileImgURL: element.profileImgURL,
          myImages: element.myImages,
        },
      });
})}).then(()=>{
      const posts = post.map((e) => createPost(e));
    }).then(()=>{
      const reviews = feedback.map((el) => createReview(el));
    }).catch((e)=>{
      console.log(error);
    })
  
  server.listen(3001, () => {
    console.log("%s listening at 3001");
  });
});
