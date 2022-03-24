const { Router } = require("express");
const { User, Review, Booking, Post } = require("../db");
const { sendEmail } = require("../services/SendEmail");

const router = Router();

router.post("/create", async (req, res, next) => {
  const { client_id, keeper_id, price, check_in, check_out, comment } =
    req.body;
    try {
      if (client_id && keeper_id) {
        const foundClient = User.findOne({ where: { id: client_id } });
        const foundKeeper = User.findOne({ where: { id: keeper_id } });
        if (foundClient && foundKeeper) {
        const reservation = await Booking.create({
          client_id: client_id,
          keeper_id: keeper_id,
          price,
          check_in,
          check_out,
          comment,
        });
        console.log(reservation);
        //armamos el mensaje
        let asunto1 = `Solicitud de reserva`;
        let mensaje1 = `Has creado una solicitud de reserva. Datos: 
                          Cuidador: ${foundKeeper.name} ${foundKeeper.last_name}
                          Precio: ${price}.
                          Entrada: ${check_in}.
                          Salida: ${check_out}.
                          Comments: ${comment}
        `;
        //envia el email
        let send1 = sendEmail(foundClient.email, mensaje1, asunto1);
        ///////////////////////////////////////////////////////////
        let asunto2 = `Solicitud de reserva`;
        let mensaje2 = `Te han dejado una solicitud de reserva. Datos: 
                          Dueño: ${foundClient.name} ${foundClient.last_name}
                          Precio: ${price}.
                          Entrada: ${check_in}.
                          Salida: ${check_out}.
                          Comments: ${comment}
        `;
        //envia el email
        let send2 = sendEmail(foundKeeper.email, mensaje2, asunto2);
        return res.status(201).send("Tu reserva se ha creado con éxito");
      }
      return res.status(400).send("no se encontraron los usuarios");
    }
    return res.status(400).send("no se reconocen los id´s");
  } catch (error) {
    next(error);
  }
});
router.post("/mocks", async (req, res, next) => {
  try {
    const users = await User.findAll();
    const today = new Date();
    const futureDay = new Date();

    const reservation = await Booking.create({
      client_id: users[getRandomInt(0, users.length)].id,
      keeper_id: users[getRandomInt(0, users.length)].id,
      price: 50 * getRandomInt(1, 5),
      check_in: today,
      check_out: futureDay.setDate(futureDay.getDate() + 5),
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
  // estados son 'pending', 'accepted', 'rejected', 'approved', 'completed'
  try {
    const { id, status } = req.body;
    const booking = await Booking.findOne(
      { where: { id } },
      { include: ["client", "keeper"] }
    );
    if (booking) {
      const keeper = await User.findOne({ where: { id: booking.keeper_id } });
      await Booking.update({ status: status }, { where: { id } });
      if (status == "completed") {
        let newAmount = keeper.bookings + 1;
        await User.update(
          { bookings: newAmount },
          { where: { id: keeper.id } }
        );
      }
      let asunto = `Actualizacion de la reserva #${id.slice(24)}`;
  let mensaje = `El estatus de la reserva es ${status}`;
  //envia el email
  let send = sendEmail(keeper.email, mensaje, asunto);
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
router.post("/postular", async (req, res, next) => {
  const { owner, keeper, post } = req.body;
  const demand = await Post.findOne({ where: { id: post } });
  const dueño = await User.findOne({ where: { id: keeper } });
  const employee = await User.findOne({ where: { id: owner } });

  //armamos el mensaje
  let asunto = `Nueva postulación en ${demand.title}`;
  let mensaje = `${employee.name} ${employee.last_name} se ha postulado para cuidar una de tus mascotas. Visita su perfil para organizar una reserva`;
  //envia el email
  let send = sendEmail(dueño.email, mensaje, asunto);
  res.send('ok')
});
module.exports = router;
