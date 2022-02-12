//packages
import jwt from "jsonwebtoken";

//models
import User from "../../../models/user.js";

//helpers
import {validationErrorHandler} from "../../../helpers/validation-error-handler.js";

export const userGetNewTokens = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {refreshToken} = req.body;
  try {
    const user = await User.findOne({
        where: {
          id: req.userId,
          refreshToken
        }
      }
    );
    if (!user) {
      const error = new Error('user not found');
      error.statusCode = 404;
      return next(error);
    }
    const id = user["dataValues"]["id"];
    const name = user["dataValues"]["name"];
    const phone = user["dataValues"]["phone"];
    const token = jwt.sign({id, phone}, process.env.TOKEN_SIGNING_KEY, {expiresIn: '1 day'});
    const newRefreshToken = jwt.sign({id, phone, name}, process.env.REFRESH_TOKEN_SIGNING_KEY);
    await User.update({refreshToken: newRefreshToken},{
      where:{
        id: req.userId,
        refreshToken: refreshToken
      }
    });
    res.status(201).json({
      msg: `Token Exchange successful`,
      token: token,
      refreshToken: newRefreshToken
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
