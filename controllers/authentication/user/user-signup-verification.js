//models
import User from "../../../models/user.js";

//helpers
import { validationErrorHandler } from "../../../helpers/validation-error-handler.js";

export const userSignupVerification = async (req, res, next) => {
  validationErrorHandler(req, next);
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({
      where: { email, otp, isAdmin: false },
      raw: true,
    });
    if (!user) {
      const error = new Error("user not found");
      error.statusCode = 404;
      return next(error);
    }

    await User.update({ isVerified: true, otp: null }, { where: { email } });
    res.status(201).json({
      msg: `Your eamil ${email} verified successfully😊`,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
