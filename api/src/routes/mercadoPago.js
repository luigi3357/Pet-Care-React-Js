const { Router } = require("express");
const bodyParser = require("body-parser");
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
  let preference = {
    items: [
      {
        title: "Probando el detalle",
        description: "probando description",
        unit_price: parseInt("2000"),
        quantity: 1,
        currency_id: "ARS",
      },
    ],
    back_urls: {
      success: "http://localhost:3001/mercadoPago/feedback",
      failure: "http://localhost:3001/mercadoPago/feedback",
    },
    auto_return: "approved",
    binary_mode: true,
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
    .then((response) => {
      // Este valor reemplazará el string "<%= global.id %>" en tu HTML
      //global.id = response.body.id;

      console.log(response);
      res.json(response.body.init_point);
    })
    .catch(function (error) {
      next(error);
    });
});

router.get("/feedback", (req, res) => {
  const data = req.query;
  console.log(data);
  res.redirect("http://localhost:3000/mp_confirmation");
});

module.exports = router;
