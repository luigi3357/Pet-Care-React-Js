const { Router } = require('express');
// var passport = require('passport');
// var GoogleStrategy = require('passport-google-oidc');
const { verifyEmail, hash, create, search, compare } = require('../services/login');
const { key, validate } = require('../services/resetPassword');
const { sendEmail } = require('../services/SendEmail');
const { Update } = require('../services/updateUser');
const UserRoutes = require('./users');
const PostsRoutes = require('./posts');
const ReviewRoutes = require('./reviews');
const UploadRoutes = require('./uploadform');
const SearchRoutes = require('./searchBar');
const FilterRoutes = require('./Filters');
const AuthRouter = require('./Auth');
const Sms = require('./smsvalidacion')
const MercadoPagoRoutes = require("./mercadoPago")
const BookingRoutes = require("./bookings")
const AdminRoutes = require("./Admin")
const { User, Post, Review, Booking } = require("../db");


const router = Router();
router.use("/mensaje", Sms)
router.use("/users", UserRoutes)
router.use('/posts', PostsRoutes)
router.use('/reviews', ReviewRoutes)
router.use('/upload', UploadRoutes)
router.use('/search', SearchRoutes)
router.use("/mercadoPago", MercadoPagoRoutes)
router.use("/filter", FilterRoutes)
router.use('/Auth', AuthRouter);
router.use('/bookings', BookingRoutes);
router.use("/admin", AdminRoutes)



router.post("/register", async (req, res) => {
    let { email, password, name, last_name, keeper } = req.body   
    let user = await search({ email: email.toLowerCase() })
    
    if (!user) {
        try {
            let verify = verifyEmail(email.toLowerCase())
            console.log(verify)
            if (verify === true && password.length >= 8) {
                let hasheador = await hash(password)
                let result = await create(email, hasheador, name, last_name, keeper)
                  //armamos el mensaje
        let asunto = "Registrado correctamente"
        let mensaje = `hola,${name}:
        Te damos la bienvenida a Pet-Care.
        Con tu nueva cuenta, puedes comenzar a conectar con los cuidadores o las personas que soliciten servicios`;
        //envia el email
        let send = sendEmail(email, mensaje, asunto)
       
                return res.status(201).send(result)
            }
            if (verify === false) {
                return res.status(404).send("Email invalido")
            }
            if (password.length < 8) {
                return res.status(404).send("La contraseña debe contener al menos 8 caracteres")
            }
        } catch (error) {
            return res.status(404).send(error)
        }
    } else {
        return res.status(404).send("El correo ya tiene un perfil restablezca la contraseña")
    }
})

router.put("/forgot-password", async (req, res) => {
    const { email } = req.body
    console.log(req.body)
    let user = await search({ email: email })
    if (user) {
        let token = key()
        let update = await Update({ token: token, email: email.toLowerCase() })

        //armamos el mensaje
        let asunto = "Cambio de contraseña"
        let mensaje = `Usted solicito un cambio de contraseña para hacer efectivo el mismo coloque el siguiente codigo cuando se lo soliciten ${token}; verifique que coincidan mayusculas y minusculas `;
        //envia el email
        let send = sendEmail(email, mensaje, asunto)
        return res.send(update)
    }
    return res.status(404).send("Usuario no encontrado")
})

router.put("/reset", async (req, res) => {
    const { email, token, password } = req.body
    let up = await validate({ email: email, token: token, password: password })
    if (up) {
        return res.send(up)
    }
    return res.status(404).send("error")
})

router.get("/login/:email", async (req, res) => {
    const { email } = req.params
    if (email) {
        let user = await search({ email: email })

        if (user) {
            return res.send(user)
        }
        return res.send("error")
    }
})


/*         Account Delete          */
router.put("/admindelete", async (req, res) => {
    const { email, name, last_name, phone, bio, location, myImages, profileImgURL,id} = req.body

    const ids ={ id:req.body.toString()}
     console.log(ids)
    let user = await search(ids)
    console.log(user)
    if (user) {
        let resetInfoUser = await User.update({ name: user.name,
           last_name: user.last_name,
            phone: user.phone,
             bio:user.bio,
              location: user.location, 
              myImages: user.myImages, 
              profileImgURL: user.profileImgURL,
              deleted:true
            
            },   
            { where: { email:user.email }})
            let asunto = "Su cuenta a sido baneada"
            let mensaje = `Un administrador elimino su cuenta por inflinjir 
            las normas si cree que es un error comuniquese con PetCare3456789@gmail.com`;
            //envia el email
            let send = sendEmail(user.email, mensaje, asunto)
          return res.send(resetInfoUser)
  
    }
    return res.status(404).send("Usuario no encontrado")
  })


  router.post("/registerGoogle", async (req, res) => {
    let { email, givenName, familyName, googleId, imageUrl  } = req.body   
    
    let user = await search({ email: email.toLowerCase() })  
    
    if (!user) {
        try {
                                  
                let result = await User.create({                    
                        googleId: true,
                        email: email,
                        name: givenName,
                        last_name:familyName,
                        profileImgURL: imageUrl                    
                })
                  //armamos el mensaje
        let asunto = "Registrado correctamente"
        let mensaje = `hola,${givenName}:
        Te damos la bienvenida a Pet-Care.
        Con tu nueva cuenta, puedes comenzar a conectar con los cuidadores o las personas que soliciten servicios`;
        //envia el email
        let send = sendEmail(email, mensaje, asunto)
        console.log(result)
       
                return res.status(201).json(result)
                     
        } catch (error) {
            return res.status(404).send(error)
        }
    }
})

module.exports = router;