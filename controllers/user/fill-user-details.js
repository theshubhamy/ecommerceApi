//models
import User from "../../models/user.js";
import UserDetail from "../../models/user-detail.js";

//helpers
import {validationErrorHandler} from "../../helpers/validation-error-handler.js";

//DB relations
User.hasOne(UserDetail);

export const fillUserDetails = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {businessName, businessType, address, pincode, state, city, country} = req.body;
  try {
    const existingUserDetails = await UserDetail.findOne({
      where: {
        userId: req.userId
      }
    });
    if (!existingUserDetails) {
      await UserDetail.create({
        userId: req.userId,
        businessName,
        businessType,
        address,
        pincode,
        state,
        city,
        country
      });
      res.status(201).json({
        msg: "New user details created successfully!"
      });
    } else {
      await UserDetail.update({
        businessName,
        businessType,
        address,
        pincode,
        state,
        city,
        country
      }, {
        where: {
          userId: req.userId
        }
      });
      res.status(201).json({
        msg: "User details updated successfully!"
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
