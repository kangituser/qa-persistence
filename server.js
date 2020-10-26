const express = require("express");
const sequelize = require("./config/db");
const routes = require("./routes/routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/", routes);

app.listen(8080, () => {
  console.log("Listening on port:", 8080);
  sequelize
    .authenticate()
    .then(() => console.log("Connected to db"))
    .catch(err => console.log(err.message));
});