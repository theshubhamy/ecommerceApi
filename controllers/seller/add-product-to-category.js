//models
import CategoryProducts from "../../models/category-products.js";
import Product from "../../models/product.js";

//helpers
import {validationErrorHandler} from "../../helpers/validation-error-handler.js";

export const addSellerProductToCategory = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {productId, categoryId} = req.body;
  try{
    const isSellerProduct = await Product.findOne({
      where:{
        userId: req.userId
      }
    });
    if (!isSellerProduct){
      const error = new Error('This product doesn\'t belong to you');
      error.statusCode = 403;
      return next(error);
    }
    const preExistingProduct = await CategoryProducts.findOne({
      where:{
        productId,
        categoryId
      }
    });
    if (preExistingProduct){
      const error = new Error('Product has already been added to the category');
      error.statusCode = 403;
      return next(error);
    }
    await CategoryProducts.create({
      productId,
      categoryId
    });
    res.status(201).json({
      message: "Product added to category successfully"
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
