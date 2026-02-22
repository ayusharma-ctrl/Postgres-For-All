'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE jobs
      ADD COLUMN search_vector tsvector
      GENERATED ALWAYS AS (
        to_tsvector(
          'english',
          type || ' ' || payload::text
        )
      ) STORED
    `);

    await queryInterface.addIndex('jobs', ['search_vector'], {
      name: 'idx_jobs_search',
      using: 'GIN',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('jobs', 'idx_jobs_search');
    await queryInterface.removeColumn('jobs', 'search_vector');
  }
};
