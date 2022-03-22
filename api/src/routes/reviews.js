const { Router } = require('express');
const { User, Review, Booking } = require('../db');
const {searchUserIncludingReview, ratingAverage} = require('../services/ratingCalculation')

const router = Router();

router.post('/create', async (req,res,next)=>{
    const { from_id, message, rate, reviewedUser_id, booking_id } = req.body;
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
        const reviewedUser = await searchUserIncludingReview(reviewedUser_id);
        const new_rating = ratingAverage(reviewedUser);
        const updated = await User.update({ rating: new_rating}, {where: {id: reviewedUser_id} })
        const booking = await Booking.findOne({where: {id: booking_id}})
        if(from_id==booking.client_id){
            await Booking.update({client_review: true},{where:{id: booking_id}})
        }else{
            await Booking.update({keeper_review: true},{where:{id: booking_id}})
        }





        res.status(201).send('Tu evalución se ha creado con éxito')
    } catch (error) {
        next(error)
    }

})


module.exports = router;