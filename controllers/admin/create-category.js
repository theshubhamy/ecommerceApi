//models
import Category from "../../models/category.js";

//helpers
import { validationErrorHandler } from "../../helpers/validation-error-handler.js";
import { clearImage } from "../../helpers/clear-image.js";

export const createNewCategory = async (req, res, next) => {
  validationErrorHandler(req, next);
  const { name, description } = req.body;
  try {
    let imageUrl = "";
    let iconUrl = "";
    if (req.files.image) {
      imageUrl = req.files.image[0].path;
    }
    if (req.files.icon) {
      iconUrl = req.files.icon[0].path;
    }
    const preExistingCategory = await Category.findOne({
      where: {
        name,
        description,
      },
    });
    if (preExistingCategory) {
      clearImage(imageUrl);
      clearImage(iconUrl);
      const error = new Error("Category Already Exists");
      error.statusCode = 403;
      return next(error);
    }
    const response = await Category.create({
      name,
      imageUrl,
      iconUrl,
      description,
      isActive: true,
      isFeatured: true,
    });
    res.status(201).json({
      message: "Category created successfully",
      response,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
