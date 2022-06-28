//models
import Product from "../../models/product.js";

//helpers
import { validationErrorHandler } from "../../helpers/validation-error-handler.js";

export const getAllProducts = async (req, res, next) => {
  validationErrorHandler(req, next);
  const { offset, limit } = req.body;
  try {
    const products = await Product.findAll();
    res.status(200).json({
      message: "All products fetched successfully",
      products,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
