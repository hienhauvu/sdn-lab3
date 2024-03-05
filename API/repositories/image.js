import Image from "../model/image.js";
// create image
const createImage = async ({ url, caption, size }) => {
  try {
    const newImage = await Image.create({
      url,
      caption,
      size,
    });
    // return newImage._id.toString();
    return newImage;
  } catch (error) {
    throw new Error(error.toString());
  }
};
export default { createImage };
//
