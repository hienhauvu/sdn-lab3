import Product from "../model/product.js";
const createProduct = async ({
  name,
  price,
  description,
  category,
  images,
}) => {
  try {
    const newProduct = await Product.create({
      name,
      price,
      description,
      category,
      images,
    });
    return newProduct;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const getAllProducts = async () => {
  try {
    const products = await Product.find()
      .populate("category")
      .exec();
    return products;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const getProductByID = async (id) => {
  try {
    const products = await Product.findById(id)
      .populate("category")
      .populate("images", "url caption")
      .exec();
    return products;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const addCommentToProduct = async (pid, comment) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      pid,
      {
        $push: { comments: comment },
      },
      { new: true }
    );
    console.log(updatedProduct);
    return updatedProduct;
  } catch (error) {
    throw new Error(error.toString());
  }
};

export default { createProduct, getAllProducts, getProductByID, addCommentToProduct };
