const express = require("express");
const cors = require('cors');
const sequelize = require("./config/connection");
const routes = require("./routes/routes");
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/", routes);

app.listen(3030, () => {
  console.log("Listening on port:", 3030);
  sequelize
    .authenticate()
    .then(() => console.log("Connected to db"))
    .catch(err => console.log(err.message));
});
