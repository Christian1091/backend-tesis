const nodemailer = require('nodemailer');

const { google } = require('googleapis');
const CLIENT_ID = "54531413292-5vj3u3goqcg9qvcfvun9iptntktg7fkb.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = "1//04lcdlPUT-JoXCgYIARAAGAQSNwF-L9IrfSmW7fBgn00VzGeCPgrLp8eVcltgWSJMbYsz25Xo8N38J8kWvVjJd0G-Rj8umddxGVQ";
const oauth_cliente = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth_cliente.setCredentials({
    refresh_token: REFRESH_TOKEN
});

const sendMails = async (mails, url, cuestionario) => {
    const accessToken = await oauth_cliente.getAccessToken();
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'td.gih4pc@gmail.com',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken,
        }
    });
    const mailOptions = {
        from: 'Remitente',
        to: mails,
        subject: 'Nuevo Cuestionario',
        text: 'titulo',
        // html: `<strong>${content}</strong> <br/>`
        // `<strong> Link del nuevo test:${nombre}</strong> <br/>`,
        // <a href="{{url}}/validarIngreso/{{ cuestionario._id }}" class="card-text">{{url}}/validarIngreso/{{ cuestionario._id }}</a>
        // <hr>
        // `<strong>${url/validarIngreso/cuestionario._id}<strong> <br/> `
        // <strong>${url_front}+'/'+${cuestionario._id}</strong>//
        html: `El grupo de Investigación GIH4PC, ha desarrollado el test ${cuestionario.nombre}, para medir el nivel de madurez de Transformación Digital según su área.  
         Ingrese en el siguiente enlace para ir al formulario:  ${url}`,

    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
}

const enviarCorreoUsuario = async (body) => {
    const accessToken = await oauth_cliente.getAccessToken();
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'td.gih4pc@gmail.com',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken,
        }
    });
    const mailOptions = {
        from: body["email"],
        to: "td.gih4pc@gmail.com",
        subject: body["asunto"]+" - "+body["email"],
        text: body["nombre"]+ ", se ha suscrito.",
        html: body["mensaje"]+ " usuario: "+body["nombre"] + " "+body["email"],

    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
}
module.exports = {
    sendMails,
    enviarCorreoUsuario
}
