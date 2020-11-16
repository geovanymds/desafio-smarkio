const Intention = require('../models/Intention');
const Message = require('../models/Message');
const { Op, fn, col, models } = require('sequelize');
const sequelize = require("../models/index");

exports.trendIntentions = async (req,res,next) => {

  const { begin, end} = req.query;

  try {
    
    const result = await sequelize.query(
      Intention.getTrendQuery(),{
      replacements: [begin,end]
    });

    let response = [...result[0]];

    return res.status(200).json(response);

  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }

}
