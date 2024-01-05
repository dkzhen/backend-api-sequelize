const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/provider/DatabaseProvider");

const app = express();

// Menggunakan body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// middleware cors
app.use(cors());

// connect sequelize
db.sequelize
  .sync()
  .then(() => {
    console.log("Database Connected...");
  })
  .catch((err) => {
    console.log("Failed to connect database: " + err.message);
  });

// rute-rute API
app.get("/", (req, res) => {
  res.send("API is running");
});
require("./app/routes/ProductsRoute")(app);
require("./app/routes/ProductAssetsRoute")(app);
require("./app/routes/CategoriesRoute")(app);

// Menentukan port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
