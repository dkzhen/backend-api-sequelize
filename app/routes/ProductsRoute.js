const router = require("express").Router();
const ProductsController = require("../controllers/ProductsController");

module.exports = (app) => {
  router.post("/", ProductsController.createProducts);
  router.get("/", ProductsController.getAllProducts);
  router.put("/:id", ProductsController.updateProducts);
  router.delete("/:id", ProductsController.deleteProducts);

  app.use("/api/products", router);
};
