//models
import Product from "../../models/product.js";
import Sequelize from "sequelize";
//helpers
import { validationErrorHandler } from "../../helpers/validation-error-handler.js";
const Op = Sequelize.Op;
export const getProductDetails = async (req, res, next) => {
  validationErrorHandler(req, next);

  try {
    const keyword = req.query.slug;
    const Products = await Product.findAll({
      limit: 1,
      where: {
        slug: keyword,
      },
    });

    res.status(200).json({
      message: "Search products fetched successfully",
      Products,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
