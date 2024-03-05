import { commentDAO } from "../repositories/index.js";
import { productDAO } from "../repositories/index.js";
const createComment = async (req, res) => {
  const { content, pid } = req.body;
  try {
    const product = await productDAO.getProductByID(pid);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    const newComment = await commentDAO.createComment(content);
    const updatedProduct = await productDAO.addCommentToProduct(
      pid,
      newComment
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};
export default { createComment };
