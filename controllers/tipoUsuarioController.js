const { response } = require('express');
const TipoUsuario = require('../models/tipoUsuario_model');
const getListTipoUsuarios = async (req, res = response) => {

    const tiposUsuarios = await TipoUsuario.find();
    res.json({
        ok: true,
        tiposUsuarios
    })
}

const crearTipoUsuario = async (req, res = response) => {

    const tipoUsuario = new TipoUsuario({
        ...req.body
    });

    try {

        const tipoUsuarioDb = await tipoUsuario.save();
        res.json({
            ok: true,
            tipoUsuario: tipoUsuarioDb
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }
}


const eliminarTipoUsuario = async (req, res = response) => {

    const id = req.params.id;
    try {

        const tipoUsuario = await TipoUsuario.findById(id);

        if (!tipoUsuario) {

            return res.status(404).json({
                ok: true,
                msg: 'No se ha eliminado correctamente'
            });
        }

        await TipoUsuario.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Tipo Usuario eliminado exitosamente'
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
    getListTipoUsuarios,
    crearTipoUsuario,
    eliminarTipoUsuario,
}