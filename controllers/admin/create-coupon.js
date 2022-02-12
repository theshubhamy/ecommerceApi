//models
import Coupon from "../../models/coupon.js";

//helpers
import {validationErrorHandler} from "../../helpers/validation-error-handler.js";

export const createCoupon = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {name, discountPercentage, description, isActive} = req.body;
  try {
   
    const preExistingCoupon = await Coupon.findOne({
      where: {
        name,
        description,
        discountPercentage
      }
    });
    if (preExistingCoupon){
      const error = new Error('Coupon Already Exists');
      error.statusCode = 403;
      return next(error);
    }
    const response = await Coupon.create({
      name,
      discountPercentage,
      description,
      isActive
    });
    res.status(201).json({
      message: "Coupon created successfully",
      response
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
