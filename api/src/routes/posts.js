const { Router } = require('express');
const { User, Post, Review } = require('../db');
const { findPostsForHomeScreen } = require('../services/searchEngine');
const { search} = require('../services/login')

const router = Router();


router.get('/all', async (req, res, next) => {
  try {
    const posts = await findPostsForHomeScreen()
    res.status(200).send(posts)
  } catch (error) { next(error) }
})

router.post('/create', async (req, res, next) => {
  try {
    const { title, description, author_id, price, type, size, address, phone } = req.body;
    if (!title) {
      return res.status(400).send('La publicacion debe tener un titulo válido')
    }
    if (!description) {
      return res.status(400).send('La publicacion debe tener una descripcion válida')
    }
    let user = await search({ id: author_id })
    const newPost = await Post.create({
      title,
      description,
      price: Number(price),
      type: type.toString().toLowerCase(),
      size: size.toString().toLowerCase(),
      author_id,
    })
    //armamos el mensaje
    let asunto = "su publicacion se creo correctamente"
    let mensaje = `Felicidades su publicacion se realizo correrctamente con la siguiente informacion 
                          Titulo : ${title}.
                          Precio: ${price}.
                          Tipo: ${type}.
                          tamaño: ${size}.
                          direccion: ${address}.
                          Telefono: ${phone}.
                          Si algun dato esta mal modifiquelo en la siguiente ????`;
    //envia el email
    let email = user.email
    let send = sendEmail(email, mensaje, asunto)
    return res.status(201).send('Publicación creada con éxito')

  } catch (error) {
    res.send(error)
  }
})

router.delete("/deleteAll/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPosts = await Post.destroy({
      where: { author_id: id },
    });
    res.send('Publicaciones eliminadas con éxito');
  } catch (error) {
    res.status(400).send("No se pudieron eliminar las publicacones");
  }
});
router.delete("/delete/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.destroy({
      where: { id },
    });
    res.send('Publicacion eliminada con éxito');
  } catch (error) {
    res.status(400).send("No se pudo eliminar el usuario");
  }
});

router.put("/edit/:id", async (req, res, next) => {
  const { title, description, price, type, size, address, phone } = req.body
  const { id } = req.params
  const post = await Post.findOne({ where: id });

  if (post) {
    try {
      let user = await search({ id: post.author_id })
      const editPost = await Post.update(
        {
          title: title ? title : post.title,
          description: description ? description : post.description,
          price: price ? price : post.price,
          type: type ? type : post.type,
          size: size ? size : post.size,
          address: address ? address : post.address,
          phone: phone ? phone : post.phone,
        },
        {
          where: { id },
        });
      //armamos el mensaje
      let asunto = "su publicacion se edito correctamente"
      let mensaje = `revise que los datos sean correctos: 
                      Titulo : ${title}.
                      Precio: ${price}.
                      Tipo: ${type}.
                      tamaño: ${size}.
                      direccion: ${address}.
                      Telefono: ${phone}.
                      Si algun dato esta mal modifiquelo en la siguiente ????`;
      //envia el email
      let email = user.email
      let send = sendEmail(email, mensaje, asunto)
      res.send('editado correctamente');
    } catch (error) {
      res.status(400).send("No se pudo eliminar el usuario");
    }
  }

});



module.exports = router;