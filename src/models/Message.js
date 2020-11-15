'use strict';

const {
  Model, DataTypes
} = require('sequelize');

  class Message extends Model {

    static init (sequelize) {
      super.init(
        {
          text: DataTypes.TEXT,
          status: DataTypes.ENUM('nova','aprovada','corrigida'),
          date: DataTypes.DATE,
          user_id: DataTypes.INTEGER,
          intention_id: DataTypes.INTEGER
        },
        {sequelize, tableName: 'messages', underscored: true}
      )
    }

    static associate(models) {

      this.belongsTo(models.User,{
        as: 'messages_user',
        foreignKey: 'user_id'
      });

      this.belongsTo(models.Intention,{
        as: 'messages_intention',
        foreignKey: 'intention_id'
      });
          
    }
  };

module.exports = Message;

