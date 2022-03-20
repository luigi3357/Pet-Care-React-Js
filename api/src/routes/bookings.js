const { Router } = require('express');
const { User, Review, Booking } = require('../db');

const router = Router();

router.post('/create', async (req,res,next)=>{
    const { client, keeper, price, status, check_in, check_out } = req.body;
    try {
        
        const reservation = await Booking.create({
            client,
            keeper,
            price,
            status,
            check_in,
            check_out
        })
        console.log(reservation)
        res.status(201).send('Tu reserva se ha creado con éxito')
    } catch (error) {
        next(error)
    }
})

module.exports = router;