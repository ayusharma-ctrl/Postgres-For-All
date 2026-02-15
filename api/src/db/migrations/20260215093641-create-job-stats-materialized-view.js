'use strict';

module.exports = {

  async up(queryInterface) {
    await queryInterface.sequelize.query(`
      CREATE MATERIALIZED VIEW job_stats_mv AS
      SELECT
        type,
        status,
        COUNT(*)::integer AS count
      FROM jobs
      GROUP BY type, status
    `);

    await queryInterface.sequelize.query(`
      CREATE UNIQUE INDEX idx_job_stats_mv
      ON job_stats_mv(type, status)
    `);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(`
      DROP MATERIALIZED VIEW IF EXISTS job_stats_mv
    `);
  }
};
