'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('News', 'category', {
      type: Sequelize.STRING,
      allowNull: true, // Ubah sesuai kebutuhan, jika wajib bisa set ke false
      after: 'path', // Menentukan posisi field baru
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('News', 'category');
  }
};
