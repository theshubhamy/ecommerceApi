//packages
import jwt from "jsonwebtoken";

//models
import User from "../../../models/user.js";

//helpers
import { validationErrorHandler } from "../../../helpers/validation-error-handler.js";

export const userLoginOtpVerification = async (req, res, next) => {
  validationErrorHandler(req, next);
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({
      where: { email, otp, isAdmin: false, isVerified: true },
      raw: true,
    });
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }
    const id = user["id"];
    const name = user["name"];
    const phone = user["phone"];
    const profileImageUrl = user["profileImageUrl"];
    const token = jwt.sign(
      { id, email, phone, name },
      process.env.TOKEN_SIGNING_KEY,
      {
        expiresIn: "1 day",
      }
    );
    const refreshToken = jwt.sign(
      { id, email, phone, name },
      process.env.REFRESH_TOKEN_SIGNING_KEY
    );
    await User.update(
      {
        token: token,
        refreshToken: refreshToken,
        otp: null,
      },
      { where: { email, phone } }
    );

    res.status(201).json({
      msg: `User Otp verification successful😊!`,
      name: name,
      email: email,
      phone: phone,
      profileImageUrl: profileImageUrl,
      token: token,
      refreshToken: refreshToken,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
