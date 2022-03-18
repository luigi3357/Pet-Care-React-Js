const twilio = require('twilio');
const { key, validate } = require('../services/resetPassword');
const { Update } = require('../services/updateUser');
const { Router } = require('express');
const { search } = require('../services/login');

const router = Router();

const accountSid = 'AC49d69f1e1e75319dfd88311990fbf988';
const authToken = '6eb8852e02f90dece9ac10636cda7e0c';
const client = new twilio(accountSid, authToken);


router.put("/sms", async (req, res) => {
    const { email, name } = req.body
    console.log(email)
    let user = await search({ email: email })
    if (user) {
        let token_2FA = key()
        let update = await Update({ token_2FA: token_2FA, email: email })
        let createSMS = () => {
            client.messages.create({
                body: `$Hola ${name}, esta es tu clave: ${token_2FA}`,
                to: '+543442557795',
                from:'+18062166438'
            }).then((message) => console.log('sms enviado'));
        }
        sendSMS = () => createSMS()
        return res.send(sendSMS())
    }
    return res.status(404).send("Usuario no encontrado")
})

router.put("/viewsms", async (req, res) => {
    const { email, token_2FA } = req.body
    const user = await search({ email: email })
    if (user) {
        if (email && token_2FA) {
            if (user.email === email && user.token_2FA === token_2FA) {
                return res.send(true)
            }
            return res.status(404).send(false)
        }
    }
    return "Usuario no encontrado" 
})

module.exports = router;
