const nodemailer = require('nodemailer');

const {google}= require('googleapis');
const CLIENT_ID = "54531413292-5vj3u3goqcg9qvcfvun9iptntktg7fkb.apps.googleusercontent.com"; 
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = "1//04U-0F_FSOXJsCgYIARAAGAQSNwF-L9Ir2J3KG3oXfo3vNlgWAkqo8lqINpfpLe0RHNf3L7fhnJ-elpBUEUJ2DUOm2Jh3fVNXeTY"; 
const oauth_cliente = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI);
oauth_cliente.setCredentials({
    refresh_token: REFRESH_TOKEN

})
const sendMails = async (mails,url,cuestionario) => {
    const accessToken = await oauth_cliente.getAccessToken()
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        service: 'gmail',
        auth: {
            type:'OAuth2',
            user: 'td.gih4pc@gmail.com',
            clientId: CLIENT_ID, 
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken,
        }
    });


    //var mails = [`$"(listaEmails)"`]
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
module.exports = {
    sendMails
}
