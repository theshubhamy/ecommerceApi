export const corsError = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization,Origin, X-Requested-With, X-Callback-Type, Accept"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
};
