const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;
const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  define: { underscored: true },
  pool: {
    max: 20,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

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
    defaultValue: 1,
  },
});

app.get("/pageview", async (req, res) => {
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
  User.findOrCreate({ where: { username: ip }, defaults: { visits: 0 } }).then(
    ([user, created]) => {
      return user.increment("visits", { by: 1 });
    }
  );
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
