const { response, json } = require('express');

const Cuestionario = require('../models/cuestionario.model');
const respuestaCuestionario = require('../models/respuestaCuestionario');
const Respuesta = require('../models/respuesta.model');
mail = require('../utils/configMensaje.js');
const Usuario = require('../models/usuario_model');

// Este get es para visualizar publicamente
const getListCuestionarios = async (req, res = response) => {

    //const uid = req.uid;    
    //console.log(uid)
    const cuestionarios = await Cuestionario.find().populate('usuario', 'nombre')

        ;//.populate('hospital', 'nombre img')
    res.json({
        ok: true,
        cuestionarios
    })
}

const getListCuestionariosGeneral = async (req, res = response) => {
    const provincia = req.params.provincia;
    const ids = await respuestaCuestionario.find()
    const resultados = [];
    ids.forEach(res => {
        resultados.push(res["puntosTotales"])
    })
    const datos =
    {
        "resultados": resultados
    }
    res.json({
        ok: true,
        datos
    })
}

const getListCuestionariosByProvincia = async (req, res = response) => {
    const provincia = req.params.provincia;
    const ids = await respuestaCuestionario.find({ 'provinciaParticipante': provincia })
    const resultados = [];
    ids.forEach(res => {
        const size = res["listRespuestasUsuario"].length;
        const total = res["puntosTotales"];
        resultados.push((total * 100) / size)
    })
    const datos =
    {
        "resultados": resultados
    }
    res.json({
        ok: true,
        datos
    })
}

const getListCuestionarioByInstitucion = async (req, res = response) => {
    const institucion = req.params.institucion;
    const ids = await respuestaCuestionario.find({ 'institucionParticipante': institucion })
    const resultados = [];
    ids.forEach(res => {
        const size = res["listRespuestasUsuario"].length;
        const total = res["puntosTotales"];
        resultados.push((total * 100) / size)
    })
    const datos =
    {
        "resultados": resultados
    }
    res.json({
        ok: true,
        datos
    })
}

//  Estudiantes - Administravtivos - Docentes

const getListCuestionarioByInstitucionTipoPersona = async (req, res = response) => {
    const empresa = req.params.institucion;
    const tipo = req.params.tipo;
    const ids = await Cuestionario.find({ 'tipoPersona': tipo, 'empresa': empresa });
    const cuestionarios = [];
    ids.forEach(res => {
        cuestionarios.push(res['_id']);
    });
    const resultados = [];
    await Promise.all(
        cuestionarios.map(async res => {
            const cues = await respuestaCuestionario.find({ 'cuestionarioId': res, 'institucionParticipante': empresa });
            cues.map(r => {
                const size = r["listRespuestasUsuario"].length;
                const total = r["puntosTotales"];
                resultados.push((total * 100) / size)
            });
        })
    );
    const datos =
    {
        "resultados": resultados
    }
    res.json({
        ok: true,
        datos
    });
}

const getListCuestionarioByInstitucionPersona = async (req, res = response) => {
    const institucion = req.params.institucion;
    const ids = await respuestaCuestionario.find({ 'institucionParticipante': institucion })
    const resultados = [];
    ids.forEach(res => {
        const size = res["listRespuestasUsuario"].length;
        const total = res["puntosTotales"];
        resultados.push((total * 100) / size)
    })
    const datos =
    {
        "resultados": resultados
    }
    res.json({
        ok: true,
        datos
    })
}

// Este get es para visualizar los cuestionarios en los cards creados por el usuario ya autenticado
const getCuestionariosByIdUser = async (req, res = response) => {

    const uid = req.uid;
    //console.log(uid)
    const cuestionarios = await Cuestionario.find({ usuario: uid })//.populate('usuario', 'nombre')
        ;//.populate('hospital', 'nombre img')
    res.json({
        ok: true,
        cuestionarios
    })
}

/* Este get es para visualizar un cuestionario en especifico dentro del usuario autenticado */
const getVerCuestionario = async (req, res = response) => {

    const id = req.params.id;
    //console.log(id)
    const cuestionarios = await Cuestionario.find({ _id: id });
    //let data =  JSON.stringify(cuestionarios);
    //res = data;
    //console.log(data);
    res.json({
        //ok: true,
        cuestionarios
        //msg: "Ver Cuestionario"
    })
}

const enviarCorreoUsuario = async (req, res = response) => {
    const body = req.body;
    console.log(body);
    try {
        mail.enviarCorreoUsuario(body)
        res.json({
            ok: true,
            msg: 'Se envio el correo'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'No se puedo enviar el correo'
        });
    }
}

const crearCuestionarios = async (req, res = response) => {

    /**Extraemos el id del usuario de quien esta grabando
     * uid => id del usuario
     */
    const uid = req.uid;
    //console.log(uid)

    /**
       el req.body contiene todo lo que tenemos en el model cuestionario, es decir
       el nombre, la descripcion, la fecha, si esta activo, etc.
      
       Ahora mandamos el uid antes de guardar, es decir antes del save, para ello desestructuramos
       new Cuestionario y vamos a mandar todo lo que esta en el body con el ...req.body y con el 
       uid del usuario
     */
    const [usuarios] = await Promise.all([
        Usuario
            .find({}, 'email'),

        Usuario.countDocuments()
    ]);


    const cuestionario = new Cuestionario({
        usuario: uid,
        ...req.body
    });


    var listaEmails = []
    usuarios.forEach(data => {
        listaEmails.push(data.email)
    });

    try {

        const cuestionarioDB = await cuestionario.save();
        const url = "http://transformaciondigitalgih4pc.ups.edu.ec/validarIngreso/" + cuestionarioDB.id;
        res.json({
            ok: true,
            cuestionario: cuestionarioDB
        })
        mail.sendMails(listaEmails, url, cuestionario)
        // mail.sendMails('prhely.12.94@gmail.com',url,cuestionario)
        console.log(listaEmails)

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }
}

const actualizarCuestionarios = async (req, res = response) => {

    const id = req.params.id;
    console.log(id);
    try {

        // V--- THIS WAS ADDED
        Cuestionario.findByIdAndUpdate({ _id: id }, req.body, (err, doc) => {
            if (err) {
                res.json({
                    ok: false,
                    msg: 'No se pudo actualizar'
                })
            }
            console.log(doc);
        });

        res.json({
            ok: true,
            msg: 'Cuestionario Actualizado'
        })
    }
    catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: "No se puede actualizar este cuestionario"
        })
    }
}

const borrarCuestionarios = async (req, res = response) => {

    const id = req.params.id;
    //console.log(id)
    try {

        const cuestionario = await Cuestionario.findById(id);

        if (!cuestionario) {

            return res.status(404).json({
                ok: true,
                //msg: uid
                msg: 'Cuestionario no encontrado por id'
            });
        }

        await Cuestionario.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Cuestionario borrado'
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })

    }
}

module.exports = {
    getCuestionariosByIdUser,
    getListCuestionarios,
    getVerCuestionario,
    crearCuestionarios,
    actualizarCuestionarios,
    borrarCuestionarios,
    getListCuestionariosByProvincia,
    getListCuestionarioByInstitucion,
    getListCuestionarioByInstitucionTipoPersona,
    getListCuestionariosGeneral,
    enviarCorreoUsuario
}