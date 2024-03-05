import mongoose, { Schema } from "mongoose";
const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("comments", commentSchema);

export default Comment;
export {commentSchema};
