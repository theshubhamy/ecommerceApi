//models
import Coupon from "../../models/coupon.js";

export const getCoupons = async (req, res, next) => {
  try {
    const coupons = await Coupon.findAndCountAll({
      where: {
        isActive: true
      },
      raw: true
    });
    res.status(200).json({
      message: "Coupons fetched successfully",
      coupons
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
