import jwt from "jsonwebtoken";

//importing driver model
import User from "../models/user.js";

export const isUser= async (req, res, next) => {
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
      return next(error);
    }
    const user = await User.findOne({where: {phone: decodedToken.phone}});
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      return next(error);
    }
    if(!user["dataValues"]["isVerified"]){
      const error = new Error('Not Verified Buyer');
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
