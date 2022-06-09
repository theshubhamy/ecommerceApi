//models
import User from "../../models/user.js";

//helpers
import { validationErrorHandler } from "../../helpers/validation-error-handler.js";

export const getAllUsers = async (req, res, next) => {
  validationErrorHandler(req, next);
  const { offset, limit } = req.body;
  try {
    const users = await User.findAndCountAll({
      offset: parseInt(offset),
      limit: parseInt(limit),
      where: {
        isVerified: true,
      },
      attributes: {
        exclude: ["password", "otp", "refreshToken", "token"],
      },
      raw: true,
    });
    res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
