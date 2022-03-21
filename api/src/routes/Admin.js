const { Router } = require("express");
const { User, Post, Review, Booking } = require("../db");
const { search, hash } = require("../services/login");

const router = Router();


/*         Account Delete          */
router.put("/delete", async (req, res) => {
  const { email, name, last_name, phone, bio, location, myImages, profileImgURL,id} = req.body

  let user = await search({ id: id})
  if (user) {
      let resetInfoUser = await User.update({ name: user.name,
         last_name: user.last_name,
          phone: user.phone,
           bio:user.bio,
            location: user.location, 
            myImages: user.myImages, 
            profileImgURL: user.profileImgURL,
            deleted:true
          
          },   
          { where: { email:user.email }})
         
        return res.send(resetInfoUser)

  }
  return res.status(404).send("Usuario no encontrado")
})


router.delete("/delete/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedPost = await Post.destroy({
        where: { id },
      });
      let asunto = "Publicacion eliminada"
      let mensaje = `Un administrador elimino su Publicacion por inflinjir 
      las normas tenga cuidado con lo que publica o su perfil puede ser baneado`;
      res.send('Publicacion eliminada con éxito');
    } catch (error) {
      res.status(400).send("No se pudo eliminar el usuario");
    }
  });

  router.delete("/delete/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedPost = await Review.destroy({
        where: { id },
      });
      let asunto = "Review eliminada"
      let mensaje = `Un administrador elimino su Review por inflinjir 
      las normas tenga cuidado con lo que publica o su perfil puede ser baneado`;
      res.send('Publicacion eliminada con éxito');
    } catch (error) {
      res.status(400).send("No se pudo eliminar el usuario");
    }
  });

module.exports = router;
