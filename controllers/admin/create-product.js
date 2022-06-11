//models
import Product from "../../models/product.js";
import User from "../../models/user.js";

//helpers
import { validationErrorHandler } from "../../helpers/validation-error-handler.js";

//DB relations
User.hasMany(Product);

export const createNewAdminProduct = async (req, res, next) => {
  validationErrorHandler(req, next);
  const { title, price, costPrice, discount,brand,category, description, stock } = req.body;
  try {
    if (!req.files.image) {
      const error = new Error("No image provided");
      error.statusCode = 422;
      return next(error);
    }
    const imageUrl = req.files.image[0].path;

    const response = await Product.create({
      userId: req.userId,
      title,
      price,
      imageUrl,
      costPrice,
      discount,
      brand,
      category,
      description,
      stock,
    });
    res.status(201).json({
      message: "Product created successfully",
      response,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
