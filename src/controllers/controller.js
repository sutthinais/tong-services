const controller = require("../services/services");

module.exports = {
  test: (req, res) => {
    controller.test((error, results) => {
      if (error) {
        return res.status(200).json({
          success: false,
          data: null,
          message: "query not success",
          error: error,
          time: Date.now(),
        });
      } else {
        return res.status(200).json({
          success: true,
          data: results,
          message: "query success",
          error: null,
          time: Date.now(),
        });
      }
    });
  },

  login: (req, res) => {
    controller.test((error, results) => {
      if (error) {
        return res.status(200).json({
          success: false,
          data: null,
          message: "query not success",
          error: error,
          time: Date.now(),
        });
      } else {
        return res.status(200).json({
          success: true,
          data: results,
          message: "query success",
          error: null,
          time: Date.now(),
        });
      }
    });
  },
};
