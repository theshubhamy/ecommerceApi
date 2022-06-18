import express from "express";

import { body } from "express-validator";

//controllers
import { changeAdministratorDetails } from "../controllers/admin/change-admin-details.js";
import { createNewAdminProduct } from "../controllers/admin/create-product.js";
import { createNewCategory } from "../controllers/admin/create-category.js";
import { createNewBrand } from "../controllers/admin/create-brand.js";
import { editAdminProduct } from "../controllers/admin/edit-product.js";
import { updateExistingCategory } from "../controllers/admin/update-category.js";
import { updateExistingBrand } from "../controllers/admin/update-brand.js";
import { updateFeaturedImageOfProduct } from "../controllers/admin/update-featured-image.js";
import { updateCategoryImage } from "../controllers/admin/update-category-image.js";
import { updateBrandImage } from "../controllers/admin/update-brand-image.js";
import { toggleUserStatus } from "../controllers/admin/toggle-user-status.js";
import { toggleProductParameters } from "../controllers/admin/toggle-product-parameters.js";
import { getAllUsers } from "../controllers/admin/get-all-users.js";
import { getAllBuyers } from "../controllers/admin/get-all-buyers.js";
import { getAllSellers } from "../controllers/admin/get-all-sellers.js";
import { getAllSellerProducts } from "../controllers/admin/get-seller-products.js";
import { getAllAdminProducts } from "../controllers/admin/get-admin-products.js";
import { getAllProducts } from "../controllers/admin/get-all-products.js";
import { getAllUserDetails } from "../controllers/admin/get-user-details.js";
import { addProductToCategory } from "../controllers/admin/add-product-to-category.js";
import { addProductToBrand } from "../controllers/admin/add-product-to-brand.js";
import { getAllBrandProducts } from "../controllers/admin/get-brand-products.js";
import { getAllCategoryProducts } from "../controllers/admin/get-category-products.js";
import { createCoupon } from "../controllers/admin/create-coupon.js";
import { toggleCoupon } from "../controllers/admin/toggle-coupon.js";
import { editCoupon } from "../controllers/admin/edit-coupon.js";
import { getCoupons } from "../controllers/admin/get-all-coupons.js";
import { getAllBrands } from "../controllers/admin/get-all-brand.js";
import { getAllCategory } from "../controllers/admin/get-all-category.js";
//middlewares
import { isAdministrator } from "../middleware/is-administrator.js";

const router = express.Router();

//GET ALL USER DETAILS OF A USER
router.get("/user-details/:userId", isAdministrator, getAllUserDetails);

//GET ALL PRODUCTS OF A BRAND
router.get("/brand-products/:brandId", isAdministrator, getAllBrandProducts);

//GET ALL PRODUCTS OF A CATEGORY
router.get(
  "/category-products/:categoryId",
  isAdministrator,
  getAllCategoryProducts
);

//GET ALL COUPONS
router.get("/coupons", isAdministrator, getCoupons);
//GET ALL brandS
router.get("/brands", isAdministrator, getAllBrands);
//GET ALL category
router.get("/category", isAdministrator, getAllCategory);
//GET ALL USERS
router.post(
  "/users",
  isAdministrator,
  [
    body("offset").trim().isInt().withMessage("Stock must be an integer"),
    body("limit").trim().isInt().withMessage("Stock must be an integer"),
  ],
  getAllUsers
);

// GET ALL PRODUCTS
router.post(
  "/all-products",
  isAdministrator,
  [
    body("offset").trim().isInt().withMessage("Stock must be an integer"),
    body("limit").trim().isInt().withMessage("Stock must be an integer"),
  ],
  getAllProducts
);

//GET ALL BUYERS
router.post(
  "/buyers",
  isAdministrator,
  [
    body("offset").trim().isInt().withMessage("Stock must be an integer"),
    body("limit").trim().isInt().withMessage("Stock must be an integer"),
  ],
  getAllBuyers
);

//GET ALL SELLERS
router.post(
  "/sellers",
  isAdministrator,
  [
    body("offset").trim().isInt().withMessage("Stock must be an integer"),
    body("limit").trim().isInt().withMessage("Stock must be an integer"),
  ],
  getAllSellers
);

//GET ALL SELLER'S PRODUCTS
router.post(
  "/seller-products/:sellerId",
  isAdministrator,
  [
    body("offset").trim().isInt().withMessage("Stock must be an integer"),
    body("limit").trim().isInt().withMessage("Stock must be an integer"),
  ],
  getAllSellerProducts
);

// GET ALL ADMIN PRODUCTS
router.post(
  "/my-products",
  isAdministrator,
  [
    body("offset").trim().isInt().withMessage("Stock must be an integer"),
    body("limit").trim().isInt().withMessage("Stock must be an integer"),
  ],
  getAllAdminProducts
);

//UPDATE ADMIN PROFILE
router.post(
  "/update-profile",
  isAdministrator,
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
  changeAdministratorDetails
);

//CREATE NEW PRODUCT
router.post(
  "/add-product",
  isAdministrator,
  [
    body("title")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("Title is required"),
    body("price")
      .isNumeric()
      .not()
      .isEmpty()
      .withMessage("Should be in a Decimal format"),
    body("costPrice")
      .isNumeric()
      .not()
      .isEmpty()
      .withMessage("Should be in a Decimal format"),
    body("discount")
      .isNumeric()
      .not()
      .isEmpty()
      .withMessage("Should be in a Decimal format"),
    body("brand")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("Brand is required"),
    body("category")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("Category is required"),
    body("description")
      .not()
      .isEmpty()
      .trim()
      .isLength({ min: 20 })
      .escape()
      .withMessage("Description is required"),
    body("stock").trim().isInt().withMessage("Stock must be an integer"),
  ],
  createNewAdminProduct
);

// CREATE NEW CATEGORY
router.post(
  "/add-category",
  isAdministrator,
  [
    body("name")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("Title is required"),
    body("description")
      .not()
      .isEmpty()
      .trim()
      .isLength({ min: 20 })
      .escape()
      .withMessage("Description is required"),
  ],
  createNewCategory
);

//CREATE NEW BRAND
router.post(
  "/add-brand",
  isAdministrator,
  [
    body("name")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("Title is required"),
    body("description")
      .not()
      .isEmpty()
      .trim()
      .isLength({ min: 20 })
      .escape()
      .withMessage("Description is required"),
  ],
  createNewBrand
);

//CREATE NEW COUPON
router.post(
  "/create-coupon",
  isAdministrator,
  [
    body("name")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("Name is required"),
    body("discountPercentage")
      .isNumeric()
      .not()
      .isEmpty()
      .withMessage("Should be in a Decimal format"),
    body("description")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("Description is required"),
    body("isActive")
      .not()
      .isEmpty()
      .isBoolean()
      .withMessage("This is a required boolean"),
  ],
  createCoupon
);

//ADD A PRODUCT TO A CATEGORY
router.post(
  "/add-product-to-category",
  isAdministrator,
  [
    body("productId")
      .isInt()
      .not()
      .isEmpty()
      .withMessage("ProductId is required"),
    body("categoryId")
      .isInt()
      .not()
      .isEmpty()
      .withMessage("CategoryId is required"),
  ],
  addProductToCategory
);

//ADD A PRODUCT TO A BRAND
router.post(
  "/add-product-to-brand",
  isAdministrator,
  [
    body("productId")
      .isInt()
      .not()
      .isEmpty()
      .withMessage("ProductId is required"),
    body("brandId").isInt().not().isEmpty().withMessage("BrandId is required"),
  ],
  addProductToBrand
);

//EDIT AN EXISTING PRODUCT
router.put(
  "/edit-product/:productId",
  isAdministrator,
  [
    body("title")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("Title is required"),
    body("price")
      .isNumeric()
      .not()
      .isEmpty()
      .withMessage("Should be in a Decimal format"),
    body("costPrice")
      .isNumeric()
      .not()
      .isEmpty()
      .withMessage("Should be in a Decimal format"),
    body("discount")
      .isNumeric()
      .not()
      .isEmpty()
      .withMessage("Should be in a Decimal format"),
    body("description")
      .not()
      .isEmpty()
      .trim()
      .isLength({ min: 20 })
      .escape()
      .withMessage("Description is required"),
    body("stock").trim().isInt().withMessage("Stock must be an integer"),
  ],
  editAdminProduct
);

//TOGGLE COUPON ACTIVENESS
router.put("/toggle-coupon/:couponId", isAdministrator, toggleCoupon);

//UPDATE EXISTING COUPON
router.put(
  "/update-coupon/:couponId",
  isAdministrator,
  [
    body("name")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("Name is required"),
    body("discountPercentage")
      .isNumeric()
      .not()
      .isEmpty()
      .withMessage("Should be in a Decimal format"),
    body("description")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("Description is required"),
    body("isActive")
      .not()
      .isEmpty()
      .isBoolean()
      .withMessage("This is a required boolean"),
  ],
  editCoupon
);

//EDIT AN EXISTING CATEGORY
router.put(
  "/edit-category/:categoryId",
  isAdministrator,
  [
    body("name")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("Title is required"),
    body("description")
      .not()
      .isEmpty()
      .trim()
      .isLength({ min: 20 })
      .escape()
      .withMessage("Description is required"),
  ],
  updateExistingCategory
);

//EDIT AN EXISTING BRAND
router.put(
  "/edit-brand/:brandId",
  isAdministrator,
  [
    body("name")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("Title is required"),
    body("description")
      .not()
      .isEmpty()
      .trim()
      .isLength({ min: 20 })
      .escape()
      .withMessage("Description is required"),
  ],
  updateExistingBrand
);

//EDIT FEATURED IMAGE OF AN EXISTING PRODUCT
router.put(
  "/edit-image/:productId",
  isAdministrator,
  updateFeaturedImageOfProduct
);

//EDIT CATEGORY IMAGE
router.put(
  "/edit-category-image/:categoryId",
  isAdministrator,
  updateCategoryImage
);

//EDIT BRAND IMAGE
router.put("/edit-brand-image/:brandId", isAdministrator, updateBrandImage);

//EDIT BUYER, SELLER, AUTHORIZATION STATUS OF A USER
router.patch(
  "/edit-user/:userId",
  isAdministrator,
  [
    body("isBuyer")
      .not()
      .isEmpty()
      .isBoolean()
      .withMessage("This is a required boolean"),
    body("isSeller")
      .not()
      .isEmpty()
      .isBoolean()
      .withMessage("This is a required boolean"),
    body("isAuthorized")
      .not()
      .isEmpty()
      .isBoolean()
      .withMessage("This is a required boolean"),
  ],
  toggleUserStatus
);

//EDIT PRODUCT PARAMETERS
router.patch(
  "/edit-product/:productId",
  isAdministrator,
  [
    body("isActive")
      .not()
      .isEmpty()
      .isBoolean()
      .withMessage("This is a required boolean"),
    body("isTrending")
      .not()
      .isEmpty()
      .isBoolean()
      .withMessage("This is a required boolean"),
    body("isDealOfTheDay")
      .not()
      .isEmpty()
      .isBoolean()
      .withMessage("This is a required boolean"),
  ],
  toggleProductParameters
);

export default router;
