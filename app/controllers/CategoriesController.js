const Provider = require("../provider/DatabaseProvider");
const Categories = Provider.CategoriesModel;
const Op = Provider.Sequelize.Op;

exports.createCategories = async (req, res) => {
  try {
    const { name } = req.body;

    const newCategories = await Categories.create({
      name,
    });

    return res.status(201).json({
      message: "Categories created successfully",
      categories: newCategories,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Unable to create categories",
    });
  }
};

exports.updateCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedCategories = await Categories.update(
      { name },
      { where: { id } }
    );

    if (updatedCategories[0] === 1) {
      const updatedCategoriesData = await Categories.findByPk(id);
      return res.status(200).json({
        message: "Categories updated",
        categories: updatedCategoriesData,
      });
    } else {
      return res.status(404).json({ message: "Categories not found" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Unable to update categories",
    });
  }
};

exports.deleteCategories = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategoriesCount = await Categories.destroy({ where: { id } });

    if (deletedCategoriesCount === 1) {
      return res
        .status(200)
        .json({ message: "Categories deleted successfully" });
    } else {
      return res.status(404).json({ message: "Categories not found" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Unable to delete categories",
    });
  }
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Categories.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories.",
      });
    });
};
