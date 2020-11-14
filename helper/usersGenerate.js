const faker = require("faker");

const users = [];

for (let i = 0; i < 10000; i++) {
  const firstName = faker.name.findName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email(firstName, lastName).toLowerCase();

  const user = {
    name: firstName + lastName,
    email: email,
    date: faker.date.between("2020-01-01", "2020-10-30"),
  };

  users.push(user);
}

module.exports = users;
