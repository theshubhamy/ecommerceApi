//packages
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//models
import User from "../../../models/user.js";

//helpers
import {validationErrorHandler} from "../../../helpers/validation-error-handler.js";


export const userLoginEmail = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {email, password} = req.body;
  try {
    const user = await User.findOne({where: {email}});
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      return next(error);
    }
    const isPwdEqual = await bcrypt.compare(password, user["dataValues"]["password"]);
    if (!isPwdEqual) {
      const error = new Error('Wrong Password');
      error.statusCode = 401;
      return next(error);
    }
    const id = user["dataValues"]["id"];
    const name = user["dataValues"]["name"];
    const phone = user["dataValues"]["phone"];
    const token = jwt.sign({id, phone}, process.env.TOKEN_SIGNING_KEY, {expiresIn: '1 day'});
    const refreshToken = jwt.sign({id, phone, name}, process.env.REFRESH_TOKEN_SIGNING_KEY);
    await User.update({refreshToken: refreshToken}, {where: {email, phone}});
    res.status(201).json({
      msg: `Login with email Successful`,
      token: token,
      refreshToken: refreshToken
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
