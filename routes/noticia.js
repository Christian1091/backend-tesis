const { Router } = require('express');
const { check } = require('express-validator');
const expressfileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jwt');
const { crearNoticia, getListNoticias, uploadImage, viewImage, actualizarNoticia, getListNoticiasByUserId } = require('../controllers/noticia.controller');
 
const router = Router();
router.use(expressfileUpload());
router.post('/nueva', validarJWT, crearNoticia);
router.put('/actualizar', validarJWT, actualizarNoticia);
router.get('/lista', getListNoticias);
router.get('/userId', validarJWT, getListNoticiasByUserId);

router.post('/upload', validarJWT, uploadImage);

router.get( '/view/:nombreImagen', viewImage);

module.exports = router;