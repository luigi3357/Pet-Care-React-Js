const twilio = require('twilio');

const accountSid = 'AC49d69f1e1e75319dfd88311990fbf988';
const authToken = '28508fa7fa6de444b50a209bc6ee6be6';

const client = new twilio(accountSid, authToken);

const createSMS = () => {
    client.messages.create({
        body: "Hola !! este es tu token de validacion",
        to: '+543442557795',
        from:'+18062166438'
    }).then((message) => console.log('sms enviado'));
}

exports.sendSMS = () => createSMS();