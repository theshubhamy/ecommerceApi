//models
import Coupon from "../../models/coupon.js";

//helpers
import {validationErrorHandler} from "../../helpers/validation-error-handler.js";

export const toggleCoupon = async (req, res, next) => {
  validationErrorHandler(req, next);
  const couponId = req.params.couponId;
  try {
    const preExistingCoupon = await Coupon.findOne({
      where: {
        id: couponId
      },
      raw: true
    });
    if (!preExistingCoupon) {
      const error = new Error('Coupon Not Found');
      error.statusCode = 404;
      return next(error);
    }
    await Coupon.update({
      isActive: !preExistingCoupon["isActive"]
    }, {
      where: {
        id: couponId
      }
    });
    res.status(201).json({
      message: "Coupon updated successfully"
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
