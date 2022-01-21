const nodemailer = require('nodemailer');

const sendMails = (mails,url,cuestionario) => {
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secureConnection: false,
        service: 'gmail',
        auth: {
           
            user: 'td.gih4pc@gmail.com', // email
            pass: 'gih4pcUps21' //password
        },
        tls: {
            ciphers:'SSLv3'
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
         html: ` ${url} , ${cuestionario.nombre}`,

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
