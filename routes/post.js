/**
 * Blog
 * /api/post
 */
 const { Router } = require('express');
 const { check } = require('express-validator');
const { getPost, crearPost, actualizarPost, borrarPost, getPostByIdUser, getListPost } = require('../controllers/posts.controller');
 
 const { validarJWT } = require('../middlewares/validar-jwt');
 
 const router = Router();
 
 // Listar todos los post de todos los usuarios
 router.get( '/listPosts',  getListPost);
 
 // Listar cuestionario en los cards del usuario que esta autenticado
 router.get( '/userId', validarJWT, getPostByIdUser);
 
 /**Para implementar un middleware debemos mandar como segundo argumento 
  * y el tercero ya es el controlador, cuando vamos a implementar varios
  * middleware lo hacemos dentro de los corchetes
  */
 router.post( '/', validarJWT, crearPost );
 
 /**'/id' es para mandar el id del ususario que queremos actualizar */
 router.put( '/:id', validarJWT, actualizarPost );
 
 router.delete( '/:id',validarJWT, borrarPost);
 
 
 // Exportamos el router
 module.exports = router;