//models
import Brand from "../../models/brand.js";

//helpers
import {validationErrorHandler} from "../../helpers/validation-error-handler.js";

export const updateExistingBrand = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {name, description} = req.body;
  try {
    const result = await Brand.update({
      name,
      description
    }, {
      where: {
        id: req.params.brandId
      }
    });
    if (result[0] === 0) {
      const error = new Error('Brand not found');
      error.statusCode = 404;
      return next(error);
    }
    res.status(201).json({
      message: 'Brand updated successfully'
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
