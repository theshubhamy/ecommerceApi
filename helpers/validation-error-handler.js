import expressValidator from "express-validator";

export const validationErrorHandler= (req, next) => {
  const errors = expressValidator.validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation Failed');
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }
};
