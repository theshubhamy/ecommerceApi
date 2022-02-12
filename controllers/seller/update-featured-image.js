//models
import Product from "../../models/product.js";

//helpers
import {clearImage} from "../../helpers/clear-image.js";

export const updateFeaturedSellerProductImage = async (req, res, next) => {
  try {
    if (!req.file) {
      const error = new Error('No image provided');
      error.statusCode = 422;
      return next(error);
    }
    const imageUrl = req.file.path;
    const product = await Product.findOne({
      where:{
        id: req.params.productId,
        userId: req.userId
      }
    });
    if (!product) {
      clearImage(imageUrl);
      const error = new Error('No such product found');
      error.statusCode = 404;
      return next(error);
    }
    if (imageUrl !== product["dataValues"]["imageUrl"]) { //new image was uploaded
      clearImage(product["dataValues"]["imageUrl"]);
    }
    await Product.update({
      imageUrl
    }, {
      where: {
        id: req.params.productId,
        userId: req.userId,
      }
    });
    res.status(201).json({
      message: "Product featured image updated"
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
