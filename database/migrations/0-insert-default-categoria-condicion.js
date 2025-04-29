'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('categoria', [
      { nombre: 'Auto', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Moto', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Vehículo utilitario', createdAt: new Date(), updatedAt: new Date() },
    ], {});


    await queryInterface.bulkInsert('condicion', [
      { nombre: 'Nuevo', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Usado', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categoria', null, {});
    await queryInterface.bulkDelete('condicion', null, {});
  }
};
