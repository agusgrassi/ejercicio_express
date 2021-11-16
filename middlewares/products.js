const axios = require("axios");

module.exports = function productMid(req, res, next) {
  axios
    .get("https://api.mercadolibre.com/sites/MLA/search?q=Motorola")
    .then((response) => {
      res.locals.products = response.data.results;
      next();
    });
};
