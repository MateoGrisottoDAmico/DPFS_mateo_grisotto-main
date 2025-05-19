'use strict';

const fs = require('fs');
const path = require('path');
const userJsonPath = path.join(__dirname, '..', '..', 'data', 'users.json');

module.exports = {
  async up (queryInterface, Sequelize) {
    let users = [];
    try {
      const rawData = fs.readFileSync(userJsonPath, 'utf8');
      users = JSON.parse(rawData);
    } catch (error) {
      console.error('Error al leer o parsear el archivo users.json:', error);
      throw error;  
    }

    return queryInterface.bulkInsert('users', users.map(usuario => ({
        nombre: usuario.nombre,
        apellido: usuario.apellido, 
        email: usuario.email,
        telefono: usuario.telefono,
        password: usuario.password,
        role: usuario.role,
      // createdAt: new Date(),
      // updatedAt: new Date()
    })), {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
