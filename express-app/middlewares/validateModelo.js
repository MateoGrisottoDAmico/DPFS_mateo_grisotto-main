const { body } = require("express-validator");
const db = require("../database/models");
const path = require("path");

module.exports = [
  body("titulo")
    .notEmpty().withMessage("El nombre es obligatorio")
    .isLength({ min: 5 }).withMessage("Debe tener al menos 5 caracteres"),

  body("marca")
    .notEmpty().withMessage("La marca es obligatoria"),

  body("kilometraje")
    .notEmpty().withMessage("El kilometraje es obligatorio")
    .isNumeric().withMessage("El kilometraje debe ser un número"),

  body("color")
    .notEmpty().withMessage("El color es obligatorio"),

  body("combustible")
    .notEmpty().withMessage("El tipo de combustible es obligatorio"),

  body("transmision")
    .notEmpty().withMessage("La transmisión es obligatoria"),

  body("precio")
    .notEmpty().withMessage("El precio es obligatorio")
    .isNumeric().withMessage("El precio debe ser un número"),

  body("stock")
    .notEmpty().withMessage("El stock es obligatorio")
    .isInt({ min: 0 }).withMessage("El stock debe ser un número entero mayor o igual a 0"),

  body("imagen").custom((value, { req }) => {
    if (req.file) {
      const ext = path.extname(req.file.originalname).toLowerCase();
      const validExts = ['.jpg', '.jpeg', '.png', '.gif'];
      if (!validExts.includes(ext)) {
        throw new Error('Debe subir una imagen válida: JPG, JPEG, PNG o GIF');
      }
    }
    return true;
  }),

  body("categoria").custom(async value => {
    const categoria = await db.Categoria.findByPk(value);
    if (!categoria) {
      throw new Error("Categoría inválida");
    }
    return true;
  }),

  body("condicion").custom(async value => {
    const condicion = await db.Condicion.findByPk(value);
    if (!condicion) {
      throw new Error("Condición inválida");
    }
    return true;
  })
];
