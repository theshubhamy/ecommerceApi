//models
import Coupon from "../../models/coupon.js";

//helpers
import {validationErrorHandler} from "../../helpers/validation-error-handler.js";

export const editCoupon = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {name, discountPercentage, description, isActive} = req.body;
  const couponId = req.params.couponId
  try {
    await Coupon.update({
      name,
      description,
      discountPercentage,
      isActive
    }, {
      where: {
        id: couponId
      }
    });
    res.status(201).json({
      message: "Coupon updated successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
