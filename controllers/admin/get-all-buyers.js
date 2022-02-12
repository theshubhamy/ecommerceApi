//models
import User from "../../models/user.js";

//helpers
import {validationErrorHandler} from "../../helpers/validation-error-handler.js";

export const getAllBuyers = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {offset, limit} = req.body;
  try{
    const users = await User.findAndCountAll({
      where:{
        isBuyer: true,
        isAdmin:false
      },
      offset:parseInt(offset),
      limit: parseInt(limit),
      attributes:{
        exclude:['password', 'otp', 'refreshToken']
      }
    });
    res.status(200).json({
      message: 'Buyers fetched successfully',
      users
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
