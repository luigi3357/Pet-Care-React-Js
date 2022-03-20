const { Router } = require("express");
const { User, Review, Booking } = require("../db");

const router = Router();

router.post("/create", async (req, res, next) => {
  const { client, keeper, price, check_in, check_out } = req.body;
  try {
    const reservation = await Booking.create({
      client_id: client,
      keeper_id: keeper,
      price,
      check_in,
      check_out,
    });
    console.log(reservation);
    res.status(201).send("Tu reserva se ha creado con éxito");
  } catch (error) {
    next(error);
  }
});
router.post("/mocks", async (req, res, next) => {
  try {
    const users = await User.findAll();

    const reservation = await Booking.create({
      client_id: users[getRandomInt(0, users.length)].id,
      keeper_id: users[getRandomInt(0, users.length)].id,
      price: 50 * getRandomInt(1, 5),
      check_in: "2022-01-1",
      check_out: "2022-01-11",
    });
    res.status(201).send(reservation);
  } catch (error) {
    next(error);
  }
});
router.get("/all", async (req, res, next) => {
  const reservations = await Booking.findAll({
    include: ["client", "keeper"],
  });
  res.send(reservations);
});
router.get("/details", async (req, res, next) => {
  const { id } = req.query;
  const booking = await Booking.findOne({
    where: { id },
    include: ["client", "keeper"],
  });
  res.send(booking);
});

router.put("/payment_check", async (req, res, next) => {
  try {
    const { preference_id, status, id, payment_id } = req.body;
    const reserva = await Booking.findOne({ where: { id } });
    if (status !== "approved") return res.json("rechazado");
    if (reserva) {
      if (preference_id == reserva.preference_id) {
        await Booking.update(
          { status: status, payment_id: payment_id },
          { where: { id } }
        );
        return res.json("ok");
      } else {
        return res.json("rechazado");
      }
    }
    return res.send("No se reconoce el nro de reserva");
  } catch (error) {
    next(error);
  }
});

router.put("/update", async (req, res, next) => {
  try {
    const { id, status } = req.body;
    const booking = await Booking.findOne({ where: { id } });
    if (booking) {
      await Booking.update({ status: status }, { where: { id } });
      return res.send("orden modificada con exito");
    }
    return res.send("Tu orden no existe");
  } catch (error) {
    next(error);
  }
});
function getRandomInt(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

module.exports = router;
