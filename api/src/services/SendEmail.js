const nodemailer = require('nodemailer')
const {
    PASSWORD, EMAIL,
} = process.env;

function sendEmail(email, mensaje, asunto) {
    //Creamos el objeto con los datos de quien envia el mensaje
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    })

    //objeto con la info de quien recibe el correo y en from de quien lo envia
    var mailOptions = {
        from: `${EMAIL}`,
        to: `${email}`,
        subject: asunto,
        text: mensaje
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    });
};

module.exports = {
    sendEmail
};