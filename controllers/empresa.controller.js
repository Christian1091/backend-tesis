const { response } = require('express');

const Empresa = require('../models/empresa.model');

const registrarEmpresa = async (req, res = response) => {
    const body = req.body;
    const empresa = new Empresa({ ...body });

    try {
        const empresaDb = await empresa.save();
        res.json({
            ok: true,
            empresa: empresaDb
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'error'
        });
    }
}

const getListEmpresas = async (req, res = response) => {
    const empresas = await Empresa.find();
    res.json({
        ok: true,
        empresas
    });
}

const eliminarEmpresa = async (req, res = response) => {
    const nombre = req.params.nombre;
    try {
        const empresa = await Empresa.findOne({ 'nombre': nombre });
        if (!empresa) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al eliminar'
            });
        }
        await empresa.delete();
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

module.exports = { registrarEmpresa, getListEmpresas, eliminarEmpresa };