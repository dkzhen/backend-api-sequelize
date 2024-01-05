const dbConfig = require("../config/DatabaseConfig.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.DBNAME,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
  }
);

const Provider = {};

Provider.Sequelize = Sequelize;
Provider.sequelize = sequelize;

const ProductsModel = require("../models/ProductsModel.js")(sequelize);
const ProductAssetsModel = require("../models/ProductAssetsModel.js")(
  sequelize
);
const CategoriesModel = require("../models/CategoriesModel.js")(sequelize);

// relasi
ProductAssetsModel.belongsTo(ProductsModel, {
  foreignKey: "product_id",
  targetKey: "id",
});
ProductsModel.hasMany(ProductAssetsModel, {
  foreignKey: "product_id",
  sourceKey: "id",
});

ProductsModel.belongsTo(CategoriesModel, {
  foreignKey: "category_id",
  targetKey: "id",
});
CategoriesModel.hasMany(ProductsModel, {
  foreignKey: "category_id",
  sourceKey: "id",
});

// Ekspor semua yang diperlukan
Provider.ProductAssetsModel = ProductAssetsModel;
Provider.ProductsModel = ProductsModel;
Provider.CategoriesModel = CategoriesModel;

module.exports = Provider;
