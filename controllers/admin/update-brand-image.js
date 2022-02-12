//models
import Brand from "../../models/brand.js";

//helpers
import {clearImage} from "../../helpers/clear-image.js";

export const updateBrandImage = async (req, res, next) => {
  try {
    if (!req.file) {
      const error = new Error('No image provided');
      error.statusCode = 422;
      return next(error);
    }
    const imageUrl = req.file.path;
    const brand = await Brand.findByPk(req.params.brandId);
    if (!brand) {
      clearImage(imageUrl);
      const error = new Error('No such brand found');
      error.statusCode = 404;
      return next(error);
    }
    if (imageUrl !== brand["dataValues"]["imageUrl"]) { //new image was uploaded
      clearImage(brand["dataValues"]["imageUrl"]);
    }
    await Brand.update({
      imageUrl
    }, {
      where: {
        id: req.params.brandId,
      }
    });
    res.status(201).json({
      message: "Brand featured image updated"
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
