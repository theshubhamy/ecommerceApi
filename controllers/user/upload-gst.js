//models
import User from "../../models/user.js";
import UserDetail from "../../models/user-detail.js";

//helpers
import {clearImage} from "../../helpers/clear-image.js";

export const uploadGst = async (req, res, next) => {
  try {
    if (!req.file) {
      const error = new Error('No image provided');
      error.statusCode = 422;
      return next(error);
    }
    const gstFile = req.file.path;
    const userDetails = await UserDetail.findOne(
      {
        where: {
          userId: req.userId
        }
      }
    );
    if (!userDetails) {
      clearImage(gstFile);
      const error = new Error('No such user details found');
      error.statusCode = 404;
      return next(error);
    }
    if (gstFile !== userDetails["dataValues"]["gstFile"]) {
      console.log(gstFile !== userDetails["dataValues"]["gstFile"]);
      clearImage(userDetails["dataValues"]["gstFile"]);
    }
     await UserDetail.update({
      gstFile: gstFile
    }, {
      where: {
        userId: req.userId,
      }
    });
    res.status(201).json({
      message: "GST file uploaded updated"
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
