"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("intentions", "total", {
      type: Sequelize.INTEGER,
      defaultValue: 0
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("intentions", "total");
  },
};
