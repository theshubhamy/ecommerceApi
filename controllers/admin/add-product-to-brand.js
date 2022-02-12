//models
import BrandProducts from "../../models/brand-products.js";

//helpers
import {validationErrorHandler} from "../../helpers/validation-error-handler.js";

export const addProductToBrand = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {productId, brandId} = req.body;
  try{
    const preExistingProduct = await BrandProducts.findOne({
      where:{
        productId,
        brandId
      }
    });
    if (preExistingProduct){
      const error = new Error('Product has already been added to the brand');
      error.statusCode = 403;
      return next(error);
    }
    await BrandProducts.create({
      productId,
      brandId
    });
    res.status(201).json({
      message: "Product added to brand successfully"
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
