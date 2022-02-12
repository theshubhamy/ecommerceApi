//packages
import express from 'express';
import {body} from 'express-validator';

//controllers
import {addProductToCart} from "../controllers/buyer/add-product-to-cart.js";
import {removeProductFromCart} from "../controllers/buyer/remove-product-from-cart.js";
import {decreaseProductQuantityFromCart} from "../controllers/buyer/decrease-product-quantity-from-cart.js";
import {getCoupons} from "../controllers/buyer/get-coupons.js";

//middleware
import {isBuyer} from "../middleware/is-buyer.js";

const router = express.Router();

//GET AVAILABLE COUPONS
router.get('/coupons', isBuyer, getCoupons);

//ADD PRODUCT TO CART
router.post('/add-product-to-cart', isBuyer, addProductToCart);

//REMOVE PRODUCT FROM CART
router.post('/remove-product-from-cart/:productId', isBuyer, removeProductFromCart);

//DECREASE PRODUCT QUANTITY FROM CART
router.post('/decrease-product-quantity-cart/:productId', isBuyer, decreaseProductQuantityFromCart);

export default router;
