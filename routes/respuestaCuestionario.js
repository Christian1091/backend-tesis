/**
 * respuestaCuestionarios
 * /api/respuestaCuestionarios
 */
const { Router } = require('express');
const { check } = require('express-validator');
const {
    crearRespuestaCuestionario,
    getRespuestaUsuario,
    getRespuestaByIdCuestionario,
    getRespuestasCuestionariosTodo,
    getRespuestaByIdCuestionarioEstadisticas,
    borrarRespuestaUsuario
} = require('../controllers/respuestaCuestionario.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get('/:id', getRespuestaUsuario);

router.get('/', getRespuestasCuestionariosTodo);

router.get('/estadisticas/:id', validarJWT, getRespuestaByIdCuestionario);

router.get('/estadisticasPreguntas/:id', validarJWT, getRespuestaByIdCuestionarioEstadisticas);

router.post('/', crearRespuestaCuestionario);

router.delete('/:id', validarJWT, borrarRespuestaUsuario);


// Exportamos el router
module.exports = router;