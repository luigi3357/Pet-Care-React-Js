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
router.post('/mocks', async (req,res,next)=>{
    try {
        const users = await User.findAll()


        const reservation = await Booking.create({
            client: users[getRandomInt(0,users.length)].id,
            keeper: users[getRandomInt(0,users.length)].id,
            price: 50*getRandomInt(1,5),
            status: randomStatus(),
            check_in: '2022-01-11',
            check_out: '2022-01-11'
        })
        console.log(reservation)
        res.status(201).send('Tu reserva se ha creado con éxito')
    } catch (error) {
        next(error)
    }

})
router.get('/all', async (req,res,next)=>{
    const reservations = await Booking.findAll()
    res.send(reservations)
})

function randomStatus(){
    const options = ['pending', 'cancelled', 'approved'];
    return options[getRandomInt(0,2)]
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = router;