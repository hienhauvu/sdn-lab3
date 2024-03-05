import mongoose, { Schema } from "mongoose";
import { commentSchema } from "./comment.js";
import { imageSchema } from "./image.js";
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required "],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    images: [imageSchema],
    comments: [commentSchema],
    category: {
      type: Schema.Types.ObjectId,
      ref: "categories",
      require: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("products", productSchema);
export default Product;
