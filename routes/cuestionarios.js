/**
 * Cuestionarios
 * /api/cuestionarios
 */
 const { Router } = require('express');
 const { check } = require('express-validator');
 const { crearCuestionarios, 
         actualizarCuestionarios, 
         borrarCuestionarios, 
         getCuestionariosByIdUser, 
         getVerCuestionario, getListCuestionarios, getRespuestas, getListCuestionarioByInstitucionTipoPersona, getListCuestionariosByProvincia, getListCuestionarioByInstitucion } = require('../controllers/cuestionarios.controller');
 const { validarCampos } = require('../middlewares/validar-campos');
 
 const { validarJWT } = require('../middlewares/validar-jwt');
 
 const router = Router();
 
 /**Mostrar en los card los cuestioanrios creados por el usuario que se autentico */
 router.get( '/', validarJWT, getCuestionariosByIdUser );

 router.get( '/list-cuestionarios', getListCuestionarios );

 router.get( '/list-cuestionarios-provincia/:provincia', getListCuestionariosByProvincia );
 router.get( '/list-cuestionarios-institucion/:institucion', getListCuestionarioByInstitucion );
 router.get( '/list-cuestionarios-institucion-tipo/:institucion/:tipo', getListCuestionarioByInstitucionTipoPersona );
 

 //router.get( '/ver-cuestionario/:id', validarJWT, getVerCuestionario );
 router.get( '/ver-cuestionario/:id', getVerCuestionario );
 
 /**Para implementar un middleware debemos mandar como segundo argumento 
  * y el tercero ya es el controlador, cuando vamos a implementar varios
  * middleware lo hacemos dentro de los corchetes
  */
 router.post( '/', validarJWT, crearCuestionarios );
 
 /**'/id' es para mandar el id del ususario que queremos actualizar */
 router.put( '/:id', [], actualizarCuestionarios );
 
 router.delete( '/:id',validarJWT, borrarCuestionarios);
 
 
 // Exportamos el router
 module.exports = router;