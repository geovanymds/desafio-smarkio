'use strict';

const {
  Model, DataTypes
} = require('sequelize');

  class User extends Model {

    static init (sequelize) {
      super.init(
        {
          name: DataTypes.STRING,
          email: DataTypes.STRING,
          date: DataTypes.DATE
        },
        {sequelize, tableName: 'Users', underscored: true}
      )
    }

    static associate(models) {
      
    }
  };

module.exports = User;
