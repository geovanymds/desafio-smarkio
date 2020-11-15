const express = require("express");
const bodyParser = require("body-parser");
const path = require ('path');
const sequelize = require('./models/index');
const routes = require('./routes');

class App {
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.static(path.join(__dirname, "public")));
    this.express.set("views", path.join(__dirname, "public"));
    this.express.engine("html", require("ejs").renderFile);
    this.express.set("view engine", "html");
    this.express.use(bodyParser.json());
  }

  async dbConnect() {
    try {
      await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
  }

  routes() {

    const {
      messageRouter,
      userRouter,
      intentionRouter
    } = routes;

    this.express.use("/main", (req, res) => {
      res.render("index.html");
    });

    this.express.use("/messages",messageRouter);
    this.express.use("/users",userRouter);
    this.express.use("/intentions",intentionRouter);

    this.express.use((error, req, res, next) => {
      console.log(error);
      let status = 500;
      status = error.statusCode;
      const message = error.message;
      res.status(status).json({ message });
    });
  }
}

module.exports = new App().express;
