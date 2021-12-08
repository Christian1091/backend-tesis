/**
 * respuestaCuestionarios
 * /api/respuestaCuestionarios
 */
 const { Router } = require('express');
 const { check } = require('express-validator');
const { getCuestionariosByIdUser } = require('../controllers/cuestionarios.controller');
 const { crearRespuestaCuestionario, getRespuestaUsuario, getRespuestaByIdCuestionario, borrarRespuestaUsuario, getResponseByEnterprise } = require('../controllers/respuestaCuestionario.controller');
 const { validarCampos } = require('../middlewares/validar-campos');
 
 const { validarJWT } = require('../middlewares/validar-jwt');
 
 const router = Router();

 router.get( '/:id', getRespuestaUsuario);

 router.get( '/estadisticas/:id', validarJWT, getRespuestaByIdCuestionario);

 router.get( '/estadisticas/:id', validarJWT, getRespuestaByIdCuestionario);

 router.post( '/', crearRespuestaCuestionario );
 
 router.delete( '/:id',validarJWT, borrarRespuestaUsuario);

 router.get( '/estadistica/:id', validarJWT, getResponseByEnterprise);
 
 // Exportamos el router
 module.exports = router;