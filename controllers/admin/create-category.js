//models
import Category from "../../models/category.js";

//helpers
import {validationErrorHandler} from "../../helpers/validation-error-handler.js";
import {clearImage} from "../../helpers/clear-image.js";

export const createNewCategory = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {name, description} = req.body;
  try {
    if (!req.file) {
      const error = new Error('No image provided');
      error.statusCode = 422;
      return next(error);
    }
    const imageUrl = req.file.path;
    const preExistingCategory = await Category.findOne({
      where: {
        name,
        description
      }
    });
    if (preExistingCategory){
      clearImage(imageUrl);
      const error = new Error('Category Already Exists');
      error.statusCode = 403;
      return next(error);
    }
    const response = await Category.create({
      name,
      imageUrl,
      description,
    });
    res.status(201).json({
      message: "Category created successfully",
      response
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
