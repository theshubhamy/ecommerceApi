//packages
import bcrypt from "bcryptjs";

//model
import User from "../../models/user.js";

//helpers
import {validationErrorHandler} from "../../helpers/validation-error-handler.js";

export const changeAdministratorDetails = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {name, email, password} = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.update({
      name,
      email,
      password: hashedPassword
    }, {where: {id: req.userId}});
    res.status(201).json({
      msg: "Administrator profile details updated!"
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
