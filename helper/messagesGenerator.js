const faker = require("faker");

const status = ["nova", "aprovada", "corrigida"];

function createMessages() {
  const messages = [];
  for (let i = 0; i < 200000; i++) {
    const message = {
      user_id: faker.random.number(10000),
      intention_id: faker.random.number(1000),
      status: faker.random.arrayElement(status),
      date: faker.date.between("2020-01-01", "2020-10-30"),
      text: faker.lorem.sentences(3),
    };
    messages.push(message);
  }
  return messages;
}

module.exports = createMessages;
