const Provider = require("../provider/DatabaseProvider");
const ProductsAssets = Provider.ProductAssetsModel;
const Products = Provider.ProductsModel;
const Op = Provider.Sequelize.Op;

exports.createProductAssets = async (req, res) => {
  try {
    const { product_id, image } = req.body;

    const newProductAssets = await ProductsAssets.create({
      product_id,
      image,
    });

    return res.status(201).json({
      message: "Product Assets created successfully",
      productAssets: newProductAssets,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Unable to create product assets",
    });
  }
};

exports.updateProductAssets = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_id, image } = req.body;

    const updatedProductAssets = await ProductsAssets.update(
      { product_id, image },
      { where: { id } }
    );

    if (updatedProductAssets[0] === 1) {
      const updatedProductAssetsData = await ProductsAssets.findByPk(id);
      return res.status(200).json({
        message: "Product Assets updated",
        productAssets: updatedProductAssetsData,
      });
    } else {
      return res.status(404).json({ message: "Product Assets not found" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Unable to update product assets",
    });
  }
};

exports.deleteProductAssets = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProductAssetsCount = await ProductsAssets.destroy({
      where: { id },
    });

    if (deletedProductAssetsCount === 1) {
      return res
        .status(200)
        .json({ message: "Product Assets deleted successfully" });
    } else {
      return res.status(404).json({ message: "Product Assets not found" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Unable to delete product assets",
    });
  }
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  ProductsAssets.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving product assets.",
      });
    });
};
exports.getAllProductAssetsWithProductName = async (req, res) => {
  try {
    const allProductAssets = await ProductsAssets.findAll({
      include: [
        {
          model: Products,
          attributes: ["id", "name"],
        },
      ],
    });

    if (!allProductAssets || allProductAssets.length === 0) {
      return res.status(404).json({ message: "No product assets found" });
    }

    // Mapping the fetched data to the desired response format
    const formattedProductAssets = allProductAssets.map((asset) => ({
      id: asset.id,
      product: {
        product_id: asset.Product.id,
        name: asset.Product.name,
      },
      image: asset.image, // Assuming "image" is the image field in ProductAssets
    }));

    return res.status(200).json({ productAssets: formattedProductAssets });
  } catch (error) {
    return res.status(500).json({
      error: "Unable to fetch product assets",
      message: error.message,
    });
  }
};
