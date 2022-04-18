const { response } = require('express');
const Noticia = require('../models/noticia.model');

const crearNoticia = async (req, res = response) => {
    const uid = req.uid;
    const noticia = new Noticia({
        usuario: uid,
        ...req.body
    });
    try {
        const noticiaDB = await noticia.save();
        res.json({
            ok: true,
            noticia: noticiaDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Consulte con el administrador'
        })
    }
}


const getListNoticias = async (req, res = response) => {
    const noticias = await Noticia.find();
    res.json({
        ok: true,
        noticias
    });
}

const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const uploadImage = (req, res = response) => {

    console.log(req.files);
    // Validamos que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }

    // Procesar la imagen...
    const file = req.files.imagen;
    //console.log(file);

    // Extraer el nombre del archivo
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    // Crear el Path para guardar la imagen
    const path = `./uploads/images/${nombreArchivo}`;

    // Mover la imagen
    file.mv(path, (err) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });

    });

}

const viewImage = (req, res = response) => {

    const nombrePdf = req.params.nombreImagen;
    

    const pathImg = path.join(__dirname, `../uploads/images/${ nombrePdf }`);

    // Imagen por defecto
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);

    } else {
        const pathImg = path.join(__dirname, `../images/no-image.png`);
        res.sendFile(pathImg);
    }
}

module.exports = {
    crearNoticia,
    getListNoticias,
    uploadImage,
    viewImage
}