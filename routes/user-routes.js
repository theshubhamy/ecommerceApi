//packages
import express from "express";
import { body } from "express-validator";
//controllers
import { getAllCategory } from "../controllers/user/get-all-category.js";
import { getAllBrands } from "../controllers/user/get-all-brand.js";
import { addProductToCart } from "../controllers/user/add-product-to-cart.js";
import { removeProductFromCart } from "../controllers/user/remove-product-from-cart.js";
import { decreaseProductQuantityFromCart } from "../controllers/user/decrease-product-quantity-from-cart.js";
import { getCoupons } from "../controllers/user/get-coupons.js";
import { getAllProducts } from "../controllers/user/get-all-product.js";
import { DealOfTheDayProduct } from "../controllers/user/DealOfTheDay-product.js";
//controllers
import { changeUserDetails } from "../controllers/user/change-user-details.js";
import { fillUserDetails } from "../controllers/user/fill-user-details.js";
import { getProductDetails } from "../controllers/user/getProductDetails.js";
import { getProductById } from "../controllers/user/getProductById.js";
// import { placeOrder } from "../controllers/user/placeOrder.js";
//middleware
import { isUser } from "../middleware/is-user.js";
import { searchProducts } from "../controllers/user/search-product.js";

const router = express.Router();
//GET AVAILABLE COUPONS
router.get("/coupons", getCoupons);
router.get("/products", getAllProducts);
router.get("/product-details", getProductDetails);
router.get("/categories", getAllCategory);
router.get("/brands", getAllBrands);
router.get("/search-product", searchProducts);
router.get("/product-by-id", getProductById);
router.get("/deal-of-the-day-product", DealOfTheDayProduct);
//ADD PRODUCT TO CART
router.post("/add-product-to-cart", isUser, addProductToCart);

//REMOVE PRODUCT FROM CART
router.post(
  "/remove-product-from-cart/:productId",

  removeProductFromCart
);

//DECREASE PRODUCT QUANTITY FROM CART
router.post(
  "/decrease-product-quantity-cart/:productId",

  decreaseProductQuantityFromCart
);

//place orde
/** 
 * array of cartproduct, req.body
 * [{product id,title, quantity,discount,costprice,price},
 * {product id,title, quantity,discount,costprice,price}]
 * totalAmount, deliveryAddress, deliveryCity, deliveryPinCode, deliveryCountry
 * order table
 * userId, subTotalAmount,payableAmount,orderStatus,paymentId,paymentStatus

*/
// router.post("/place-order", isUser, placeOrder);
//
//UPDATE USER PROFILE
router.post(
  "/update-profile",
  isUser,
  [
    body("name")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("Name is required"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Should be in a valid email format"),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be 6 characters long"),
  ],
  changeUserDetails
);

//FILL USER DETAILS
router.post(
  "/fill-details",
  isUser,
  [
    body("address")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("address is required"),
    body("pincode")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("pincode is required"),
    body("state")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("state is required"),
    body("city")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("city is required"),
    body("country")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("country is required"),
  ],
  fillUserDetails
);

export default router;
