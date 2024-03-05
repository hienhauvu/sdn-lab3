import Comment from "../model/comment.js";

const getAllCommentByProductID = async (id) => {
  try {
    const cate = await Comment.find().exec();
    return cate;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const createComment = async (content) => {
  try {
    const newComment = await Comment.create({
      text: content,
      rate: 0, 
      author: "user",
    });

    return newComment;
  } catch (error) {
    throw new Error(error.toString());
  }
};
export default { getAllCommentByProductID, createComment };
//
