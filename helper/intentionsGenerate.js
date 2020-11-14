const faker = require('faker');

const intentions = [];

for(let i=0; i<1000; i++) {

  const intention = {
    name: faker.lorem.sentence(5),
    date: faker.date.between('2020-01-01','2020-10-30')
  }

  intentions.push(intention);
  
}

module.exports = intentions;