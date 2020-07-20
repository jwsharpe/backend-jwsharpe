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

app.get("/gitview", async (req, res) => {
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
  const [ user ] = await User.findOrCreate({
    where: { username: ip },
    defaults: { visits: 0 },
  });
  const syncedUser = await user.increment("git_visits", { by: 1 });
  const { username, gitVisits } = syncedUser;
  console.log(`${username}: ${gitVisits} visit(s).`);
  console.log('host ', req.headers.host)
  res.send(`${gitVisits} visit(s).`);
});

app.get("/pageview", async (req, res) => {
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
  const [ user ] = await User.findOrCreate({
    where: { username: ip },
    defaults: { visits: 0 },
  });
  const syncedUser = await user.increment("visits", { by: 1 });
  const { username, visits } = syncedUser;
  console.log(`${username}: ${visits} visit(s).`);
  console.log('host ', req.headers.host)
  res.send(`${visits} visit(s).`);
});

const server = app.listen(PORT, function () {
  var host = server.address().address;
  console.log("Example app listening at http://%s:%s", host, PORT);
});
