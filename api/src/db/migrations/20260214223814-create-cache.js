'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cache', {
      key: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      value: {
        type: Sequelize.JSONB,
        allowNull: false
      },
      expires_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });

    await queryInterface.addIndex('cache', ['expires_at'], {
      name: 'idx_cache_fetch',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('cache', 'idx_cache_fetch');
    await queryInterface.dropTable('cache');
  }
};
