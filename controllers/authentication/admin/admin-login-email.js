//packages

import bcrypt from "bcryptjs";

//models
import User from "../../../models/user.js";
import { generateOTP } from "../../../helpers/generate-otp.js";
import { sendOtp } from "../../../helpers/emailSendOtp.js";
//helpers
import { validationErrorHandler } from "../../../helpers/validation-error-handler.js";

export const adminLoginEmail = async (req, res, next) => {
  validationErrorHandler(req, next);
  const { email, password } = req.body;
  const otp = Number.parseInt(generateOTP(6));
  try {
    const admin = await User.findOne({
      where: { email, isAdmin: true, isVerified: true },
    });
    if (!admin) {
      const error = new Error("Admin not found");
      error.statusCode = 404;
      return next(error);
    }
    const isPwdEqual = await bcrypt.compare(
      password,
      admin["dataValues"]["password"]
    );
    if (!isPwdEqual) {
      const error = new Error("Wrong Password");
      error.statusCode = 401;
      return next(error);
    } else {
      const name = admin["dataValues"]["name"];
      const phone = admin["dataValues"]["phone"];
      
      await User.update({ otp: otp }, { where: { email, phone } });
      await sendOtp(name, email,  otp);
      
      res.status(201).json({
        msg: `Please verify it's you. OTP sent to ${email}`,
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
