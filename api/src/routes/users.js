const { Router } = require("express");
const { User, Post, Review, Booking } = require("../db");
const { checkUUIDV } = require("../services/checkUUID");
const { infoTotalDb } = require("../services/getDb.js");
const { search, hash } = require("../services/login");
const {
  searchUserIncludingReview,
  ratingAverage,
  } = require("../services/ratingCalculation");
const { Update } = require("../services/updateUser");
const router = Router();



router.get("/profile/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    if (await checkUUIDV(id)) {
      const user = await User.findOne({
        where: {
          id,
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
          'reservaciones',
          'contrataciones'
        ],
      });
      if (user && !user.deleted) {
        res.send(user);
      } else {
        return res.status(400).send("El usuario no existe");
      }
    } else {
      return res.status(400).send("El usuario no existe");
    }
  } catch (error) {
    next(error);
  }
});



/*         Update Rating          */
router.put("/rate", async (req, res, next) => {
  const { email } = req.body;
  
  const user = await searchUserIncludingReview(email);
  const new_rating = ratingAverage(user);
  const updated = await Update({ rating: new_rating, email });
  
  res.send(updated);
});

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
    res.send('Usuario eliminado con éxito');
  } catch (error) {
    res.status(400).send("No se pudo eliminar el usuario");
  }
});


//editamos la informacion del usuario

router.put("/edit", async (req, res) => {
  const { email, name, last_name, phone, password, bio, location} = req.body

  let user = await search({ email: email})

  if (user) {
      let resetInfoUser = await User.update({ name: name ? name:user.name, last_name: last_name ? last_name: user.last_name, phone: phone? phone: user.phone, bio:bio? bio:user.bio, location: location? location: user.location},   
          { where: { email:email }})
          let asunto = "Edito su perfil correctamente"
          let mensaje = `su perfil se edito correctamente con la siguiente informacion 
          nombre : ${name? name: user.name}.
          apellido: ${last_name? last_name: user.last_name}.
          telefono: ${phone? phone: user.phone}.
          biografia: ${bio? bio: user.bio}.
          direccion: ${location? location: user.location}.          
          Si algun dato esta mal modifiquelo en la siguiente ????`;
          //envia el email
          let send = sendEmail(email, mensaje, asunto)
      return res.send(resetInfoUser)
  }
  return res.status(404).send("Usuario no encontrado")
})

//ruta para editar si quiere o no 2FA y un cambio de contraseña

router.put("/security", async (req, res) => {
  const { email, password, key_2fa } = req.body

  let user = await search({ email: email})
  let passwordHasheada= await hash(password)

  if (user) {
      let resetInfoUser = await User.update({ password: passwordHasheada, key_2fa:key_2fa  },   
          { where: { email:email }})
      return res.send(resetInfoUser)
  }
  return res.status(404).send("Usuario no encontrado")
})

router.get("/", async (req, res) => {
  const infoUser = await infoTotalDb();
  res.send(infoUser);
});
module.exports = router;
