const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

const { registrarTipoPersona, getListTiposPersona, eliminarTipoPersona  } = require('../controllers/tipo_persona.controller');

router.post('/registrar', validarJWT, registrarTipoPersona);
router.get('/tipos', validarJWT, getListTiposPersona);
router.delete('/:tipo',validarJWT, eliminarTipoPersona);

module.exports = router;