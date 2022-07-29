const { body } = require("express-validator");

module.exports = {
  login: () => {
    return [body("userid").exists(), body("password").exists()];
  },
};
