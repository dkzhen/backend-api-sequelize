const Provider = require("../provider/DatabaseProvider");
const Products = Provider.ProductsModel;
const ProductAssets = Provider.ProductAssetsModel;
const Categories = Provider.CategoriesModel;
const Op = Provider.Sequelize.Op;

exports.createProducts = async (req, res) => {
  try {
    const { category_id, name, slug, price } = req.body;

    const newProduct = await Products.create({
      category_id,
      name,
      slug,
      price,
    });

    return res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Unable to create product",
    });
  }
};

exports.updateProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const { category_id, name, slug, price } = req.body;

    const updatedProduct = await Products.update(
      { category_id, name, slug, price },
      { where: { id } }
    );

    if (updatedProduct[0] === 1) {
      const updatedProductData = await Products.findByPk(id);
      return res
        .status(200)
        .json({ message: "Product updated", product: updatedProductData });
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Unable to update product",
    });
  }
};

exports.deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProductCount = await Products.destroy({ where: { id } });

    if (deletedProductCount === 1) {
      return res.status(200).json({ message: "Product deleted successfully" });
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Unable to delete product",
    });
  }
};

exports.findAll = async (req, res) => {
  const title = req.query.title;
  const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  await Products.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving product.",
      });
    });
};

exports.getAllProducts = async (req, res) => {
  try {
    let { sort, order } = req.query;
    const validSortColumns = ["id", "name", "price"];

    if (!sort || !validSortColumns.includes(sort)) {
      sort = "id";
      order = "asc";
    }

    const allProducts = await Products.findAll({
      include: [
        {
          model: Categories,
          attributes: ["id", "name"],
          as: "Category",
        },
        {
          model: ProductAssets,
          attributes: ["id", "image"],
          as: "Product_Assets",
        },
      ],
      order: [[sort, order === "asc" ? "ASC" : "DESC"]],
    });

    if (!allProducts || allProducts.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    const formattedProducts = allProducts.map((product) => {
      const category = product.Category
        ? { id: product.Category.id, name: product.Category.name }
        : null;

      const assets = product.Product_Assets.map((asset) => ({
        id: asset.id,
        image: asset.image,
      }));

      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        category,
        assets,
      };
    });

    return res.status(200).json({ products: formattedProducts });
  } catch (error) {
    return res.status(500).json({
      error: "Unable to fetch products",
      message: error.message,
    });
  }
};
