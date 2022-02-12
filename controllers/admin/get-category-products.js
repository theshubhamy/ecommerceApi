//models
import Category from "../../models/category.js";
import Product from "../../models/product.js";

//helpers
import {validationErrorHandler} from "../../helpers/validation-error-handler.js";

//DB relations
Category.belongsToMany(Product,{through:'category_products'});

export const getAllCategoryProducts = async (req, res, next) => {
  validationErrorHandler(req, next);
  try {
    
    const category = await Category.findOne({
      where: {id: req.params.categoryId},
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      include: [
        {
          model: Product,
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        }
      ]
    });
    res.status(200).json({
      message: "Category details fetched",
      category
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
