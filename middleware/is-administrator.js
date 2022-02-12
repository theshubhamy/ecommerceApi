import jwt from "jsonwebtoken";

//importing driver model
import User from "../models/user.js";

export const isAdministrator = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  try {
    if (!authHeader) {
      const err = new Error("Not authorized");
      err.statusCode = 401;
      return next(err);
    }
    const token = authHeader.split(' ')[1]; //Authorization header looks like {Authorization: 'Bearer ' + this.props.token}
    let decodedToken;
    decodedToken = jwt.verify(token, process.env.TOKEN_SIGNING_KEY);
    if (!decodedToken) {
      const error = new Error('Not Authorized');
      error.statusCode = 401;
      next(error);
    }
    const administrator = await User.findOne(
      {
        where:
          {
            phone: decodedToken.phone,
            isAdmin: true
          }
      }
    );
    if (!administrator) {
      const error = new Error('Administrator not found');
      error.statusCode = 404;
      next(error);
    }
    if (!administrator["dataValues"]["isVerified"]) {
      const error = new Error('Not Verified Administrator');
      error.statusCode = 403;
      return next(error);
    }
    req.userId = decodedToken.id;
    req.phone = decodedToken.phone;
    next();
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
