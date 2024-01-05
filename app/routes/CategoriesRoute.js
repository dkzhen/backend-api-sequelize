const router = require("express").Router();
const CategoriesController = require("../controllers/CategoriesController");

module.exports = (app) => {
  router.post("/", CategoriesController.createCategories);
  router.get("/", CategoriesController.findAll);
  router.put("/:id", CategoriesController.updateCategories);
  router.delete("/:id", CategoriesController.deleteCategories);

  app.use("/api/categories", router);
};
