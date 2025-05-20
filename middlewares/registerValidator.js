const { body } = require('express-validator');
const db = require('../database/models');
const path = require('path');

const registerValidator = [
  body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),

  body('apellido')
    .notEmpty().withMessage('El apellido es obligatorio')
    .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),

  body('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe ser un email válido')
    .custom(async (email) => {
      const user = await db.User.findOne({ where: { email } });
      if (user) {
        return Promise.reject('El correo ya está registrado');
      }
    }),

  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),

  body('foto')
    .custom((value, { req }) => {
      if (!req.file) {
        throw new Error('La imagen es obligatoria');
      }
      const extensionesPermitidas = ['.jpg', '.jpeg', '.png', '.gif'];
      const ext = path.extname(req.file.originalname).toLowerCase();
      if (!extensionesPermitidas.includes(ext)) {
        throw new Error('El archivo debe ser una imagen válida (JPG, JPEG, PNG, GIF)');
      }
      return true;
    })
];

module.exports = { registerValidator };
