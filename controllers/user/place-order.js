//DB operator
import pkg from "sequelize";
const {Op} = pkg;

//models
import Cart from "../../models/cart.js";
import CartProducts from "../../models/cart-products.js";
import User from "../../models/user.js";
import Order from "../../models/order.js";
import OrderProducts from "../../models/order-products.js";

//helpers
import {validationErrorHandler} from "../../helpers/validation-error-handler.js";

//DB relations
// User.hasMany(Order);
// Order.hasMany(OrderProducts);
// OrderProducts.belongsTo(Order);
// Cart.hasMany(CartProducts);
// CartProducts.belongsTo(Cart);
