const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Categories = sequelize.define(
    "Categories",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "Categories",
      timestamps: false,
    }
  );

  return Categories;
};
