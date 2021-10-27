const { response, json } = require('express');

const Cuestionario = require('../models/cuestionario.model');
const Respuesta = require('../models/respuesta.model');

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

    const cuestionario = new Cuestionario({
        usuario: uid,
        ...req.body
    });

    try {

        const cuestionarioDB = await cuestionario.save();

        res.json({
            ok: true,
            cuestionario: cuestionarioDB
        })

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
        Cuestionario.findByIdAndUpdate( {_id: id } , req.body, (err, doc) => {
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
            msg: "No se puede actualizar"
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
}