//packages
import express from 'express';
import {body} from 'express-validator';

//controllers
import {changeUserDetails} from "../controllers/user/change-user-details.js";
import {fillUserDetails} from "../controllers/user/fill-user-details.js";
import {uploadGst} from "../controllers/user/upload-gst.js";

//middleware
import {isUser} from "../middleware/is-user.js";

const router = express.Router();

//UPDATE USER PROFILE
router.post('/update-profile', isUser, [
  body('name').not().isEmpty().trim().escape().withMessage("Name is required"),
  body('email').isEmail().normalizeEmail().withMessage("Should be in a valid email format"),
  body('password').trim().isLength({min: 6}).withMessage("Password must be 6 characters long")
], changeUserDetails);

//FILL USER DETAILS
router.post('/fill-details', isUser, [
  body('businessName').not().isEmpty().trim().escape().withMessage("businessName is required"),
  body('businessType').not().isEmpty().trim().escape().withMessage("businessType is required"),
  body('address').not().isEmpty().trim().escape().withMessage("address is required"),
  body('pincode').not().isEmpty().trim().escape().withMessage("pincode is required"),
  body('state').not().isEmpty().trim().escape().withMessage("state is required"),
  body('city').not().isEmpty().trim().escape().withMessage("city is required"),
  body('country').not().isEmpty().trim().escape().withMessage("country is required"),
], fillUserDetails);

//UPLOAD GST FILE
router.put('/upload-gst', isUser, uploadGst);

export default router;
