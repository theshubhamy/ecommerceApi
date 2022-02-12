//models
import Brand from "../../models/brand.js";
import Product from "../../models/product.js";

//helpers
import {validationErrorHandler} from "../../helpers/validation-error-handler.js";

//DB relations
Brand.belongsToMany(Product,{through:'brand_products'});

export const getAllBrandProducts = async (req, res, next) => {
  validationErrorHandler(req, next);
  try {
    
    const brand = await Brand.findOne({
      where: {id: req.params.brandId},
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
      message: "Brand details fetched",
      brand
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
