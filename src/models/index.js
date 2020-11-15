const Sequelize = require('sequelize');
const config = require('../../../config/database');
const Intention = require('./Intention');
const User = require('./User');
const Message = require('./Message');

const sequelize = new Sequelize(config);

Intention.init(sequelize);
User.init(sequelize);
Message.init(sequelize);

Intention.associate(sequelize.models);
User.associate(sequelize.models);
Message.associate(sequelize.models);

module.exports = sequelize;