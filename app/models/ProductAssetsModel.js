const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const ProductAssets = sequelize.define(
    "Product_Assets",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "Product_assets",
      timestamps: false,
    }
  );

  return ProductAssets;
};
