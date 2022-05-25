import bcrypt from "bcryptjs";
//models
import User from "../../../models/user.js";
//helpers
import { validationErrorHandler } from "../../../helpers/validation-error-handler.js";
import { generateOTP } from "../../../helpers/generate-otp.js";
import { sendOtp } from "../../../helpers/emailSendOtp.js";
import { isPhoneUnique } from "../../../helpers/is-phone-unique.js";

export const adminSignupPhone = async (req, res, next) => {
  validationErrorHandler(req, next);
  const { name, email, phone, password } = req.body;
  const otp = Number.parseInt(generateOTP(6));
  try {
     const response = await sendOtp(name, email, otp);
     if (response.status === 200) {
    const isUnique = await isPhoneUnique(User, phone);
    if (!isUnique) {
      await User.update(
        { otp },
        {
          where: { phone },
        }
      );
      res.status(201).json({
        msg: `Admin already exists. OTP sent to ${email}`,
      });
      console.log("user already exist");
    } else {
      console.log("user new here");
      const encryptedPassword = await bcrypt.hash(password, 12);
      await User.create({
        name,
        email,
        phone,
        password: encryptedPassword,
        otp,
        isAdmin: true,
        isBuyer: true,
        isSeller: true,
        isAuthorized: true,
      });
      res.status(201).json({
        msg: `Admin registered! OTP sent to ${email}`,
      });
    }
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
