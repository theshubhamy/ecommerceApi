//models
import User from "../../models/user.js";
import UserDetail from "../../models/user-detail.js";

//helpers
import {validationErrorHandler} from "../../helpers/validation-error-handler.js";

//DB relations
User.hasOne(UserDetail);


export const getAllUserDetails = async (req, res, next) => {
  validationErrorHandler(req, next);
  try {
    const user = await User.findOne({
      where: {id: req.params.userId},
      attributes: {
        exclude: ['password', 'otp', 'refreshToken', 'createdAt', 'updatedAt']
      },
      include: [
        {
          model: UserDetail,
          attributes: {
            exclude: ['id', 'userId', 'createdAt', 'updatedAt']
          }
        }
      ]
    });
    res.status(200).json({
      message: "User details fetched",
      user
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
