//models
import Cart from "../../models/cart.js";
import CartProducts from "../../models/cart-products.js";
import Product from "../../models/product.js";

//helpers
import {validationErrorHandler} from "../../helpers/validation-error-handler.js";

//DB relations
Cart.hasMany(CartProducts);
CartProducts.belongsTo(Cart);

export const decreaseProductQuantityFromCart = async (req, res, next) => {
  validationErrorHandler(req, next);
  const productId = req.params.productId;
  try {
    const product = await Product.findOne({
      where: {
        id: productId,
        isActive: true,
      },
      attributes: ['price', 'discount'],
      raw: true
    });
    const cart = await Cart.findOne({
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
          }
        }
      ]
    });
    if (!cart) {
      const error = new Error('User cart not found');
      error.statusCode = 404;
      return next(error);
    }
    if (cart["cart_products.quantity"] === 1) {
      await CartProducts.destroy({
        where: {
          cartId: cart["id"],
          productId
        }
      });
      await Cart.update({
        amount: cart["amount"] - (product["price"] - product["discount"]),
      }, {
        where: {
          userId: req.userId
        }
      });
      return res.status(201).json({
        message: "Product Quantity was 1 hence cart item was destroyed from cart"
      });
    }
    await CartProducts.update({
      quantity: cart["cart_products.quantity"] - 1
    }, {
      where: {
        cartId: cart["id"],
        productId
      }
    });
    await Cart.update({
      amount: cart["amount"] - (product["price"] - product["discount"])
    }, {
      where: {
        userId: req.userId
      }
    });
    res.status(201).json({
      message: "Product Quantity decreased from cart"
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
