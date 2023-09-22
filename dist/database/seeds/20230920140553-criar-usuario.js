"use strict";const bcryptjs = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    queryInterface.bulkInsert(
      'users',
      [
        {
          nome: 'Benedito',
          email: 'benedito@email.com',
          password_hash: await bcryptjs.hash('123456', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: 'Benedito 2',
          email: 'benedito2@email.com',
          password_hash: await bcryptjs.hash('654321', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: 'Benedito 3',
          email: 'benedito3@email.com',
          password_hash: await bcryptjs.hash('987654321', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down() {

  },
};
