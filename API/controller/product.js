import Product from "../model/product.js";
import { productDAO, imageDAO } from "../repositories/index.js";

const createProduct = async (req, res) => {
  const { name, price, description, category } = req.body;
  try {
    const imageIDs = (
      await Promise.all(
        req.body.images.map((image) => {
          return imageDAO.createImage({
            url: image.imageBase64,
            caption: image.imageName,
            size: image.imageSize,
          });
        })
      )
    ).flat();
    const newProduct = await productDAO.createProduct({
      name,
      price,
      description,
      category,
      images: imageIDs,
    });
    console.log(newProduct);
    res.status(200).json(newProduct);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: error.toString(),
    });
  }
};
const getAllProducts = async (req, res) => {
  const listProduct = await productDAO.getAllProducts();
  try {
    if (listProduct.length > 0) {
      res.status(200).json(listProduct);
    } else {
      res.status(404).json({
        message: "not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};
const getProductByID = async (req, res) => {
  const id = req.params.id;
  const product = await productDAO.getProductByID(id);
  try {
    if (!product) {
      res.status(404).json({
        message: "not found",
      });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};
export default { createProduct, getAllProducts, getProductByID };
