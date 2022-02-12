//models
import CategoryProducts from "../../models/category-products.js";

//helpers
import {validationErrorHandler} from "../../helpers/validation-error-handler.js";

export const addProductToCategory = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {productId, categoryId} = req.body;
  try{
    const preExistingProduct = await CategoryProducts.findOne({
      where:{
        productId,
        categoryId
      },
      raw: true
    });
    console.log(preExistingProduct);
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
