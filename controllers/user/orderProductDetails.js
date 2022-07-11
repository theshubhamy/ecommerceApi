import OrderProducts from "../../models/order-products";
import { validationErrorHandler } from "../../helpers/validation-error-handler.js";
export const orderProductDetails = async (req, res, next) => {
  validationErrorHandler(req, next);
  const { paymentId, orderId } = req.body;
  try {
    const orderProducts = await OrderProducts.findAll({
      where: {
        orderId: orderId,
      },
    });
    res.status(200).json({
      message: "order Products fetched successfully",
      orderProducts,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
