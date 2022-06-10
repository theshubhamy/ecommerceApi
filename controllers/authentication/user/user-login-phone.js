//packages
import jwt from "jsonwebtoken";

//models
import User from "../../../models/user.js";
//otp
import { generateOTP } from "../../../helpers/generate-otp.js";
import { sendOtp } from "../../../helpers/emailSendOtp.js";
//helpers
import { validationErrorHandler } from "../../../helpers/validation-error-handler.js";

export const userLoginPhone = async (req, res, next) => {
  validationErrorHandler(req, next);
  const { email } = req.body;
  try {
    const otp = Number.parseInt(generateOTP(6));
    const user = await User.findOne({
      where: { email, isAdmin: false, isVerified: true },
    });
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }
    const name = user["dataValues"]["name"];
    await User.update({ otp: otp }, { where: { email } });
    await sendOtp(name, email, otp);
    res.status(201).json({
      msg: `Please verify it's you. OTP sent to ${email}`,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
