const { Router } = require('express');
const bodyParser = require("body-parser");

// SDK de Mercado Pago
const mercadopago = require("mercadopago");



const router = Router();

router.use(bodyParser.urlencoded({ extended: true}))

// Agrega credenciales
//aca vinculamos el usuario dueño de la empresa a la que legará el dinero
mercadopago.configure({
    access_token: "APP_USR-8905669987735932-030220-c4eafe06be2827b5eb41e0bb8fe5d64a-1083035041",
  });

//routes

router.post("/checkout", (req, res) => {
    // Crea un objeto de preferencia
    //
    let preference = {
         items: [
             {
                 title: req.body.carer,
                unit_price: parseInt(req.body.amount),
                 quantity: 1,
                 currency_id: 'ARS'
             }
         ],
         payer: {
           email: 'demo@mail.com'
         },
         back_urls:{
               "success": "https://petcare.com/success",
              "pending": "https://petcare.com/pending",   
              "failure": "https://petcare.com/failure"
            },
     };

     /* let preference = {
        items: [
            {
                title: "Mi producto",
                unit_price: 100,
                quantity: 1,
            }
        ],
    }; */
  
  mercadopago.preferences
    .create(preference)
    .then(function (data) {
      // Este valor reemplazará el string "<%= global.id %>" en tu HTML
      //global.id = response.body.id;

      console.log(data.response);
      //res.redirect(response.body.init_point)
      res.send(JSON.stringify(data.response.init_point))
    })
    .catch(function (error) {
      console.log(error);
    });
    
}) 

router.get("/feedback",(req, res) => {
    const data = req.query
    console.log(data)
    res.json({
        payment: data.payment_id,
        Status: data.status,
        Value: data.external_reference,
        Comerciant_Order: data.comerciante_order_id
    })
})

module.exports = router;
