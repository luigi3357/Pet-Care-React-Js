const { Router } = require('express');
const { User, Review } = require('../db');

const router = Router();

router.post('/create', async (req,res,next)=>{
    const { from_id, message, rate, reviewedUser_id } = req.body;
    try {
        if(!message){
            return res.status(400).send('El campo reseña no puede estar vacío')
        }
        if(!rate){
            return res.status(400).send('Debe ingresar una puntuacion')
        }
        const author = await User.findOne({where: {id: from_id}})
        const newReview = await Review.create({
            from_id,
            name: author.name + ' ' + author.last_name,
            message,
            rate,
            reviewedUser_id
        })
        res.status(201).send('Tu evalución se ha creado con éxito')
    } catch (error) {
        next(error)
    }

})


module.exports = router;