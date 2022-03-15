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

const MercadoPagoRoutes = require("./mercadoPago")



const router = Router();

router.use("/users", UserRoutes)
router.use('/posts', PostsRoutes)
router.use('/reviews', ReviewRoutes)
router.use('/upload', UploadRoutes)
router.use('/search', SearchRoutes)
router.use("/mercadoPago", MercadoPagoRoutes)
router.use("/filter", FilterRoutes)
router.use('/Auth', AuthRouter);



router.post("/register", async (req, res) => {
    let { email, password, name, last_name } = req.body
    console.log(req.body, "soy el body")
    let user = await search({ email: email.toLowerCase() })
    console.log(user, " soy el user")
    if (!user) {
        try {
            let verify = verifyEmail(email.toLowerCase())
            if (verify === true && password.length >= 8) {
                let hasheador = await hash(password)
                let result = await create(email, hasheador, name, last_name)
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


module.exports = router;