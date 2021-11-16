module.exports = function authMid(req, res, next) {
  if (res.locals.user.admin === true) {
    console.log("Es admin");
    next();
  } else {
    console.log("No es admin");
    res.send("No es admin");
  }
};
