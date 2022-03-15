const { Router } = require('express');
const { User, Post, Review } = require('../db');
const { findPostsForHomeScreen } = require('../services/searchEngine');

const router = Router();


router.get('/all', async (req, res, next)=>{
    try {
        const posts = await findPostsForHomeScreen()
        res.status(200).send(posts)
    } catch (error) {next(error)}
  })

router.post('/create', async (req, res, next)=>{
    try{
        const {title, description, author_id, price, type, size, address, phone } = req.body;
        if (!title){
            return res.status(400).send('La publicacion debe tener un titulo válido')
        }
        if (!description){
            return res.status(400).send('La publicacion debe tener una descripcion válida')
        }
        const newPost = await Post.create({
            title,
            description, 
            price: Number(price),
            type: type.toString().toLowerCase(),
            size: size.toString().toLowerCase(),
            address,
            phone: Number(phone),
            author_id,
        })
        return res.status(201).send('Publicación creada con éxito')
        
    }catch(error){
        res.send(error)
    }
  })

module.exports = router;