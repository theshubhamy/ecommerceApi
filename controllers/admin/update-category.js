//models
import Category from "../../models/category.js";

//helpers
import {validationErrorHandler} from "../../helpers/validation-error-handler.js";

export const updateExistingCategory = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {name, description} = req.body;
  try {
    const result = await Category.update({
      name,
      description
    }, {
      where: {
        id: req.params.categoryId
      }
    });
    if (result[0] === 0) {
      const error = new Error('Category not found');
      error.statusCode = 404;
      return next(error);
    }
    res.status(201).json({
      message: 'Category updated successfully'
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
