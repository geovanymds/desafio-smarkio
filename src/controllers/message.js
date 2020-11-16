const Message = require("../models/Message");
const { Op, col, fn } = require("sequelize");
const sequelize = require("../models/index");
const parser = require("csvtojson");

exports.getAnalytics = async (req, res, next) => {
  try {

    let json = await parser().fromFile(
      __dirname + "/../public/csv/analytics.csv"
    );
    json = json[0];
    
    return res.status(200).send(json);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.countMessagesByUser = async (req, res, next) => {
  const { begin, end } = req.query;

  try {

    const qtd = await Message.count({
      distinct: "id",
      where: {
        date: {
          [Op.between]: [begin, end],
        },
      },
      group: ["user_id"],
    });

    return res.status(200).json(qtd);

  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.countMessagesByIntention = async (req, res, next) => {
  const { begin, end } = req.query;

  try {
    
    const qtd = await Message.count({
      distinct: "id",
      attributes: {
        include: [col('intnetions.name')]
      },
      where: {
        date: {
          [Op.between]: [begin, end],
        },
      },
      include: [
        {
          as:'messages_intention',
          model: sequelize.models.Intention,
          attributes: [col('intnetions.name')]
        }
      ],
      group: ["intention_id"],
    });

    return res.status(200).json(qtd);

  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.countMessages = async (req, res, next) => {

  const { begin, end,intention} = req.query;
  // const { intention } = req.param;

  try {
    
    const qtd = await Message.count({
      distinct: "id",
      where: {
        date: {
          [Op.between]: [begin, end],
        },
      },
      include: [
        {
          as:'messages_intention',
          model: sequelize.models.Intention,
          where: {
            name: intention
          }
        }
      ]
    });

    return res.status(200).json(qtd);

  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
