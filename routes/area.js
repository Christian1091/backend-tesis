const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

const {crearArea, getListAreas } = require('../controllers/area.controller');
router.get( '/areas', validarJWT, getListAreas );
router.post( '/crear', validarJWT, crearArea);

module.exports = router; 

