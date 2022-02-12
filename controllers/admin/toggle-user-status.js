//models
import Product from "../../models/product.js";
import User from "../../models/user.js";

//helpers
import {validationErrorHandler} from "../../helpers/validation-error-handler.js";

export const toggleUserStatus = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {isBuyer, isSeller, isAuthorized} = req.body;
  try {
    await Product.update({
        isActive: isAuthorized
      },
      {
        where: {
          userId: req.params.userId
        }
      });
    const result = await User.update({
      isBuyer,
      isSeller,
      isAuthorized
    }, {
      where: {
        id: req.params.userId
      }
    });
    if (result[0] === 0) {
      const error = new Error('User not found');
      error.statusCode = 404;
      return next(error);
    }
    res.status(201).json({
      message: 'User updated successfully'
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
