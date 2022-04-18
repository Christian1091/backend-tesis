const { Router } = require('express');
const { check } = require('express-validator');
const expressfileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jwt');
const { crearNoticia, getListNoticias, uploadImage, viewImage } = require('../controllers/noticia.controller');
 
const router = Router();
router.use(expressfileUpload());
router.post('/nueva', validarJWT, crearNoticia);

router.get('/lista', validarJWT, getListNoticias);

router.post('/upload', validarJWT, uploadImage);

router.get( '/view/:nombreImagen', viewImage);

module.exports = router;