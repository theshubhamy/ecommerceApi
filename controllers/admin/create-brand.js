//models
import Brand from "../../models/brand.js";

//helpers
import {validationErrorHandler} from "../../helpers/validation-error-handler.js";
import {clearImage} from "../../helpers/clear-image.js";

export const createNewBrand = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {name, description} = req.body;
  try {
    if (!req.file) {
      const error = new Error('No image provided');
      error.statusCode = 422;
      return next(error);
    }
    const imageUrl = req.file.path;
    const preExistingBrand = await Brand.findOne({
      where: {
        name,
        description
      }
    });
    if (preExistingBrand){
      clearImage(imageUrl);
      const error = new Error('Brand Already Exists');
      error.statusCode = 403;
      return next(error);
    }
    const response = await Brand.create({
      name,
      imageUrl,
      description,
    });
    res.status(201).json({
      message: "Brand created successfully",
      response
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
