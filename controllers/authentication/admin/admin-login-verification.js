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
    const admin = await User.findOne({ where: { email, otp, isAdmin: true } });
    if (!admin) {
      const error = new Error("Admin not found");
      error.statusCode = 404;
      return next(error);
    }
    const id = admin["dataValues"]["id"];
    const name = admin["dataValues"]["name"];
    const phone = admin["dataValues"]["phone"];
    const profileImageUrl = admin["dataValues"]["profileImageUrl"];
    const token = jwt.sign({ id, email }, process.env.TOKEN_SIGNING_KEY, {
      expiresIn: "1 day",
    });
    const refreshToken = jwt.sign(
      { id, email, name },
      process.env.REFRESH_TOKEN_SIGNING_KEY
    );
    await User.update(
      { isVerified: true, token: token, refreshToken: refreshToken, otp: null },
      { where: { email, phone } }
    );

    res.status(201).json({
      msg: `Admin verified successfully! Logging In.`,
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
