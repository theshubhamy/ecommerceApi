//models
import User from "../../../models/user.js";

export const adminLogout = async(req, res, next) => {
  try{
    const result = await User.update({
      refreshToken: null
    },{
      where:{
        id: req.userId
      }
    });
    if (result[0] === 0) {
      const error = new Error('User not found');
      error.statusCode = 404;
      return next(error);
    }
    res.status(201).json({
      message: 'User logged out successfully'
    });
  }catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
