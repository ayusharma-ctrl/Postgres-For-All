'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'rate_limits',
      {
        key: {
          type: Sequelize.STRING,
          primaryKey: true
        },
        count: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        window_start: {
          type: Sequelize.DATE,
          allowNull: false
        }
      }
    );

    await queryInterface.addIndex('rate_limits', ['window_start']);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('rate_limits');
  }
};
