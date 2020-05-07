const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;
const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {define: {timestamps: false}});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const User = sequelize.define("user", {
  username: {
    type: Sequelize.STRING,
  },
  visits: {
    type: Sequelize.INTEGER,
  },
});

app.get("/pageview", async (req, res) => {
    console.log({req, res})
});

app.get("/tables/users", async (req, res) => {
  User.findAll().then((users) => {
    console.log("All users:", JSON.stringify(users, null, 4));
  });
});

const server = app.listen(PORT, function () {
  var host = server.address().address;
  console.log("Example app listening at http://%s:%s", host, PORT);
});
