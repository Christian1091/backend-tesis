const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

const { registrarEmpresa, getListEmpresas, eliminarEmpresa  } = require('../controllers/empresa.controller');

router.post('/registrar', validarJWT, registrarEmpresa);
router.get('/empresas', getListEmpresas);
router.delete( '/:nombre', validarJWT, eliminarEmpresa );


module.exports = router;