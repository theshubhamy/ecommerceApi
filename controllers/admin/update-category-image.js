//models
import Category from "../../models/category.js";

//helpers
import {clearImage} from "../../helpers/clear-image.js";

export const updateCategoryImage = async (req, res, next) => {
  try {
    if (!req.file) {
      const error = new Error('No image provided');
      error.statusCode = 422;
      return next(error);
    }
    const imageUrl = req.file.path;
    const category = await Category.findByPk(req.params.categoryId);
    if (!category) {
      clearImage(imageUrl);
      const error = new Error('No such category found');
      error.statusCode = 404;
      return next(error);
    }
    if (imageUrl !== category["dataValues"]["imageUrl"]) { //new image was uploaded
      clearImage(category["dataValues"]["imageUrl"]);
    }
    await Category.update({
      imageUrl
    }, {
      where: {
        id: req.params.categoryId,
      }
    });
    res.status(201).json({
      message: "Category featured image updated"
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
