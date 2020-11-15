"use strict";

const { Model, DataTypes } = require("sequelize");

class Intention extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        date: DataTypes.DATE,
      },
      { sequelize, tableName: "intentions", underscored: true }
    );
  }

  static associate(models) {
    this.hasMany(models.Message, {
      as: "intention_messages",
      foreignKey: "intention_id",
    });
  }

  static getTrendQuery() {
    return `SELECT 100 * (COUNT(CASE WHEN status = 'aprovada' THEN 1 END) / COUNT(*)) AS percent, m.intention_id
    FROM chatbot.messages m WHERE m.date BETWEEN ? AND ? 
    GROUP BY m.intention_id ORDER BY percent DESC LIMIT 10;`;
  }
}

module.exports = Intention;
