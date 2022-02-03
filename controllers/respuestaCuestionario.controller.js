const { response } = require('express');

const respuestaCuestionario = require('../models/respuestaCuestionario');
const cuestionario = require('../models/cuestionario.model')

const crearRespuestaCuestionario = async ( req, res = response ) => {

    let body = req.body;
    //console.log(body);

    try {

        let respuesta = new respuestaCuestionario ({
            nombreParticipante: body.nombreParticipante,
            correoParticipante: body.correoParticipante,
            institucionParticipante: body.institucionParticipante,
            provinciaParticipante: body.provinciaParticipante,
            ciudadParticipante: body.ciudadParticipante,
            fechaCreacion: body.fecha,
            puntosTotales: body.puntosTotales,
            cuestionarioId: body.idCuestionario,
            listRespuestasUsuario: body.listRespuestaUsuario
        })

        //console.log(this.respuesta);

        const respuestaUsuarioCuestionarioDB = await respuesta.save();

        res.json({
            ok:true,
            //msg: 'Guardando respuesta ususario',
            respuestaCuestionario: respuestaUsuarioCuestionarioDB
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }
}

// Este get es para visualizar publicamente
const getRespuestaUsuario = async ( req, res = response ) => {

    const rtUsuarioid = req.params.id;     
    //console.log(rtUsuarioid)
    const respuestaUsuario = await respuestaCuestionario.findById( rtUsuarioid );
    const cuest = await cuestionario.findById(respuestaUsuario.cuestionarioId);
    res.json({
        ok: true,
        //msg: 'Ver respuestas'
        respuestaUsuario,
        puntaje:cuest.puntajeCuestionario,
    })
}

// Este get es para visualizar publicamente  
const getResponseByEnterprise  = async ( req, res = response ) => {
    const listaRespuestas = [];
    const nameE = req.params.id;
    const testAnswers = await respuestaCuestionario.find({ institucionParticipante:nameE });
    testAnswers.forEach(r => {
        listaRespuestas.push(r.listRespuestasUsuario);
    })
    res.json({
        ok: true,
        listaRespuestas
    })
}




// Este get es para visualizar los cuestionarios creados por el usuario ya autenticado en los cards
const getRespuestaByIdCuestionario = async ( req, res = response ) => {

    const id = req.params.id;
    //const uid = req.uid;    
    //console.log(uid)
    const respuestaByIdCuestionario = await respuestaCuestionario.find({cuestionarioId: id})//.populate('usuario', 'nombre')
                                        ;//.populate('hospital', 'nombre img')
    res.json({
        ok: true,
        //msg: 'Estadisticas'
        respuestaByIdCuestionario
    })
}



const borrarRespuestaUsuario = async( req, res = response ) => {

    
    const id = req.params.id;

    try {
       
        const respuestaUsuario = await respuestaCuestionario.findById( id );

        if( !respuestaUsuario ) {
            return res.status(404).json({
                ok: false,
                msg: 'Respuesta Usuario no encontrado por el id'
            });
        }

        await respuestaCuestionario.findByIdAndDelete( id );

       res.json({
           ok: true,
           msg: 'Respuesta Usuario eliminado'
           
       });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

module.exports = {
    crearRespuestaCuestionario,
    getRespuestaUsuario,
    getRespuestaByIdCuestionario,
    borrarRespuestaUsuario,
    getResponseByEnterprise
}