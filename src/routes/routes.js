var express = require('express');
var router = express.Router();
const controller  = require("../controllers/controller");
const {validation}  = require("../middlewares/validation");
const requestValidation  = require("../middlewares/request.validate");
const ValidateAuthentication  = require("../auth/auth");
router.post('/login',requestValidation.login(),validation,ValidateAuthentication.signin);


module.exports = router;