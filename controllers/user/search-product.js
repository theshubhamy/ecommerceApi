//models
import Product from "../../models/product.js";
import Sequelize from "sequelize";
//helpers
import { validationErrorHandler } from "../../helpers/validation-error-handler.js";
const Op = Sequelize.Op;
export const searchProducts = async (req, res, next) => {
  validationErrorHandler(req, next);

  try {
    const keyword = req.query.q.toLowerCase();

    const searchProducts = await Product.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: "%" + keyword + "%",
            },
          },
          {
            slug: {
              [Op.like]: "%" + keyword + "%",
            },
          },
          {
            description: {
              [Op.like]: "%" + keyword + "%",
            },
          },
          {
            category: {
              [Op.like]: "%" + keyword + "%",
            },
          },
          {
            brand: {
              [Op.like]: "%" + keyword + "%",
            },
          },
        ],
      },
    });

    res.status(200).json({
      message: "Search products fetched successfully",
      searchProducts,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
