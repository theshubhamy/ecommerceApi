//model
import Brand from "../../models/brand.js";

export const getAllBrands = async (req, res, next) => {
  try {
    const brands = await Brand.findAll({ raw: true });
    res.status(200).json({
      message: "Brands fetched successfully",
      brands,
    });
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
