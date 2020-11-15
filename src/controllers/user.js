const User = require('../models/User');
const { Op } = require('sequelize');

exports.countUsers = async (req,res,next) => {

  const { begin, end} = req.query;

  try {

    const qtd = await User.count({distinct: 'id', where: {
      date: {
        [Op.between]:[begin,end]
      }
    }});

    return res.status(200).json(qtd);

  } catch(error) {
    if(!error.statusCode) {
      error.statusCode=500;
    }
    next(error);
  }
  
}