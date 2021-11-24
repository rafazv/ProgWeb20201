'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Usuarios', [
      {
        tipoUsuarioId: 1,
        nome: 'Admin',
        email: 'admin@email.com',
        senha: '$2a$10$MDAw0xgidl/1cAThm3wsRO54UpQfZmvA.Nytl0I9f9fqKGVSrRoOK',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Usuarios', null, {});
  }
};
