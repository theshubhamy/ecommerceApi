//models
import Product from "../../models/product.js";

//helpers
import {validationErrorHandler} from "../../helpers/validation-error-handler.js";

export const getAllSellerProducts = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {offset, limit} = req.body;
  try {
    const products = await Product.findAndCountAll({
      where: {
        userId: req.params.sellerId
      },
      offset: parseInt(offset),
      limit: parseInt(limit),
    });
    res.status(200).json({
      message: 'Seller\'s products fetched successfully',
      products
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
