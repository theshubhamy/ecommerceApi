//packages
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//models
import User from "../../../models/user.js";

//helpers
import { validationErrorHandler } from "../../../helpers/validation-error-handler.js";

export const adminLoginEmail = async (req, res, next) => {
  validationErrorHandler(req, next);
  const { email, password } = req.body;
  try {
    const admin = await User.findOne({ where: { email, isAdmin: true } });
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
    }
    const id = admin["dataValues"]["id"];
    const name = admin["dataValues"]["name"];
    const phone = admin["dataValues"]["phone"];
    const token = jwt.sign({ id, phone }, process.env.TOKEN_SIGNING_KEY, {
      expiresIn: "1 day",
    });
    const refreshToken = jwt.sign(
      { id, phone, name },
      process.env.REFRESH_TOKEN_SIGNING_KEY
    );
    await User.update(
      { refreshToken: refreshToken },
      { where: { email, phone } }
    );
    res.status(201).json({
      msg: `Login with email Successful`,
      name: name,
      email: email,
      phone: phone,
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
