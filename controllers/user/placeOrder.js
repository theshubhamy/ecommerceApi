import Product from "../../models/product.js";
import Razorpay from "razorpay";
import Order from "../../models/order.js";

let instance = new Razorpay({
  key_id: process.env.RPAY_KEY_ID,
  key_secret: process.env.RPAY_KEY_SECRET,
});
export const placeOrder = async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findOne({
      where: { id: productId },
      raw: true,
    });
    let payableAmount = product.costPrice;
    var options = {
      amount: payableAmount * 100, // amount in the smallest currency unit
      currency: "INR",
    };
    instance.orders.create(options, function (err, order) {
      res.status(200).json({
        message: "order placed!",
        productData: product,
        orderData: order,
      });
    });
    const response = await Order.create({
      userId: req.userId,
      subTotalAmount,
      payableAmount,
      deliveryAddress,
      deliveryCity,
      deliveryPinCode,
      deliveryCountry,
      isOrdered: true,
    });
    res.status(201).json({
      message: "Order placed successfully",
      response,
    })
  } catch (error) {
    if (!error.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

function createOrder(amount) {
  let ord;
  var instance = new Razorpay({
    key_id: process.env.RPAY_KEY_ID,
    key_secret: process.env.RPAY_KEY_SECRET,
  });
  var options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency: "INR",
  };
  instance.orders.create(options, function (err, order) {
    ord = order.id;
  });
  return ord;
}
