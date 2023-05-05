const mysql = require("mysql2/promise");
const { Sequelize, DataTypes } = require("sequelize");

// create db if it doesn't already exist
mysql.createConnection({ host:'localhost', port:'3306', user:'root', password:'password' }).then(async (res) => {
    await res.query(`CREATE DATABASE IF NOT EXISTS todo_app;`);
});

const sequelize = new Sequelize("todo_app", "root", "password", {
  host: "localhost",
  dialect: "mysql",
});

const Todo = sequelize.define("Todo", {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.error("Unable to sync database:", err);
  });

module.exports = { Todo };
