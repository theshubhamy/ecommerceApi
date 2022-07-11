//models
import User from "../../models/user.js";
import UserDetail from "../../models/user-detail.js";

//helpers
import { validationErrorHandler } from "../../helpers/validation-error-handler.js";

//DB relations
User.hasOne(UserDetail);

export const fillUserDetails = async (req, res, next) => {
  validationErrorHandler(req, next);
  const { address, pincode, state, city, country } = req.body;
  try {
    const existingUserDetails = await UserDetail.findOne({
      where: {
        userId: req.userId,
      },
    });
    if (!existingUserDetails) {
      const us = await UserDetail.create({
        userId: req.userId,
        address,
        pincode,
        state,
        city,
        country,
      });
      res.status(201).json({
        msg: "New user details created successfully!",
        userAddress,
      });
    } else {
      const userAddress = await UserDetail.update(
        {
          address,
          pincode,
          state,
          city,
          country,
        },
        {
          where: {
            userId: req.userId,
          },
        }
      );
      res.status(201).json({
        msg: "User details updated successfully!",
        userAddress,
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
