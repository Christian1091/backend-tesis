const { response } = require('express');
const Area = require('../models/area.model');

const getListAreas = async (req, res = response) => {

    const areas = await Area.find();
    res.json({
        ok: true,
        areas
    })
}

const crearArea = async (req, res = response) => {

    const area = new Area({
        ...req.body
    });

    try {

        const areaDB = await area.save();
        res.json({
            ok: true,
            area: areaDB
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }
}


const eliminarArea = async (req, res = response) => {

    const id = req.params.id;
    try {

        const area = await Area.findById(id);

        if (!area) {

            return res.status(404).json({
                ok: true,
                msg: 'No se ha eliminado correctamente'
            });
        }

        await Area.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Area eliminada exitosamente'
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
    getListAreas,
    crearArea,
    eliminarArea,
}