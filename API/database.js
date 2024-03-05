import mongoose from "mongoose";
import Comment from "./model/comment.js";
import Image from "./model/image.js";
import Category from "./model/category.js";
import Product from "./model/product.js";


const connectDB = async () => {
  try {
    const db = mongoose.connect(process.env.URI_MONGODB);
    console.log("Connect successfully!");
    await Comment.init(), Image().init, Category().init, Product().init;
    console.log("Schema mapping success");
    
    return db;
  } catch (error) {
    console.log(error.toString());
    throw new Error(error.toString());
  }
};
export default connectDB;
