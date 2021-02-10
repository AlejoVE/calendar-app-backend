/*
    Rutas de usuario / auth
    host + api/auth
*/

const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

const { createUser, userLogin, revalidateToken } = require('../controllers/auth');
const {validateInputs} = require('../middlewares/validate-inputs');
const {validateJWT} = require('../middlewares/validate-jwt')

router.post('/new', 
    [  //middleware
      check('name', 'Name is mandatory').not().isEmpty(),
      check('email', 'Email not valid').isEmail(),
      check('password', 'Password should contain at least 6 characters').isLength({min:6}),
      validateInputs
    ],
    createUser);

router.post('/',
    [
        check('email', 'email invalid').isEmail(),
        check('password', 'password should contain at least 6 characters').isLength({min:6}),
        validateInputs
    ],
    userLogin);

router.get('/renew', validateJWT, revalidateToken);

module.exports = router;