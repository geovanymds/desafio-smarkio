'use strict';

const {
  Model, DataTypes
} = require('sequelize');

  class Intention extends Model {

    static init (sequelize) {
      super.init(
        {
          name: DataTypes.STRING,
          date: DataTypes.DATE
        },
        {sequelize, tableName: 'intentions', underscored: true}
      )
    }

    static associate(models) {

      this.hasMany(models.Message,{
        as: 'intention_messages',
        foreignKey: 'intention_id'
      });
          
    }
  };

module.exports = Intention;