const { Router } = require("express");
const bodyParser = require("body-parser");
const { Booking } = require("../db");
// SDK de Mercado Pago
const mercadopago = require("mercadopago");

const router = Router();

//router.use(bodyParser.urlencoded({ extended: true}))
// Agrega credenciales
//aca vinculamos el usuario dueño de la empresa a la que legará el dinero
mercadopago.configure({
  access_token:
    "APP_USR-8905669987735932-030220-c4eafe06be2827b5eb41e0bb8fe5d64a-1083035041",
});

//routes

router.post("/checkout/", (req, res, next) => {
  // Crea un objeto de preferencia
  //
  const { id, unit_price, bookRef } = req.body;

  let preference = {
    items: [
      {
        title: "Reserva PetCare - " + bookRef,
        unit_price: parseInt(unit_price),
        quantity: 1,
        currency_id: "ARS",
      },
    ],
    back_urls: {
      success: "http://localhost:3000/mp_confirmation",
      failure: "http://localhost:3000/mp_confirmation",
    },
    auto_return: "approved",
    binary_mode: true,
    external_reference: id,
  };

  //  let preference = {
  //     items: [
  //         {
  //             title: "Mi producto",
  //             unit_price: 100,
  //             quantity: 1,
  //         }
  //     ],
  //     back_urls:{
  //       "success": "http://localhost:3000/payment",
  //       "pending": "https://localhost:3000/feedback",
  //       "failure": "https://localhost:3000/feedback"
  //     }, auto_return: "approved"
  // };

  mercadopago.preferences
    .create(preference)
    .then(async (response) => {
      // Este valor reemplazará el string "<%= global.id %>" en tu HTML
      //global.id = response.body.id;
      await Booking.update(
        { preference_id: response.body.id },
        { where: { id: response.body.external_reference } }
      );
      console.log(response.body);
      res.json(response.body.init_point);
    })
    .catch(function (error) {
      next(error);
    });
});

module.exports = router;
