const { Router } = require("express");
const { User, Post, Review, Booking } = require("../db");

const router = Router();


/*         Account Delete          */
router.put("/delete/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({where: {id}})
    console.log(user.email)
    if(user){
      const deleted = await User.update({ deleted: true}, {where: {email: user.email}});
  
    //res.send(updated);
    }
    let asunto = "Su cuenta a sido baneada"
    let mensaje = `Un administrador elimino su cuenta por inflinjir 
    las normas si cree que es un error comuniquese con PetCare3456789@gmail.com`;
    //envia el email
    let send = sendEmail(email, mensaje, asunto)
    res.send('Usuario eliminado con éxito');
  } catch (error) {
    res.status(400).send("No se pudo eliminar el usuario");
  }
});

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
