module.exports = function userMid(req, res, next) {
  res.locals.user = {
    name: "lola",
    admin: true,
  };
  console.log(res.locals);
  next();
};
