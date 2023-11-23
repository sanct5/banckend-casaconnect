const express = require('express');
const router = express.Router();
const { check } = require('express-validator'); 
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/authController.js');
const {listarUsuarios} = require('../controllers/usersController.js');
const { validarCampos } = require('../middlewares/validar-campos.js');
const { validarJWT } = require('../middlewares/validar-token.js')

router.post('/', loginUsuario)

router.post(
    '/new', 
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', "la clave debe tener al menos 6 digitos").isLength({ min: 6}),
        validarCampos
    ],
    crearUsuario 
)

router.get('/renew', validarJWT, revalidarToken)

router.get('/', listarUsuarios)

module.exports = router;