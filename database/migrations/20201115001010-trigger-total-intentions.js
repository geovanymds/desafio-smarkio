"use strict";

const upQuery = `CREATE TRIGGER chatbot.update_intent_total AFTER INSERT ON chatbot.messages FOR EACH ROW UPDATE chatbot.intentions i SET total=total+1 WHERE NEW.intention_id=i.id;`;

const downQuery = `
DROP TRIGGER IF EXISTS chatbot.update_intent_total;
`;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.query(upQuery);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.query(downQuery);
  },
};
