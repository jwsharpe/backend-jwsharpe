const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;
const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL);

const User = sequelize.define("user", {
  username: {
    type: Sequelize.STRING,
  },
  visits: {
    type: Sequelize.INTEGER,
  },
});

app.get("/pageview", async (req, res) => {
  // try {
  //     const client = await pool.connect()
  //     const result = await client.query('SELECT * FROM test_table');
  //     const results = { 'results': (result) ? result.rows : null};
  //     res.render('pages/db', results );
  //     client.release();
  // } catch (err) {
  //     console.error(err);
  //     res.send("Error " + err);
  // }
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
