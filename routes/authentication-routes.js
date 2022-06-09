import express from "express";

import { body } from "express-validator";
//admin signup
import { adminSignupPhone } from "../controllers/authentication/admin/admin-signup-phone.js";
import { adminSignupVerification } from "../controllers/authentication/admin/admin-signup-verification.js";
//userSignup
import { userSignupPhone } from "../controllers/authentication/user/user-signup-phone.js";
import { userSignupVerification } from "../controllers/authentication/user/user-signup-verification.js";
//user login
import { userLoginPhone } from "../controllers/authentication/user/user-login-phone.js";
import { userLoginEmail } from "../controllers/authentication/user/user-login-email.js";
//admin login
import { adminLoginEmail } from "../controllers/authentication/admin/admin-login-email.js";
import { adminLoginVerification } from "../controllers/authentication/admin/admin-login-verification.js";

import { adminLogout } from "../controllers/authentication/admin/admin-logout.js";
import { userLogout } from "../controllers/authentication/user/user-logout.js";
import { adminGetNewTokens } from "../controllers/authentication/admin/get-new-tokens.js";
import { userGetNewTokens } from "../controllers/authentication/user/get-new-tokens.js";

//middleware
import { isAdministrator } from "../middleware/is-administrator.js";
import { isUser } from "../middleware/is-user.js";

const router = express.Router();

//ADMIN SIGNUP USING otp
router.post(
  "/administrator/signup",
  [
    body("name").trim().not().isEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Should be in a valid email format"),
    body("phone")
      .trim()
      .isInt()
      .isLength({ min: 10, max: 12 })
      .withMessage("phone number must be an integer"),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Minimum 6 characters"),
  ],
  adminSignupPhone
);

//ADMIN Signup email  OTP verification
router.post(
  "/administrator/signup/otp-verification",
  [
    body("email").isEmail().withMessage("Should be in a valid email format"),
    body("otp")
      .trim()
      .isInt()
      .isLength({ min: 6 })
      .withMessage("OTP must be an integer and of 6 digits"),
  ],
  adminSignupVerification
);

//ADMIN LOGIN USING EMAIL + PASSWORD
router.post(
  "/administrator/login",
  [
    body("email").isEmail().withMessage("Should be in a valid email format"),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Minimum 6 characters"),
  ],
  adminLoginEmail
);
//ADMIN LOGin OTP verification
router.post(
  "/administrator/login/otp-verification",
  [
    body("email").isEmail().withMessage("Should be in a valid email format"),
    body("otp")
      .trim()
      .isInt()
      .isLength({ min: 6 })
      .withMessage("OTP must be an integer and of 6 digits"),
  ],
  adminLoginVerification
);
//USER LOGIN USING EMAIL + PASSWORD
router.post(
  "/user/login",
  [
    body("email")
      .isEmail()

      .withMessage("Should be in a valid email format"),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Minimum 6 characters"),
  ],
  userLoginEmail
);

//USER SIGNUP USING PHONE
router.post(
  "/user/signup",
  [
    body("name").trim().not().isEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Should be in a valid email format"),
    body("phone")
      .trim()
      .isInt()
      .isLength({ min: 10, max: 12 })
      .withMessage("phone number must be an integer"),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Minimum 6 characters"),
  ],
  userSignupPhone
);
//USER Signup email  OTP verification
router.post(
  "/user/signup/otp-verification",
  [
    body("email").isEmail().withMessage("Should be in a valid email format"),
    body("otp")
      .trim()
      .isInt()
      .isLength({ min: 6 })
      .withMessage("OTP must be an integer and of 6 digits"),
  ],
  userSignupVerification
);

//USER LOGIN USING PHONE + OTP
router.post(
  "/user/login/phone",
  [
    body("phone")
      .trim()
      .isInt()
      .isLength({ min: 10 })
      .withMessage("Phone must be an integer"),
    body("otp")
      .trim()
      .isInt()
      .isLength({ min: 6 })
      .withMessage("OTP must be an integer and of 6 digits"),
  ],
  userLoginPhone
);

//ADMIN GET NEW TOKENS
router.put(
  "/administrator/new-token",
  isAdministrator,
  [
    body("refreshToken")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Refresh token is required"),
  ],
  adminGetNewTokens
);

//USER GET NEW TOKENS
router.put(
  "/user/new-token",
  isUser,
  [
    body("refreshToken")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Refresh token is required"),
  ],
  userGetNewTokens
);

// ADMIN LOGOUT
router.put("/administrator/logout", isAdministrator, adminLogout);

// USER LOGOUT
router.put("/user/logout", isAdministrator, userLogout);

export default router;
