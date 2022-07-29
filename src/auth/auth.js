const axios = require("axios");
const jsonwebtoken = require("jsonwebtoken");
module.exports = {
  async signin(req, res) {
    try {
      const response = await axios.get(
        "https://boonsirifishery.com/Api/loginapp/loginapp.php",
        {
          params: {
            users: "" + req.body.userid,
            password: "" + req.body.password,
          },
        }
      );

      if (response.status != 200) {
        return res.status(400).send({
          status: false,
          data: null,
          error: null,
          message: "authenticate token.",
        });
      }

      const headers = {
        "Content-Type": "application/json",
        "a-token":
          "gwKwHaGxcg07zRwC2P0Z8tJ7PKFgxjDJ1eQ32WT1+gcwbve1uhBe69VNFXadX9DUAYr7MW2vhpclJTRjgI176x1zPPrcMo4rjdAfebBLGEg=",
      };

      const body = {
        Condition: {
          UserCode: req.body.userid,
        },
      };
      const response2 = await axios.post(
        "http://203.114.108.46:10300/api/bfp/common/searchWarehouseGroupByCondition",
        body,
        { headers }
      );
      var mapUser = {
        citiId: response.data.data[0].citi_id,
        user: response.data.data[0].user,
        fname: response.data.data[0].fname,
        lname: response.data.data[0].lname,
      };
      if (response2.status != 200) {
        return res.status(400).send({
          status: false,
          data: null,
          error: null,
          message: "authenticate token.",
        });
      }

      var warehouseGroupList = response2.data.WarehouseGroupList;

      var resjsonwebtoken = await jsonwebtoken.sign(
        { user: req.body.userid },
        "secretkey",
        { expiresIn: "30d" }
      );

      return res.status(200).send({
        status: true,
        data: {
          userData: mapUser,
          warehouseGroupList: warehouseGroupList,
          token: resjsonwebtoken,
        },
        error: null,
        message: "authenticate token.",
        time: Date.now(),
      });
    } catch (error) {
      return res.status(400).send({
        status: false,
        data: null,
        error: error,
        message: "invalid User or Password.",
        time: Date.now(),
      });
    }
  },

  async verifyToken(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.headers["authorization"];
    // decode token
    if (token) {
      token = token.replace("Bearer ", "");
      // verifies secret and checks exp
      jsonwebtoken.verify(token, "secretkey", function (err, decoded) {
        if (err) {
          return res.status(403).send({
            status: false,
            data: null,
            error: err,
            message: "Failed to authenticate token.",
            time: Date.now(),
          });
        } else {
          next();
        }
      });
    } else {
      return res.status(401).send({
        status: false,
        data: null,
        error: null,
        message: "401 Unauthorized",
        time: Date.now(),
      });
    }
  },
};
