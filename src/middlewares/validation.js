const { validationResult } = require("express-validator");
exports.validation = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "400 Bad Request",
        error: errors.array(),
        time: Date.now(),
      });
    }
    next();
  };