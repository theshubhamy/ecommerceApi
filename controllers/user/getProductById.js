//models
import Product from "../../models/product.js";
import Sequelize from "sequelize";
//helpers
import { validationErrorHandler } from "../../helpers/validation-error-handler.js";
const Op = Sequelize.Op;
export const getProductById = async (req, res, next) => {
  validationErrorHandler(req, next);

  try {
    const productId = req.query.id;

    const Products = await Product.findOne({
      where: {
        id: productId,
      },
    });

    res.status(200).json({
      message: "Products fetched successfully",
      Products,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
