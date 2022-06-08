const { response } = require('express');

const TipoPersona = require('../models/tipo_persona.model');

const registrarTipoPersona = async (req, res = response) => {
    const body = req.body;
    const tipoPersona = new TipoPersona({...body});

    try {
        const tipoPersonaDb = await tipoPersona.save();
        res.json({
            ok: true,
            tipoPersona: tipoPersonaDb
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'error'
        });
    }
}

const getListTiposPersona = async(req, res = response) => {
    const tiposPersonas = await TipoPersona.find();
    res.json({
        ok: true,
        tiposPersonas
    });
}


const eliminarTipoPersona = async (req, res = response) => {
    const tipo = req.params.tipo;
    try {
        const tipoPersona = await TipoPersona.findOne({ 'tipo': tipo });
        if (!tipoPersona) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al eliminar'
            });
        }
        await tipoPersona.delete();
        res.json({
            ok: true,
            msg: 'Empresa eliminada'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = { registrarTipoPersona, getListTiposPersona, eliminarTipoPersona };