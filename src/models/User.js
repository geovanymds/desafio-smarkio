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
        {sequelize, tableName: 'users', underscored: true}
      )
    }

    static associate(models) {

      this.hasMany(models.Message,{
        as: 'user_messages',
        foreignKey: 'user_id'
      });
          
    }
  };

module.exports = User;
