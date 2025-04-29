'use strict';

const fs = require('fs');
const path = require('path');
const modelosJsonPath = path.join(__dirname, '..', '..', 'data', 'modelos.json');

module.exports = {
  async up (queryInterface, Sequelize) {
    let modelos = [];
    try {
      const rawData = fs.readFileSync(modelosJsonPath, 'utf8');
      modelos = JSON.parse(rawData);
    } catch (error) {
      console.error('Error al leer o parsear el archivo modelos.json:', error);
      throw error;  
    }

    return queryInterface.bulkInsert('modelos', modelos.map(modelo => ({
      titulo: modelo.titulo,
      marca: modelo.marca,
      kilometraje: modelo.kilometraje,
      color: modelo.color,
      combustible: modelo.combustible,
      transmision: modelo.transmision,
      precio: modelo.precio,
      stock: modelo.stock,
      imagen: modelo.imagen,
      categoria_id: modelo.categoria_id,
      condicion_id: modelo.condicion_id,
      createdAt: new Date(),
      updatedAt: new Date()
    })), {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('modelos', null, {});
  }
};
