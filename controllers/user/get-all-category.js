//model
import Category from "../../models/category.js";

export const getAllCategory = async (req, res, next) => {
  try {
    const category = await Category.findAndCountAll({ raw: true });
    res.status(200).json({
      message: "Categories fetched successfully",
      category,
    });
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
