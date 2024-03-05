import mongoose, { Schema } from "mongoose";
const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "category required "],
      unique: [true, "must be unique: cate name"],
    },
    description: {
      type: String,
      required: [true, "category required"],
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("categories", categorySchema);
export default Category;
