"use strict";

const users = require("../../helper/usersGenerate");
const intentions = require("../../helper/intentionsGenerate");
const createMessages = require("../../helper/messagesGenerator");

async function insertMessages(queryInterface,times) {

  const result = [];

  for(let i = 0; i<times; i++) {
    const messages = createMessages();
    const response = await queryInterface.bulkInsert("messages", messages);
    result.push(response);
  }

  return result;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.bulkInsert("users", users),
      await queryInterface.bulkInsert("intentions", intentions),
      ...await insertMessages(queryInterface,5),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.bulkDelete("users", null, {}),
      await queryInterface.bulkDelete("intentions",  null, {}),
      await queryInterface.bulkDelete("messages",  null, {}),
    ]);
  },
};
