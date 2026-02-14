'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('jobs', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },

      type: {
        type: Sequelize.STRING,
        allowNull: false
      },

      payload: {
        type: Sequelize.JSONB,
        allowNull: false
      },

      status: {
        type: Sequelize.STRING,
        defaultValue: 'pending'
      },

      attempts: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },

      max_attempts: {
        type: Sequelize.INTEGER,
        defaultValue: 3
      },

      run_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },

      locked_at: Sequelize.DATE,

      last_error: Sequelize.TEXT,

      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },

      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });

    await queryInterface.addIndex('jobs', ['status', 'run_at'], {
      name: 'idx_jobs_fetch',
    });
    await queryInterface.addIndex('jobs', ['type'], {
      name: 'idx_jobs_type',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('jobs', 'idx_jobs_fetch');
    await queryInterface.removeIndex('jobs', 'idx_jobs_type');
    await queryInterface.dropTable('jobs');
  }
};
