//models
import Product from "../../models/product.js";

//helpers
import {validationErrorHandler} from "../../helpers/validation-error-handler.js";

export const editSellerProduct = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {title, price, costPrice, discount, description, stock} = req.body;
  try {
    const result = await Product.update({
      title,
      price,
      costPrice,
      discount,
      description,
      stock,
    }, {
      where: {
        id: req.params.productId,
        userId: req.userId,
      }
    });
    if (result[0] === 0) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      return next(error);
    }
    res.status(201).json({
      message: 'Product updated successfully'
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
