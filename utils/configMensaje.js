const nodemailer = require('nodemailer');

const sendMails = (mails,url,cuestionario) => {
    var transporter = nodemailer.createTransport({
        host: "gsmtp.gmail.com",
        port: 465,
        secure: false,
        requireTLS: true,
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
         html: `"El grupo de Investigación GIH4PC, ha desarrollado el test ${cuestionario.nombre}, para medir el nivel de madurez de Transformación Digital según su área.  
         Ingrese en el siguiente enlace para ir al formulario:"  ${url}`,

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
