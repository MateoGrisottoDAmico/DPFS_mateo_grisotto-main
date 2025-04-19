const {check} = require("express-validator");

const loginValidator = [
    check('email').notEmpty().withMessage('Debes ingresar un email').bail()
    .isEmail().withMessage('El dato ingresado no es valido'),
    
    check('password').notEmpty().withMessage('Debes ingresar una contraseña').bail()
    .isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres')
];

module.exports={loginValidator};