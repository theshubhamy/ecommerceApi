//packages
import jwt from "jsonwebtoken";

//models
import User from "../../../models/user.js";

//helpers
import { validationErrorHandler } from "../../../helpers/validation-error-handler.js";

export const adminLoginPhone = async (req, res, next) => {
  validationErrorHandler(req, next);
  const { phone, otp } = req.body;
  try {
    const admin = await User.findOne({ where: { phone, otp, isAdmin: true } });
    if (!admin) {
      const error = new Error("Admin not found");
      error.statusCode = 404;
      return next(error);
    }
    const id = admin["dataValues"]["id"];
    const name = admin["dataValues"]["name"];
    const token = jwt.sign({ id, phone }, process.env.TOKEN_SIGNING_KEY, {
      expiresIn: "1 day",
    });
    const refreshToken = jwt.sign(
      { id, phone, name },
      process.env.REFRESH_TOKEN_SIGNING_KEY
    );
    await User.update(
      { isVerified: true, refreshToken: refreshToken, otp: null },
      { where: { phone } }
    );
    res.status(201).json({
      msg: `Phone number ${phone} verified successfully`,
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
