import mongoose, { Schema } from "mongoose";
const imageSchema = new Schema(
  {
    url: {
      type: String,
      required: [true, "url required "],
      unique: false,
    },
    caption: {
      type: String,
      required: [true, "caption required"],
    },
    size: {
      type: String,
      required: [true, "size required"],
    },
  },
  { timestamps: true }
);

const Image = mongoose.model("images", imageSchema);
export default Image;
export { imageSchema };

