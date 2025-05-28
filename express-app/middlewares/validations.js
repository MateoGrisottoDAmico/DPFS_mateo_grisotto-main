const { body } = require('express-validator');
const db = require('../database/models');

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
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
    .withMessage('La contraseña debe contener mayúsculas, minúsculas, números y caracteres especiales'),

  body('foto')
    .custom((value, { req }) => {
      if (req.file) {
        const extensionesAceptadas = ['.jpg', '.jpeg', '.png', '.gif'];
        const ext = require('path').extname(req.file.originalname).toLowerCase();
        if (!extensionesAceptadas.includes(ext)) {
          throw new Error('Solo se permiten archivos JPG, JPEG, PNG y GIF');
        }
      }
      return true;
    }),
];

const loginValidator = [
  body('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe ser un email válido'),

  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
];

module.exports = {
  registerValidator,
  loginValidator
};
