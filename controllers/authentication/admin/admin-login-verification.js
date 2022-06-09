//packages
import jwt from "jsonwebtoken";

//models
import User from "../../../models/user.js";

//helpers
import { validationErrorHandler } from "../../../helpers/validation-error-handler.js";

export const adminLoginVerification = async (req, res, next) => {
  validationErrorHandler(req, next);
  const { email, otp } = req.body;

  try {
    const admin = await User.findOne({
      where: { email, otp, isAdmin: true, isVerified: true },
      raw: true,
    });
    if (!admin) {
      const error = new Error("Admin not found");
      error.statusCode = 404;
      return next(error);
    }
    const id = admin["id"];
    const name = admin["name"];
    const phone = admin["phone"];
    const profileImageUrl = admin["profileImageUrl"];
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
      msg: `Admin verified successfully! Logging in...`,
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
