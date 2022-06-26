//DB operator
import pkg from "sequelize";
const {Op} = pkg;

//models
import Cart from "../../models/cart.js";
import CartProducts from "../../models/cart-products.js";
import Product from "../../models/product.js";
import Coupon from "../../models/coupon.js";

//helpers
import {validationErrorHandler} from "../../helpers/validation-error-handler.js";

//DB relations
Cart.hasMany(CartProducts);
CartProducts.belongsTo(Cart);

export const addProductToCart = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {productId, quantity} = req.body;
  try {
    const product = await Product.findOne({
      where: {
        id: productId,
        isActive: true,
        stock: {
          [Op.gte]: quantity
        }
      },
      attributes: ['price', 'discount'],
      raw: true
    });
    if (!product) {
      const error = new Error('No such product found or stock is less');
      error.statusCode = 404;
      return next(error);
    }
    const preExistingCart = await Cart.findOne({
      where: {
        userId: req.userId
      },
      raw: true,
      include: [
        {
          model: CartProducts,
          attributes: {
            where: {
              productId
            },
            exclude: ['cartId', 'createdAt', 'updatedAt']
          },
        },
        {
         model: Coupon
        }
      ]
    });
    console.log(preExistingCart);
    if (!preExistingCart) {
      const result = await Cart.create({
          userId: req.userId,
          amount: (product["price"] - product["discount"]) * quantity,
          cart_products: {
            productId: productId,
            quantity: quantity
          },
        }, {
          include: CartProducts
        }
      );
      return res.status(201).json({
        message: "New cart created and Product added to cart",
        cart: result["dataValues"]
      });
    }
    await Cart.update({
      amount: preExistingCart["amount"] + (product["price"] - product["discount"]) * quantity,
    }, {
      where: {
        userId: req.userId
      },
    });
    const preExistingCartProduct = await CartProducts.findOne({
      where: {
        productId
      },
      attributes: ['id', 'productId', 'quantity'],
      raw: true
    });
    if (!preExistingCartProduct) {
      await CartProducts.create({
        cartId: preExistingCart["id"],
        productId,
        quantity
      });
      return res.status(201).json({
        message: "Product Added to cart"
      });
    }
    await CartProducts.update({
      quantity: preExistingCartProduct["quantity"] + quantity
    }, {
      where: {
        cartId: preExistingCart["id"],
        productId
      }
    });
    res.status(201).json({
      message: "Product Added to cart"
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
