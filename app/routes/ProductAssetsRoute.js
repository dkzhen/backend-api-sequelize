const router = require("express").Router();
const ProductAssetsController = require("../controllers/ProductAssetsController");

module.exports = (app) => {
  router.post("/", ProductAssetsController.createProductAssets);
  router.get("/", ProductAssetsController.getAllProductAssetsWithProductName);
  router.put("/:id", ProductAssetsController.updateProductAssets);
  router.delete("/:id", ProductAssetsController.deleteProductAssets);

  app.use("/api/product-assets", router);
};
