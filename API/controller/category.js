import { categoryDAO } from "../repositories/index.js";

const getAllCategory = async (req, res) => {
  const listCate = await categoryDAO.getAllCategory();
  try {
    if (listCate.length > 0) {
      res.status(200).json(listCate);
    } else {
      res.status(404).json({
        message: "Not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};

export default { getAllCategory };
