'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('News', 'path', {
      type: Sequelize.STRING,
      allowNull: true, // Sesuaikan jika path harus wajib diisi
      after: 'image', // Menempatkan kolom 'path' setelah kolom 'image'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('News', 'path');
  }
};
